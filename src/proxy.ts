import { NextResponse, type NextRequest } from 'next/server'
import { AuthService } from './core/services/AuthService';

export async function proxy(request: NextRequest) {
  const { isAuthorized, response } = await AuthService.checkToken(request)
  if (!isAuthorized) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  return response
}

export const config = {
  matcher: ['/dashboard/:path*','/inventory/:path*'],
}