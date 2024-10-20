import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from '@/types'

const postsDirectory = path.join(process.cwd(), 'data', 'blog-posts')

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const fileNames = await fs.readdir(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = await fs.readFile(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        ...data,
        content,
      } as BlogPost
    })
  )

  return allPostsData.sort((a, b) => (a.publishedDate > b.publishedDate ? -1 : 1))
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = await fs.readFile(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      ...data,
      content,
    } as BlogPost
  } catch (error) {
    console.error(`Error fetching blog post: ${error}`)
    return null
  }
}