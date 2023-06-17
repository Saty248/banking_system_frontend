import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import IdexDtl from "../components/IdexDtl";

import { depositCode, depositAbi } from "../constants/abi_byteCode";

export default function Home(props) {
  const { query } = props;

  if (query.authp == "false")
    return (
      <Layout suppressHydrationWarning>
        <div
          className="p-4 mb-4 text-2xl  text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 flex items-center justify-center h-4/6"
          role="alert"
        >
          <span class="font-medium">ERROR!</span>login and wait for the auth to
          complete.
        </div>
      </Layout>
    );
  return (
    <Layout suppressHydrationWarning={true}>
      <div className="space-x-24 flex items-center justify-center h-4/6 text-3xl font-bold underline ">
        <IdexDtl
          suppressHydrationWarning={true}
          className="mx-4"
          header="fixed- deposit"
          body={[
            "enter amount",
            "select deposit period",
            "complete the transaction",
          ]}
        />
        <IdexDtl
          suppressHydrationWarning={true}
          className="mx-4"
          header="authentication"
          body={[
            "select on connect",
            "connect your wallet",
            "sign the message to authenticate",
          ]}
        />
        <IdexDtl
          suppressHydrationWarning={true}
          className="mx-4"
          header="loan"
          body={[
            "take loan by giving your nft to the contract",
            "pay the loan and get back the nft",
          ]}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  console.log(query);
  return {
    props: { query },
  };
}
