import Link from 'next/link'

export default function PostList({ posts }) {
  if (posts === 'undefined') return null

  return (
    <>
      <div>
        {!posts && <div>No posts!</div>}
        <ul>
          {posts &&
            posts.map((post) => {
              return (
                <li key={post.slug}>
                  
                  <Link href={{ pathname: `/post/${post.slug}` }}>
                    <a>{post?.frontmatter?.title}</a>
                  </Link>
                  <br />
                  <small className="date">
                    {post.frontmatter.date} {` `}
                  </small>
                </li>
              )
            })}
        </ul>
      </div>
      <style jsx>{`
        div {
          max-width: 700px;
        }
        li {
          list-style: none;
          padding-bottom: 25px;
        }
        a {
          font-size: 1.1rem;
          font-weight: bold;
        }
      `}</style>
    </>
  )
}