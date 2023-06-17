import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import { getSession, signOut } from "next-auth/react";
import { useAccount } from "wagmi";
import { parseEther } from "viem";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { loanCode, loanAbi } from "../constants/abi_byteCode";
import { useState } from "react";
export default function loan({ user }) {
  const [form1, setForm1] = useState("");
  const [form2, setForm2] = useState("");
  const [form3, setForm3] = useState("");
const [form4, setForm4] = useState("");
  const handleChange1 = (event) => {
    setForm1(event.target.value);
    console.log(event.target.value);
  };
  const handleChange2 = (event) => {
    setForm2(event.target.value);
    console.log(event.target.value);
  };
  const handleChange3 = (event) => {
    setForm3(event.target.value);
    console.log(event.target.value);
  };

  const handleChange4 = (event) => {
    setForm4(event.target.value);
    console.log(event.target.value);
  };
  const { config } = usePrepareContractWrite({
    address: loanCode,
    abi: loanAbi,
    functionName: "giveLoan",
    args: [form3, form2, form1],
  });
  const { write } = useContractWrite(config);


  const { config:config1 } = usePrepareContractWrite({
    address: loanCode,
    abi: loanAbi,
    functionName: "collectLoan",
    value: parseEther(form4)
  });
  const { write:write1 } = useContractWrite(config1);
  return (
    <Layout suppressHydrationWarning={true}>
      <div className="flex items-start h-3/6 border-blue-500">
        <div className="">
          <label
            htmlFor="crypto"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            enter the amount you want to loan
          </label>
          <input
            type="text"
            id="crypto"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="0.1"
            required
            onChange={handleChange1}
          />
        </div>

        <div className="">
          <label
            htmlFor="tokenId"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            enter the tokenId
          </label>
          <input
            type="text"
            id="tokenId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="2"
            required
            onChange={handleChange2}
          />
        </div>

        <div className="">
          <label
            htmlFor="nftAddress"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            enter the address of the nft contract
          </label>
          <input
            type="text"
            id="nftAddress"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="0xE46D6C970A7B5efc0a4C4Df5fc2F15dE3bE1a1b8"
            required
            onChange={handleChange3}
          />
       
        <button
          type="submit"
          className=" text-white bg-[#f1508b] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={() => write?.()}
        >
          Submit
        </button>
         </div>
      </div>

      <div className="">
          <label
            htmlFor="collectloan"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            enter the loan amt
          </label>
          <input
            type="text"
            id="collectloan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="loan amount"
            required
            onChange={handleChange4}
          />
       
        <button
          type="submit"
          className=" text-white bg-[#f1508b] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={() => write1?.()}
        >
          Submit
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
        destination: "/?authp=false",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}
