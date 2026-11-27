import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (filePath) => readFileSync(new URL(`../${filePath}`, import.meta.url), 'utf8')

test('REQ-01 & REQ-02: removes GRC image 7 and promotes GRC image 9 as cover', () => {
  const media = read('lib/content/customer-feedback-media.ts')
  const products = read('lib/content/products.ts')

  assert.doesNotMatch(media, /grc-architectural-elements\/7\.jpg/)
  assert.match(media, /grcFacade:\s*'[^']*grc-architectural-elements\/9\.jpg'/)
  assert.doesNotMatch(products, /\/images\/source\/products\/grc\/2\.jpg/)
  assert.match(products, /withoutImages\(numberedGallery\('grc', 16, 'GRC architectural decorative element'\), \[1, 7\]\)/)
})

test('REQ-03: removes Lishui Pingxi Jiayuan project case and its image', () => {
  const projects = read('lib/content/projects.ts')

  assert.doesNotMatch(projects, /lishui-pingxi-jiayuan/)
})

test('REQ-04: replaces Lishui Vanke City project image with supplied red-brick complex photo (GRC 8)', () => {
  const projects = read('lib/content/projects.ts')
  const media = read('lib/content/customer-feedback-media.ts')

  assert.match(projects, /slug:\s*'lishui-vanke-city'/)
  assert.doesNotMatch(projects, /\/images\/projects-optimized\/lishui-vanke-city\.jpg/)
  assert.match(projects, /feedbackMedia\.lishuiVankeCity/)
  assert.match(media, /lishuiVankeCity:\s*'[^']*grc-architectural-elements\/8\.jpg'/)
})

test('REQ-05: adds Jiangyin Tunnel Toll Station project case with tenant R2 image and keeps 9 total cases', () => {
  const projects = read('lib/content/projects.ts')
  const media = read('lib/content/customer-feedback-media.ts')

  assert.match(projects, /slug:\s*'jiangyin-tunnel-toll-station'/)
  assert.match(projects, /nameEn:\s*'Jiangyin Tunnel Toll Station'/)
  assert.match(projects, /feedbackMedia\.jiangyinTunnelTollStation/)
  assert.match(media, /jiangyinTunnelTollStation:\s*'https:\/\/pub-[^']*\/tenants\/zharchitecturaldecor\/customer-feedback-20261127\/jiangyin-tunnel-toll-station-[a-f0-9]+\.png'/)

  const slugMatches = projects.match(/slug:\s*'[^']+'/g) ?? []
  assert.equal(slugMatches.length, 9)
})
