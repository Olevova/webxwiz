import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Products from "@/components/Products";
import Head from "next/head";
import axios from "axios";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/router";

export default function Home({ products }) {
  const { user } = useAuthContext();
  const router = useRouter();

   if (!user) {
    return (
      <>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Header />
        <div className="flex justify-center mt-10">
          <h1 className="text-3xl">
            Please login or register to start shopping.
          </h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Products products={products} />
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
    const { data } = await axios.get("http://localhost:3030/");

  return {
    props:{ products: data }
  }
}