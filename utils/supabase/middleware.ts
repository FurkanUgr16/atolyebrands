import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  
  const { data :{ user }} = await supabase.auth.getUser()

  const { pathname } = request.nextUrl;

  if (!user && pathname.startsWith("/admin") || pathname.startsWith("/dealer")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if(user){
    const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single()

    const userRole = profile?.role()

    if(user && pathname === "/"){
        if (userRole === "admin") {
           return NextResponse.redirect(new URL("/admin", request.url)) 
        }
        if (userRole === "dealer") {
            return NextResponse.redirect(new URL("/dealer", request.url)) 
        }
    }

    if (pathname.startsWith("/admin") && userRole !== "admin") {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if(pathname.startsWith("/dealer") && userRole !== "dealer")
        return NextResponse.redirect(new URL("/", request.url   ))
  }
  return supabaseResponse
}