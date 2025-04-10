// lib/redirect.ts
import { auth } from "@/auth"
import { ADMIN_LOGIN_REDIRECT, DEFAULT_LOGIN_REDIRECT } from "@/routes"


export const getRedirectUrl = async () => {
  const session = await auth()
  
  if (!session?.user) return "/"
  
  return session.user.role === "ADMIN" 
    ? ADMIN_LOGIN_REDIRECT 
    : DEFAULT_LOGIN_REDIRECT
}