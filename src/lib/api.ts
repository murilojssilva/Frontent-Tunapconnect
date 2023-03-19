import { useSession, getSession } from 'next-auth/react';
import axios from "axios";
import { JWT } from "next-auth/jwt";



const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  responseType: "json",
  headers: {
      'Content-Type': 'application/json',
  },
})

const session = getSession()



export class apiCore {
  constructor() {
    api.interceptors.request.use(async function (config) {
      const session = await getSession()
      const token = session?.user.token 
      config.headers.Authorization = token 
        ? ` Bearer ${token}` 
        : ''

      return config;
    }, function (error) {      
      return Promise.reject(error);
    })
  }

  get(data: any) {
    console.log(data)
    console.log(process.env.NEXT_PUBLIC_APP_API_URL)
    return api.get(data)
  }
} 