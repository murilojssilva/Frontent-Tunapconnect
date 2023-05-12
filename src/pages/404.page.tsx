import Script from "next/script";

export default function Custom404() {
  return(
    <>
      <Script>
          {
            `document.location.href="/"`
          }
      </Script>
    </>
  )
}