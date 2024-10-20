export interface Author {
    name: string
    bio: string
    avatar: string
  }
  
  export interface BlogPost {
    slug: string
    title: string
    seoTitle: string
    seoDescription: string
    focusKeyword: string
    publishedDate: string
    updatedDate: string
    author: Author
    content: string
    readingTime: number
    coverImage: string
    excerpt: string
  }