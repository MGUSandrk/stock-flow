import { NextResponse, type NextRequest } from 'next/server'
import { AuthService } from './lib/services/authService';

export async function proxy(request: NextRequest) {
  console.log('Proxy middleware executed')
  const { isAuthorized, response } = await AuthService.checkToken(request)
  if (!isAuthorized) {
    console.log('User is not authorized, redirecting to /login')
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  return response
}

export const config = {
  matcher: '/dashboard',
}