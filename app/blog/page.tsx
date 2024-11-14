import { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'
import AdUnit from '../../components/AdUnit'


export const metadata: Metadata = {
  title: 'Saze AI Tools Blog - Latest Insights and Updates',
  description: 'Explore the latest articles on AI tools, machine learning, and productivity enhancements.',
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AdUnit 
  client="ca-pub-7915372771416695"
  slot="8441706260"
  style={{ marginBottom: '20px' }}
/>
      <h1 className="text-4xl font-bold mb-8">Saze AI Blog</h1>
      <div className="grid gap-8 text-foreground md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
