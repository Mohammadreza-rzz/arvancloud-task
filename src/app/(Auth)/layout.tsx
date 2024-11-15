"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen items-center justify-center bg-white'>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  )
}
