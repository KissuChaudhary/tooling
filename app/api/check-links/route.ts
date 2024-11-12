import { NextResponse } from 'next/server'
import axios from 'axios'
import cheerio from 'cheerio'
import { URL } from 'url'

type BrokenLink = {
  url: string
  status: number | string
}

export async function POST(req: Request) {
  const { baseUrl, maxDepth = 3, maxLinks = 100 } = await req.json()

  if (!baseUrl) {
    return NextResponse.json({ error: 'Base URL is required' }, { status: 400 })
  }

  const visited = new Set<string>()
  const brokenLinks: BrokenLink[] = []

  async function checkLink(url: string, depth: number) {
    if (visited.has(url) || depth > maxDepth || visited.size >= maxLinks) return
    visited.add(url)

    try {
      const response = await axios.get(url, { timeout: 5000 })
      if (response.status >= 400) {
        brokenLinks.push({ url, status: response.status })
      } else if (response.headers['content-type']?.includes('text/html')) {
        const $ = cheerio.load(response.data)
        const links = $('a').map((i, el) => $(el).attr('href')).get()
        
        for (const link of links) {
          const absoluteLink = new URL(link, url).href
          if (absoluteLink.startsWith(baseUrl)) {
            await checkLink(absoluteLink, depth + 1)
          }
        }
      }
    } catch (error) {
      brokenLinks.push({ url, status: error.message })
    }
  }

  await checkLink(baseUrl, 0)

  return NextResponse.json({
    brokenLinks,
    totalChecked: visited.size,
    totalBroken: brokenLinks.length
  })
}
