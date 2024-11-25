import React from 'react'
import { BlogPost } from '@/types'

interface BlogPostSchemaProps {
  post: BlogPost
  url: string
}

export function BlogPostSchema({ post, url }: BlogPostSchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: post.title,
    image: [post.coverImage],
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      description: post.author.bio
    },
    publisher: {
      '@type': 'Organization',
      name: 'SazeAI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sazeai.com/logo.png'
      }
    },
    description: post.seoDescription,
    keywords: post.focusKeyword
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}

