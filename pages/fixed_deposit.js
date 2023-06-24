import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import { getSession, signOut } from "next-auth/react";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { parseEther } from "viem";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { depositCode, depositAbi } from "../constants/abi_byteCode";
import { abi } from "../constants/index";
import { data } from "autoprefixer";
export default function fd({ user }) {
  const [form1, setform] = useState(1);
  const [form2, setform2] = useState("1");
  const { data: data1 } = useContractRead({
    address: "0x77e8c0ee52f3ac0e583a59ac499a19c0ee6318a0",
    abi: depositAbi,
    functionName: "equiEth",
    args: [form1],
    watch: true,
  });

  const myNumber = Number(data1) / 100000;
  const value = myNumber.toString();
  console.log(data1);
  console.log(myNumber);
  function handleChange1(event) {
    console.log(form1);
    setform(event.target.value);
  }

  function handleChange2(event) {
    setform2(event.target.value);
    console.log(form2);
  }

  
  const { config } = usePrepareContractWrite({
    address: depositCode,
    abi: depositAbi,
    functionName: "fund",
    value: parseEther("1"),
  });
  const { write } = useContractWrite(config);
  function handleSubmit(event) {
    event.preventDefault();
    console.log("yess");
   
  }

  return (
    <Layout suppressHydrationWarning={true}>
      <div className="space-x-24 flex justify-center ">
        <div className="w-1/2">
          <h1 className="text-xl text-[#f1508b]">
            enter the amount to see the equivalent eth you will get.
          </h1>

          <div className="mb-6">
            <label
              htmlFor="amt"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your amount
            </label>
            <input
              type="number"
              id="amt"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="1"
              required
              onChange={handleChange1}
            />
          </div>
        </div>
        <div className="w-1/2 border-4 border-sky-500 flex justify-center items-stretch">
          <h1 className="text-2xl text-[#f1508b]">
            equivalent eth ={myNumber}
          </h1>
        </div>
      </div>
      <div className="flex space-y-24 items-center h-3/6">
        <div className="mb-6">
          <label
            for="crypto"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            crypto
          </label>
          <input
            type="text"
            id="crypto"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="0.1"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-[#f1508b] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          disabled={!write}
          onClick={() => write?.()}
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
