import Head from 'next/head'
import Generator from "../components/generator/generator";
import Footer from '@/components/footer/Footer';


//@ts-ignore
export default function Home({data}) {
  return (
    <>
      <Head>
        <title>Eurovision Generator</title>
        <meta name="description" content="Eurovision song contest generator by Edgaras M." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>

      <>
      {data && <Generator data={data} />}
      </>

      <Footer/>
     
    </>
  )
}


export async function getServerSideProps(){

  const response = await fetch("https://eurovisiongen.vercel.app/api/getSongs");
  console.log(response)
  const data = await response.json();

  return {props:{data} }

}
