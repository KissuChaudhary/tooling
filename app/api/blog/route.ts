import { NextResponse } from 'next/server'
import { getAllBlogPosts, getBlogPost } from '@/lib/blog'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (slug) {
    const post = await getBlogPost(slug)
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } else {
    const posts = await getAllBlogPosts()
    return NextResponse.json(posts)
  }
}