import { useContext, useEffect } from "react"
import Router from 'next/router'
import { AuthContext } from "@/contexts/AuthContext"

export default function Custom404() {
    const { user } = useContext(AuthContext)
    useEffect(() => {
        user ? Router.push('/company') : Router.push('/')
    })
    return null
}