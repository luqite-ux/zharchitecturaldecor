import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('customer revision removes the duplicate cement gallery samples and UHPC product fallback', () => {
  const products = read('lib/content/products.ts')

  assert.doesNotMatch(products, /slug: 'uhpc-custom-components'/)
  assert.doesNotMatch(products, /source\/products\/samples/)
})

test('customer revision uses the optimized project image set', () => {
  const projects = read('lib/content/projects.ts')

  assert.match(projects, /\/images\/projects-optimized\//)
  assert.doesNotMatch(projects, /\/images\/projects-enhanced\//)
})

test('customer revision uses the supplied optimized facility image', () => {
  const manufacturing = read('app/manufacturing/page.tsx')

  assert.match(manufacturing, /engraving-machine-daylight\.png/)
  assert.doesNotMatch(manufacturing, /engraving-machine-hall\.jpg/)
})

test('customer revision adds supplied company imagery and installation support copy to About Us', () => {
  const about = read('app/about/page.tsx')

  assert.match(about, /company-facility-gallery/)
  assert.match(
    about,
    /We also provide on-site installation and construction technical support for facade &amp; interior projects\./,
  )
})

test('product cards support a customer-approved cover crop without changing detail gallery fit', () => {
  const products = read('lib/content/products.ts')
  const card = read('components/site/product-card.tsx')

  assert.match(products, /cardFit\?: 'contain' \| 'cover'/)
  assert.match(card, /fit: product\.cardFit \?\? product\.image\.fit/)
})
