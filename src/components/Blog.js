const Blog = ({ blog }) => (
  <div>
    {blog.title} - {blog.author} - {blog.likes} likes
  </div>
)

export default Blog
