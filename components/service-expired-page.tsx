export function ServiceExpiredPage() {
  return <main className="flex min-h-screen items-center justify-center bg-ivory px-6 text-ink">
    <section className="w-full max-w-xl rounded-3xl border border-border bg-mineral p-8 text-center shadow-xl">
      <p className="eyebrow">Service Notice</p>
      <h1 className="mt-4 text-4xl">Website Service Has Expired</h1>
      <p className="mt-4 text-ink-soft">Please contact your service representative to renew and restore access.</p>
      <a className="mt-8 inline-flex rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white" href="/admin/login">Administrator Login</a>
    </section>
  </main>
}
