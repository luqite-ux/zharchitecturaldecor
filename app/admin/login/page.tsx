import Link from 'next/link'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f5f5] p-6 text-[#0e1c24]">
      <form action="/api/auth/login" method="post" className="w-full max-w-md border border-[#cad9d9] bg-white p-8 shadow-sm">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b85839]">ZHENGHUI DECORATION</Link>
        <h1 className="mt-5 text-3xl font-semibold">Customer administration</h1>
        <p className="mt-2 text-sm leading-6 text-[#52636a]">Sign in to manage products, articles, inquiries and site settings.</p>
        {error ? <p role="alert" className="mt-5 border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p> : null}
        <label className="mt-6 block text-sm font-medium" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" className="mt-2 min-h-12 w-full border border-[#9db0b3] px-3" />
        <label className="mt-4 block text-sm font-medium" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="mt-2 min-h-12 w-full border border-[#9db0b3] px-3" />
        <button type="submit" className="mt-6 min-h-12 w-full bg-[#b85839] px-5 font-semibold text-white hover:bg-[#8f3f29]">Sign in</button>
      </form>
    </main>
  )
}
