import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'
import { getAdminSupabase } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
const noStore = { 'Cache-Control': 'no-store, max-age=0' }
const value = (body: FormData, key: string, max: number) => String(body.get(key) ?? '').trim().slice(0, max)

export async function POST(request: Request) {
  const body = await request.formData().catch(() => null)
  if (!body) return Response.json({ message: 'Invalid request.' }, { status: 400, headers: noStore })
  const secret = process.env.CAPTCHA_SECRET?.trim()
  if (!secret) return Response.json({ message: 'Verification service is unavailable.' }, { status: 503, headers: noStore })
  try {
    const captcha = await verifyCaptchaSubmission({
      secret,
      ...createSupabaseCaptchaContextFromEnv(),
      scope: value(body, 'captchaScope', 160),
      token: value(body, 'captchaToken', 4096),
      answer: value(body, 'captchaAnswer', 16),
    })
    if (!captcha.ok) return Response.json({ message: 'The verification code is incorrect or expired. Please try again.' }, { status: 400, headers: noStore })
  } catch {
    return Response.json({ message: 'Verification service is unavailable.' }, { status: 503, headers: noStore })
  }
  const name = value(body, 'name', 200)
  const email = value(body, 'email', 320)
  const message = value(body, 'message', 10000)
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ message: 'Please complete the required contact details.' }, { status: 400, headers: noStore })
  const detail = [
    `Product: ${value(body, 'productInterest', 300)}`,
    `Project location: ${value(body, 'projectLocation', 300)}`,
    `Dimensions/specifications: ${value(body, 'dimensions', 500)}`,
    `Quantity: ${value(body, 'quantity', 200)}`,
    `Drawing/file note: ${value(body, 'drawingNote', 1000)}`,
    '', message,
  ].join('\n')
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  if (!tenantId) return Response.json({ message: 'Inquiry service is unavailable.' }, { status: 503, headers: noStore })
  const result = await getAdminSupabase().from('inquiries').insert({
    tenant_id: tenantId,
    name,
    email,
    phone: value(body, 'phone', 80) || null,
    company: value(body, 'company', 200) || null,
    subject: value(body, 'subject', 300) || 'Website quotation request',
    message: detail,
    status: 'unread',
  }).select('id').single()
  if (result.error) return Response.json({ message: 'Your request could not be saved. Please try again.' }, { status: 503, headers: noStore })
  return Response.json({ message: 'Your quotation request has been sent.', reference: result.data.id }, { status: 201, headers: noStore })
}
