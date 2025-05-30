import "./showproject.css"

export const metadata = {
  title: "Motion example: Scroll-triggered animations",
  description: "undefined",
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main id="sandbox">{children}</main>
      </body>
    </html>
  )
}
