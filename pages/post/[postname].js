import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

import Layout from '@components/Layout'
import getSlugs from '@utils/getSlugs'

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>

  return (
    <>
      <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
        {/* <div className="back">
          ←{' '}
          <Link href="/">
            <a>Back to post list</a>
          </Link>
        </div> */}
        <article>
          <h1>{frontmatter.title}</h1>
          <section>
            {frontmatter.hero_image && (
              <img
                src={frontmatter.hero_image}
                className="hero"
                alt={frontmatter.title}
              />
            )}
          </section>
          <div>
            <ReactMarkdown source={markdownBody} />
          </div>
        </article>
      </Layout>
      <style jsx>{`
        article {
          width: 100%;
          max-width: 700px;
          position: relative;
        }
        h1 {
          font-size: 2rem;
        }
        h3 {
          font-size: 1.5rem;
        }
        section {
          background-image: url('../static/dot.svg');
          background-color: #4a488e;
          width: auto;
          height: 300px;
          position: relative;
          display: flex;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
        }
        section:before,
        section:after {
          width: calc(100% - 20px);
          height: 0;
          display: block;
          position: absolute;
          left: 0;
          content: "";
        }
        section:before{
          border-bottom: solid 20px #4a488e;
          border-right: solid 20px transparent;
          bottom: 100%;
        }
        .hero {
          width: 110px;
        }
        div {
          margin-top: 3rem;
          line-height: 1.8;
        }
        .back {
          width: 100%;
          max-width: 1200px;
          color: #00a395;
        }
      `}</style>
    </>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params

  const content = await import(`../../posts/${postname}.md`)
  const config = await import(`../../siteconfig.json`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    return getSlugs(context)
  })(require.context('../../posts', true, /\.md$/))

  const paths = blogSlugs.map((slug) => `/post/${slug}`)

  return {
    paths, // An array of path names, and any params
    fallback: false, // so that 404s properly appear if something's not matching
  }
}
