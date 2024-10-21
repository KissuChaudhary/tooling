import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { BlogPost } from '@/types'


interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="rounded-lg shadow-md overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          width={400}
          height={225}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-500 text-sm mb-4">{post.excerpt}</p>
          <div className="flex items-center text-sm text-gray-500">
            <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
            <span className="mx-2">•</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  )
}