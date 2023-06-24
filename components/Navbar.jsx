import Link from "next/link";
import { getSession, signOut } from "next-auth/react";
import Layout from "../components/Layout";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useSignMessage } from "wagmi";
import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { useEffect, useState } from "react";
// this is the navbar component.. It also has a custom sign-in button with web3 authentication.
export default function Navbar({ session }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    console.log(`mounted is ${session}`);
  }, [session]);
  const { push } = useRouter();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected, address, isConnecting, isDisconnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    const { message } = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    });

    const signature = await signMessageAsync({ message });

    // redirect user after success authentication to '/user' page
    const { url } = await signIn("moralis-auth", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/?authp=true",
    });

    console.log(signature);
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    push(url);
  };
  return (
    <nav className="bg-[#f1508b] w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <img
            
            className="h-8 mr-3"
            
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            mywallet
          </span>
        </Link>

        <div className="flex md:order-2">
          {isConnected ? (
            <div>
              <button
                type="button"
                onClick={() => signOut({ redirect: "/signin" })}
                className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
              >
                {isConnected ? address : "no"}
              </button>
            </div>
          ) : (
            <div>
              {
                <button
                  onClick={handleAuth}
                  className="text-[#F2BED1] bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                >
                  connects
                </button>
              }
            </div>
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-[#f1508b] md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
            <li>
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 text-[#F9F5F6] hover:text-blue-700 bg-blue-700 rounded md:bg-transparent md:text-[#F9F5F6] md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/fixed_deposit"
                className="block py-2 pl-3 pr-4 text-[#F9F5F6] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                fixed-deposit
              </Link>
            </li>
            <li>
              <Link
                href="/loan"
                className="block py-2 pl-3 pr-4 text-[#F9F5F6] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                loan
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session.json());
  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session: session.user },
  };
}
