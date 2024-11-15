"use client"
import { RegisterForm } from "@/ui/view"
import { useProtectRoute } from "@/hook"

export default function Register() {
  useProtectRoute()
  return <RegisterForm />
}
