import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // Create Supabase client for proxy
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Resolve tenant from hostname
  const hostname = request.headers.get("host") || "";
  const platformDomain = process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || "localhost:3000";
  
  let tenantSubdomain: string | null = null;
  let tenantCustomDomain: string | null = null;

  // Check if it's a subdomain of the platform
  if (hostname.endsWith(platformDomain) && hostname !== platformDomain) {
    tenantSubdomain = hostname.replace(`.${platformDomain}`, "");
  } else if (hostname !== platformDomain && !hostname.includes("localhost")) {
    // It's a custom domain
    tenantCustomDomain = hostname;
  }

  // Query tenant from database
  let tenant = null;
  
  if (tenantSubdomain) {
    const { data } = await supabase
      .from("tenants")
      .select("*")
      .eq("subdomain", tenantSubdomain)
      .single();
    tenant = data;
  } else if (tenantCustomDomain) {
    const { data } = await supabase
      .from("tenants")
      .select("*")
      .eq("custom_domain", tenantCustomDomain)
      .single();
    tenant = data;
  } else {
    // Default tenant for development (sabrina)
    const { data } = await supabase
      .from("tenants")
      .select("*")
      .eq("subdomain", "sabrina")
      .single();
    tenant = data;
  }

  // If no tenant found and it's a subdomain/custom domain, return 404
  if (!tenant && (tenantSubdomain || tenantCustomDomain)) {
    return new NextResponse(null, { status: 404 });
  }

  // Pass tenant info to the app via headers
  if (tenant) {
    supabaseResponse.headers.set("x-tenant-id", tenant.id);
    supabaseResponse.headers.set("x-tenant-subdomain", tenant.subdomain);
    supabaseResponse.headers.set("x-tenant-name", tenant.name);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
