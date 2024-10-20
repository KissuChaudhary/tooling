import Image from 'next/image'
import { Author } from '@/types'

interface AuthorBioProps {
  author: Author
}

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="flex items-center">
      <Image
        src={author.avatar}
        alt={author.name}
        width={64}
        height={64}
        className="rounded-full mr-4"
      />
      <div>
        <h3 className="font-semibold">{author.name}</h3>
        <p className="text-sm text-gray-600">{author.bio}</p>
      </div>
    </div>
  )
}