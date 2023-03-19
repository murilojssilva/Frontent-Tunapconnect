import api from "@/lib/api"
import { getSession } from "next-auth/react"

export default function Pagina2 () {
  return <h1>pagina2</h1>
}


export async function getServerSideProps(ctx) {

  try {
    // const result = await api.get('/product/3')
    // // console.log('api', result)
 
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
      result: ''
    }, // will be passed to the page component as props
  }
}