import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/callback']
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)

  // Si no hay sesión y la ruta no es pública, redirigir a login
  if (!session && !isPublicRoute) {
    const redirectUrl = new URL('/auth/login', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Si hay sesión y estamos en una ruta de auth, redirigir a dashboard
  if (session && isPublicRoute) {
    const redirectUrl = new URL('/dashboard', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Configurar qué rutas deben ser manejadas por el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 