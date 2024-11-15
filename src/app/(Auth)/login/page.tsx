"use client"
import { LoginForm } from "@/ui/view"
import { useProtectRoute } from "@/hook"

export default function Login() {
  useProtectRoute()
  return (
    <main>
      <LoginForm />
    </main>
  )
}
