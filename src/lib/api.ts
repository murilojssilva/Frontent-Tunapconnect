import axios from "axios";
import { JWT } from "next-auth/jwt";

const api = axios.create({
  baseURL: process.env.APP_API_URL,
  responseType: "json",
  headers: {
      'Content-Type': 'application/json',
  },
})

export class apiCore {
  private token: JWT | string ;
  constructor(accessToken:JWT | string) {
    this.token = accessToken;
    api.interceptors.request.use(async function (config) {
      config.headers.Authorization = accessToken 
        ? ` Bearer ${accessToken}` 
        : ''
    
    
      return config;
    }, function (error) {
      
      return Promise.reject(error);
    })
  }

  async get(data: any) {

    try {
      const result = await api.get(data)
      return result.data
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
} 