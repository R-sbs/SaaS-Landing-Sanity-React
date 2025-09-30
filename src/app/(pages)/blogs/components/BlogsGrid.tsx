import React from 'react'
import { BlogCard, Blog } from './BlogCard'

// Define the props for the grid component
interface BlogsGridProps {
  blogs: Blog[]
}

export const BlogsGrid: React.FC<BlogsGridProps> = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No blog posts available.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.currentSlug} blog={blog} />
      ))}
    </div>
  )
}
