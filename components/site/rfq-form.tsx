'use client'

import { useState } from 'react'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { products } from '@/lib/content/products'
import { cn } from '@/lib/utils'

export type RfqStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string }

interface RfqFormProps {
  /** Stable, unique identifier for this form instance's CAPTCHA session. */
  captchaScope: string
  defaultProduct?: string
  status?: RfqStatus
  action?: string
  captchaEndpoint?: string
  className?: string
}

function Field({
  id,
  label,
  required,
  hint,
  className,
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <span aria-hidden className="text-terracotta">
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </Label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-ink-soft">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

const controlClass =
  'h-11 border-input bg-mineral text-base text-ink placeholder:text-ink-soft/70 md:text-sm'

export function RfqForm({
  captchaScope,
  defaultProduct = '',
  status = { state: 'idle' },
  action = '/api/rfq',
  captchaEndpoint = '/api/captcha',
  className,
}: RfqFormProps) {
  const [localStatus, setLocalStatus] = useState<RfqStatus>(status)
  const [refreshKey, setRefreshKey] = useState(0)
  const p = captchaScope
  const submitting = localStatus.state === 'submitting'

  return (
    <form
      method="post"
      action={action}
      onSubmit={async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        setLocalStatus({ state: 'submitting' })
        try {
          const response = await fetch(action, { method: 'POST', body: new FormData(form) })
          const body = await response.json().catch(() => ({})) as { message?: string }
          if (!response.ok) throw new Error(body.message || 'Unable to send your request. Please try again.')
          form.reset()
          setRefreshKey((value) => value + 1)
          setLocalStatus({ state: 'success', message: body.message || 'Your quotation request has been sent.' })
        } catch (error) {
          setRefreshKey((value) => value + 1)
          setLocalStatus({ state: 'error', message: error instanceof Error ? error.message : 'Unable to send your request.' })
        }
      }}
      data-captcha-scope={captchaScope}
      aria-busy={submitting}
      className={cn('grid gap-5 sm:grid-cols-2', className)}
    >
      <Field id={`${p}-name`} label="Full name" required>
        <Input id={`${p}-name`} name="name" autoComplete="name" required className={controlClass} />
      </Field>
      <Field id={`${p}-email`} label="Email" required>
        <Input id={`${p}-email`} name="email" type="email" autoComplete="email" required className={controlClass} />
      </Field>
      <Field id={`${p}-phone`} label="Phone">
        <Input id={`${p}-phone`} name="phone" type="tel" autoComplete="tel" className={controlClass} />
      </Field>
      <Field id={`${p}-company`} label="Company">
        <Input id={`${p}-company`} name="company" autoComplete="organization" className={controlClass} />
      </Field>

      <Field id={`${p}-product`} label="Product interest" required>
        <select
          id={`${p}-product`}
          name="productInterest"
          required
          defaultValue={defaultProduct}
          className={cn(
            'w-full rounded-md border px-3 shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring',
            controlClass,
          )}
        >
          <option value="" disabled>
            Select a product
          </option>
          {products.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
          <option value="other">Other or not sure yet</option>
        </select>
      </Field>
      <Field id={`${p}-location`} label="Project location">
        <Input id={`${p}-location`} name="projectLocation" autoComplete="off" className={controlClass} />
      </Field>

      <Field id={`${p}-dimensions`} label="Dimensions / specifications">
        <Input
          id={`${p}-dimensions`}
          name="dimensions"
          aria-describedby={`${p}-dimensions-hint`}
          className={controlClass}
        />
      </Field>
      <Field id={`${p}-quantity`} label="Quantity">
        <Input
          id={`${p}-quantity`}
          name="quantity"
          aria-describedby={`${p}-quantity-hint`}
          className={controlClass}
        />
      </Field>
      <p id={`${p}-dimensions-hint`} className="sr-only">
        Include sizes, profiles or panel formats if known.
      </p>
      <p id={`${p}-quantity-hint`} className="sr-only">
        State the unit, for example metres, square metres or pieces.
      </p>

      <Field
        id={`${p}-files`}
        label="Drawing / file note"
        hint="Describe the drawings or files you plan to share. Our team will reply with a way to send them."
        className="sm:col-span-2"
      >
        <Input
          id={`${p}-files`}
          name="drawingNote"
          aria-describedby={`${p}-files-hint`}
          className={controlClass}
        />
      </Field>

      <Field id={`${p}-subject`} label="Subject" required className="sm:col-span-2">
        <Input id={`${p}-subject`} name="subject" required className={controlClass} />
      </Field>
      <Field id={`${p}-message`} label="Message" required className="sm:col-span-2">
        <Textarea
          id={`${p}-message`}
          name="message"
          required
          rows={5}
          className="border-input bg-mineral text-base text-ink md:text-sm"
        />
      </Field>

      <InquiryCaptchaField refreshKey={refreshKey} className="rounded-xl border border-border bg-stone/50 p-4 sm:col-span-2" />

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-soft">
          Fields marked * are required. Pricing is project-specific and provided by quotation.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-terracotta px-8 text-base font-semibold text-white transition-colors hover:bg-[#8f3e1e] disabled:opacity-60"
        >
          {submitting ? <Spinner className="size-4" /> : null}
          {submitting ? 'Sending' : 'Send quotation request'}
        </button>
      </div>

      <div aria-live="polite" role="status" className="sm:col-span-2">
        {localStatus.state === 'success' ? (
          <p className="rounded-lg border border-border bg-mineral p-4 text-sm text-ink">{localStatus.message}</p>
        ) : null}
        {localStatus.state === 'error' ? (
          <p className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
            {localStatus.message}
          </p>
        ) : null}
      </div>
    </form>
  )
}
