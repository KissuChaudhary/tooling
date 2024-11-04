import { NextRequest, NextResponse } from 'next/server'
import { LRUCache } from 'lru-cache'

const rateLimit = new LRUCache<string, number>({
  max: 500,
  ttl: 15 * 60 * 1000, // 15 minutes
})

function getIP(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for')
  return xff ? (Array.isArray(xff) ? xff[0] : xff.split(',')[0]) : '127.0.0.1'
}

export async function applyRateLimit(request: NextRequest) {
  const ip = getIP(request)
  const tokenCount = rateLimit.get(ip) ?? 0

  if (tokenCount > 5) {
    return NextResponse.json(
      { error: 'Whoa there, speed racer! Looks like you have got us working overtime. Take a breather and try again later' },
      { status: 429 }
    )
  }

  rateLimit.set(ip, tokenCount + 1)
}
