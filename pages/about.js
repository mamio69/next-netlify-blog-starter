import Layout from '@components/Layout'

const About = ({ title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={`${title} | About`} description={description}>
        <h1 className="title">まみおブログへようこそ!</h1>

        <p className="description">
          このブログは
          <a href="https://nextjs.org/">Next.js</a>.
          と{' '}
          <a href="https://url.netlify.com/r1j6ybSYU">Netlify</a>.
          で作成しました。
        </p>

        {/* <p>
          You can check out the{' '}
          <a href="https://github.com/cassidoo/next-netlify-blog-starter">
            repo here.
          </a>{' '}
          If you'd like to build it yourself,{' '}
          <a href="https://url.netlify.com/ByVW0bCF8">
            here is a tutorial on how to do so
          </a>
          !
        </p>

        <p>
          This project includes a basic layout and header, base styles, dynamic
          routing with getStaticPaths, and posts saved as Markdown.
        </p> */}
      </Layout>
    </>
  )
}

export default About

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
