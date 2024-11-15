"use client"
import { RegisterForm } from "@/ui/view"
import { useProtectRoute, useIsClient } from "@/hook"

export default function Register() {
  const isClient = useIsClient()
  useProtectRoute()
  return <>{isClient ? <RegisterForm /> : ""}</>
}
