import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import { Layout } from "@/layout";

const inter = Inter({ subsets: ["latin"] });

export default function Main({ children }) {
  return (
    <>
      <div className="text-red-400">
        <Layout>
          <p className="p-3 shadow-2xl text-3xl font-semibold text-center cursor-pointer bg-slate-100 hover:bg-slate-50 active:shadow-none active:scale-95">
            Home
          </p>
        </Layout>
      </div>
    </>
  );
}
