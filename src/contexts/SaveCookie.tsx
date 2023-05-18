import { parseCookies, setCookie } from 'nookies'

export function getCookies() {
  const cookies = parseCookies()
  if (cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string]) {
    const contexto = JSON.parse(
      cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string],
    )
    return contexto
  }
  return null
}

export function saveCookies(contexto?: any) {
  if (contexto) {
    setCookie(
      null,
      process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string,
      JSON.stringify(contexto),
      {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      },
    )
    return contexto
  }
  return getCookies()
}