'use client'
import { Badge } from '@/components/ui/badge'
import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/Button'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import { client, urlFor } from '@/lib/sanity'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { PortableText } from 'next-sanity'

// --- DATA STRUCTURE AND MOCK API ---

interface Blog {
  author: string
  currentSlug: string
  smallDescription: string
  title: string
  titleImage: string
  content: any
  category?: string
  readingTime?: string
  publishedAt?: string
}

const fetchBlogBySlug = async (slug: any): Promise<Blog | null> => {
  const SINGLE_BLOG_QUERY = `*[_type == 'blog' && slug.current == '${slug}'] {
  title,
    smallDescription,
    "currentSlug": slug.current,
    author,
    titleImage,
    content,
     "publishedAt": _createdAt,    
} [0]`
  const options = { next: { revalidate: 30 } }

  const data = await client.fetch(SINGLE_BLOG_QUERY, {}, options)

  return data
}

/**
 * Main component for the Single Blog Post Page.
 * Uses a fixed layout for optimal readability.
 */
const SingleBlogPage = ({ params }: any) => {
  const router = useRouter()
  const { slug } = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  const loadBlogContent = useCallback(async () => {
    setLoading(true)
    const fetchedBlog = await fetchBlogBySlug(slug)
    console.log(slug, fetchedBlog)
    setBlog(fetchedBlog)
    setLoading(false)
  }, [slug])

  useEffect(() => {
    loadBlogContent()
  }, [loadBlogContent])

  // --- State and Handlers for Reading Progress (UX enhancement) ---
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = () => {
    const winScroll = document.documentElement.scrollTop
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    const scrolled = (winScroll / height) * 100
    setScrollProgress(scrolled)
  }

  useEffect(() => {
    // Attach scroll listener only when content is loaded
    if (blog) {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [blog])

  // --- RENDER LOGIC ---

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-center gap-4 text-lg text-blue-500">
          <Loader2 className="animate-spin" size={20} />
          Loading Blog Post...
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-xl text-red-500">Error: Blog post not found.</div>
      </div>
    )
  }

  const handleBackClick = () => {
    router.push('/blogs')
  }

  const publishedDate = blog && new Date(blog.publishedAt as string)

  return (
    <div className="min-h-screen bg-background font-sans text-gray-900 dark:bg-gray-900 dark:text-gray-50">
      {/* Reading Progress Bar (Fixed at top) */}
      <div className="fixed top-0 left-0 z-50 h-1 w-full bg-gray-200 dark:bg-gray-800">
        <div
          className="h-full bg-blue-600 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back Button (Fixed) */}
      <div className="fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          onClick={handleBackClick}
          className="flex items-center bg-white shadow-lg dark:bg-gray-800 dark:text-slate-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Articles
        </Button>
      </div>

      {/* Main Content Container: Optimized for reading (max-w-4xl) */}
      <article className="mx-auto max-w-4xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 dark:bg-gray-900">
        {/* 1. Header and Metadata */}
        <header className="mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900 dark:text-blue-300"
          >
            {blog.category ?? 'General'}
          </Badge>
          <h1 className="mb-4 text-5xl leading-tight font-extrabold tracking-tighter md:text-6xl">
            {blog.title}
          </h1>
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-400">
            {blog.smallDescription}
          </p>

          {/* Author and Date Row */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="font-semibold text-gray-700 dark:text-gray-200">
              {blog.author}
            </div>
            <span>&bull;</span>
            <div>{publishedDate.toDateString()}</div>
            <span>&bull;</span>
            <div>{blog.readingTime ?? '5 min Read'}</div>
          </div>
        </header>

        <Separator className="mb-10" />

        {/* 2. Featured Image */}
        <figure className="mb-12 overflow-hidden rounded-xl shadow-2xl">
          <Image
            src={
              urlFor(blog.titleImage).url() ??
              'https://placehold.co/1200x600/CCCCCC/333333?text=Featured+Image'
            }
            alt={`Featured image for ${blog.title}`}
            className="h-auto w-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            priority
          />
          <figcaption className="!bg-transparent py-2 text-center text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-500">
            Visualizing the power of focus.
          </figcaption>
        </figure>

        {/* 3. Main Content Body */}
        <section className="prose max-w-none text-lg leading-relaxed">
          <PortableText value={blog.content} />
        </section>

        <Separator className="my-16" />

        {/* 4. Footer & Author Box */}
        <footer className="rounded-lg border bg-gray-50 p-6 shadow-inner dark:bg-gray-800">
          <h3 className="mb-3 text-xl font-bold">
            About the Author: {blog.author}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {blog.author} is a leading expert in cognitive performance and
            behavioral science. Their work focuses on creating sustainable,
            science-backed habits for high-achievers. Connect with them for more
            insights into achieving deep work.
          </p>
        </footer>
      </article>
    </div>
  )
}

export default SingleBlogPage
