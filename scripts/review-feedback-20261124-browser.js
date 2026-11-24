/* eslint-disable @typescript-eslint/no-unused-expressions -- Playwright CLI invokes this expression with page. */
async (page) => {
  const base = 'https://zharchitecturaldecor.com'
  const evidence = 'D:/Cursor/Grand/dulizhan/zharchitecturaldecor/deliverables/customer-feedback-20261124-browser'
  const targets = [
    ['home', '/', '[data-section-id="home-product-systems"]'],
    ['eps', '/products/eps-decorative-mouldings', '[data-section-id="product-gallery"]'],
    ['grc', '/products/grc-architectural-elements', '[data-section-id="product-gallery"]'],
    ['grg', '/products/grg-interior-elements', '[data-section-id="product-gallery"]'],
    ['focheng', '/projects', '#jinhu-focheng-temple'],
  ]
  const results = []
  for (const [device, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    await page.setViewportSize({ width, height })
    for (const [name, route, selector] of targets) {
      const response = await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
      const target = page.locator(selector)
      await target.scrollIntoViewIfNeeded()
      await page.waitForTimeout(650)
      for (const image of await target.locator('img').all()) {
        await image.scrollIntoViewIfNeeded()
        await image.evaluate(async (node) => {
          if (!node.complete) await new Promise((resolve) => {
            node.addEventListener('load', resolve, { once: true })
            node.addEventListener('error', resolve, { once: true })
            setTimeout(resolve, 10000)
          })
          if (node.decode) await node.decode().catch(() => {})
        })
      }
      const images = await target.locator('img').evaluateAll((nodes) => nodes.map((image) => ({
        src: image.currentSrc || image.src,
        loaded: image.complete && image.naturalWidth > 0,
      })))
      const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2)
      const cardRows = name === 'home' ? await target.locator('article').evaluateAll((nodes) => nodes.map((node) => Math.round(node.getBoundingClientRect().top))) : []
      const screenshot = `${evidence}/${name}-${device}.png`
      await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled', timeout: 60000 })
      results.push({ device, name, status: response?.status(), url: page.url(), images: images.length,
        unloaded: images.filter((image) => !image.loaded).length, horizontalOverflow,
        cardRows, imageUrls: images.map((image) => image.src), screenshot })
    }
  }
  return results
}
