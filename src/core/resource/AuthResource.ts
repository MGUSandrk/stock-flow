'use server'
import { AuthService } from '@/core/services/AuthService';
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
      return { success: false, error: "Credenciales incorrectas" }}
    return { success: false, error: "Error del servidor" }}}

  redirect('/dashboard')}


export async function signUp(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm-password') as string

  // 1. Validaciones de Servidor
  if (!name || !email || !password) {return { success: false, error: "Todos los campos son obligatorios." }}
  if (password !== confirmPassword) {return { success: false, error: "Las contraseñas no coinciden." }}
  if (password.length < 6) {return { success: false, error: "La contraseña debe tener al menos 6 caracteres." }}

  try {
    await AuthService.signUp(email, password, name)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === "USER_EXISTS") return { success: false, error: "Este correo ya está registrado." }
    if (error.message === "WEAK_PASSWORD") return { success: false, error: "La contraseña es muy débil." }
    return { success: false, error: "Error del servidor" }}

  redirect('/confirm-email')}


export async function signOut() {
  try {
    await AuthService.signOut()
  } catch (error) {
    return { success: false, error: "Error del servidor" }}
    
  redirect('/login')}

