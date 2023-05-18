import { parseCookies } from 'nookies'

export function saveCookies(contexto?: any) {
  let newContexto: any = contexto || {}
  const cookies = parseCookies()

  if (!newContexto) {
    if (cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string]) {
      newContexto = JSON.parse(
        cookies[process.env.NEXT_PUBLIC_APP_COOKIE_STORAGE_NAME as string],
      )
      newContexto.log('entrou')
    }
  }

  return newContexto
}
