import type { HTMLAttributes } from 'react'

function merge(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base
}

export function Empty({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={merge('flex min-h-64 flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-12 text-center', className)} {...props} />
}
export function EmptyHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={merge('flex max-w-xl flex-col items-center gap-3', className)} {...props} />
}
export function EmptyMedia({ className, variant: _variant, ...props }: HTMLAttributes<HTMLDivElement> & { variant?: 'icon' }) {
  return <div className={merge('flex size-12 items-center justify-center rounded-full bg-muted text-foreground', className)} {...props} />
}
export function EmptyTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={merge('font-serif text-2xl text-foreground', className)} {...props} />
}
export function EmptyDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={merge('text-sm leading-6 text-muted-foreground', className)} {...props} />
}
export function EmptyContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={merge('mt-6 flex flex-wrap justify-center gap-3', className)} {...props} />
}
