import "@/assets/styles/globals.css"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ArvanCloud Dashboard",
  description: "ArvanCloud Dashboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='mx-auto max-w-[1440px]'>{children}</body>
    </html>
  )
}
