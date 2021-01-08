import Head from 'next/head'
import { useState, useEffect } from 'react';
const netlifyIdentity = require('netlify-identity-widget');

import { fetchEntries, fetchEntry } from '@utils/contentfulPosts'

import Header from '@components/Header'
import Footer from '@components/Footer'
import Post from '@components/Post'



export default function Article({ post }) {
  var [user, setUser] = useState(null);
  var [results, setResults] = useState([]);

  useEffect(() => {
    netlifyIdentity.on('init', user => {
      console.log('init', user)
      setUser(user);
    });
    netlifyIdentity.init({
      locale: 'en' // defaults to 'en'
    });
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Next + Contentful Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <div>
            <div><strong>Title:</strong> {post.fields.articleTitle}</div>
            <br />
            <br />
            <div><strong>Body:</strong> {post.fields.articlebody}</div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .posts {
          display: flex;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const posts = await fetchEntries({
        'content_type': 'testArticle',
        'fields.premium': false
    })
    // console.log(posts);
  
    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
      params: { id: post.sys.id },
    }))

    // console.log(paths);
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }

export async function getStaticProps({ params }) {
  const post = await fetchEntry(params.id);

  // console.log(post);

  return {
    props: {
      post: post,
    },
  }
}
