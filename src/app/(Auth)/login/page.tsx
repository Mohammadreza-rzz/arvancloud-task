"use client"
import { LoginForm } from "@/ui/view"
import { useProtectRoute, useIsClient } from "@/hook"

export default function Login() {
  const isClient = useIsClient()
  useProtectRoute()
  return <main>{!!isClient && <LoginForm />}</main>
}
