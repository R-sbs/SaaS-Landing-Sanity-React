import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { client } from '@/lib/sanity'
import { BlogsGrid } from './components/BlogsGrid'

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc) {
  title,
    smallDescription,
    "currentSlug": slug.current,
    author, 
    titleImage
}`
  const options = { next: { revalidate: 30 } }

  const data = await client.fetch(query, {}, options)

  return data
}

const BlogsPage = async () => {
  const blogs = await getData()
  console.log(blogs)
  return (
    <>
      <Header />
      <main className="mx-auto h-full max-w-6xl">
        <div className="container mx-auto py-12">
          <h1 className="mb-8 text-3xl font-bold">Latest Blog Posts</h1>
          <BlogsGrid blogs={blogs} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default BlogsPage
