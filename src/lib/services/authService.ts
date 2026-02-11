import { checkToken, createClient, validateSession } from '@/lib/utils/supabaseServer'
import { type NextRequest } from 'next/server'

export const AuthService = {
  async signIn(email: string, pass: string) {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({email,password: pass,})
    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        throw new Error("CREDENTIALS_ERROR") }
      console.error("Auth Error:", error)
      throw new Error("SERVER_ERROR")}
    return true
  },


  async signUp(email: string, pass: string, fullName: string) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        // IMPORTANTE: Esto es lo que lee el Trigger de SQL
        // new.raw_user_meta_data ->> 'full_name'
        data: {
          full_name: fullName,
          // avatar_url: '...' // Podrías poner una imagen por defecto aquí
        },
      },
    })

    if (error) {
      console.error("SignUp Error:", error)
      if (error.message.includes("User already registered")) throw new Error("USER_EXISTS")
      if (error.message.includes("Password")) throw new Error("WEAK_PASSWORD")
      throw new Error("SERVER_ERROR")
    }

    return data
  },
  
  async signOut() {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async checkToken(request: NextRequest) {
  return checkToken(request)
  },

  async validateSession() {
    return validateSession()
  }
}