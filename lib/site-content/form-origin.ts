export function allowsPreviewFormOrigin(headers: Headers, customerOrigin: string, adminOrigin?: string): boolean {
  const origin = headers.get('origin')
  return origin === customerOrigin || (Boolean(adminOrigin) && origin === adminOrigin)
    || (origin === 'null' && headers.get('sec-fetch-site') === 'same-origin')
}
