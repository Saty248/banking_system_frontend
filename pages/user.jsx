import { getSession, signOut } from "next-auth/react";
import { useAccount } from "wagmi";
import Layout from "../components/Layout";

// gets a prop from getServerSideProps
function User({ user }) {
  const { address, connector, isConnected } = useAccount();
  console.log(`here is the acc ${address}, ${isConnected}`);
  return (
    <Layout suppressHydrationWarning>
      <div className="flex items-center justify-center h-4/6">
        <h4>User session:</h4>
        <pre className="text-[#F2BED1]">{JSON.stringify(user, null, 2)}</pre>

        <button onClick={() => signOut({ redirect: "/signin" })}>
          Sign out
        </button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

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
    props: { user: session.user },
  };
}

export default User;
