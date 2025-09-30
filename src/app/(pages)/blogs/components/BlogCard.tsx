import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import Link from 'next/link'

// Define the Blog type based on your sample data
export interface Blog {
  author: string
  currentSlug: string
  smallDescription: string
  title: string
  titleImage: any
  category?: string
}

interface BlogCardProps {
  blog: Blog
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  // Determine the link for navigation (assuming Next.js routing)
  const href = `/blog/${blog.currentSlug}`

  return (
    // Wrap the card in an anchor tag for navigation
    <Link href={href} className="group block h-full" prefetch={true}>
      <Card className="flex h-full flex-col overflow-clip pt-0 transition-all duration-300 hover:shadow-lg">
        <div className="relative h-1/2 w-full overflow-hidden">
          {/* Using a responsive image with object-cover for consistent sizing */}
          <Image
            src={
              urlFor(blog.titleImage).url() ??
              `https://placehold.co/600x400/CCCCCC/333333?text=No-Image`
            }
            alt={`Cover image for ${blog.title}`}
            width={0}
            sizes="100vw"
            height={0}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <CardHeader className="">
          {/* Optional: Add a Badge for category if available */}

          {blog.category && (
            <div className="mb-2">
              <Badge variant="secondary">{blog.category}</Badge>
            </div>
          )}
          <CardTitle className="mt-2 flex-grow text-xl leading-snug transition-colors duration-300 group-hover:text-primary">
            {blog.title}
          </CardTitle>
          <CardDescription className="text-sm text-blue-400">
            By {blog.author}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow pt-2">
          {/* Display a truncated version of the description */}
          <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
            {blog.smallDescription}
          </p>
        </CardContent>
        {/* Optional: Add a footer or a button here */}
        {/* <CardFooter>Read More</CardFooter> */}
      </Card>
    </Link>
  )
}
