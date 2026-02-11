'use server'
import { AuthService } from '@/lib/services/authService';
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  try {
    await AuthService.signIn(email, password)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === "CREDENTIALS_ERROR") {
      if (error.message === "CREDENTIALS_ERROR") {
      return { success: false, error: "Credenciales incorrectas" }
    }
    return { success: false, error: "Error del servidor" }
    }
  }
  redirect('/dashboard')
}

export async function signUp(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm-password') as string

  // 1. Validaciones de Servidor
  if (!name || !email || !password) {
    return { success: false, error: "Todos los campos son obligatorios." }
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Las contraseñas no coinciden." }
  }

  if (password.length < 6) {
    return { success: false, error: "La contraseña debe tener al menos 6 caracteres." }
  }

  try {
    // 2. Crear usuario en Auth (El Trigger creará el perfil automáticamente)
    await AuthService.signUp(email, password, name)
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === "USER_EXISTS") return { success: false, error: "Este correo ya está registrado." }
    if (error.message === "WEAK_PASSWORD") return { success: false, error: "La contraseña es muy débil." }
    return { success: false, error: "Error del servidor" }
  }

  // 3. Redirigir
  // Nota: Supabase por defecto requiere confirmar email. 
  // Si desactivaste "Confirm Email" en el panel, esto entra directo.
  // Si no, deberías redirigir a una página de "Revisa tu correo".
  redirect('/dashboard')
}

export async function signOut() {
  try {
    await AuthService.signOut()
    console.log('Signed out successfully')
  } catch (error) {
    console.log('Error signing out:', error)
  }
  redirect('/login')
}

