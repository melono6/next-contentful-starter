import Head from 'next/head'
import { useState, useEffect } from 'react';
const netlifyIdentity = require('netlify-identity-widget');

import { fetchEntries } from '@utils/contentfulPosts'

import Header from '@components/Header'
import Footer from '@components/Footer'
import Post from '@components/Post'



export default function Home({ posts }) {
  var [count, setCount] = useState(0);
  var [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.on('init', user => {
      console.log('init', user)
      setUser(user);
    });
    netlifyIdentity.init({
      locale: 'en' // defaults to 'en'
    });
    netlifyIdentity.on('login', user => {
      console.log('login', user)
      setUser(user);
    });
    setInterval(() => {
      setCount(count++);
    }, 1000);
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
          {!user ? (<a href="" onClick={(e) => {
            e.preventDefault();
            netlifyIdentity.open();
          }}>Login/signup</a>) : (
            <a href="" onClick={(e) => {
              e.preventDefault();
              netlifyIdentity.logout();
              setUser(null);
            }}>Logout</a>
          )}
        </div>
        <div>
          <a href="" onClick={(e) => {
            e.preventDefault();
            fetch('/.netlify/functions/content', {
              method: 'GET',
              withCredentials: true,
              credentials: 'include',
              headers: {
                  'Authorization': 'Bearer ' + (user ? user.token.access_token : ''),
                  'Content-Type': 'application/json'
              }
            }).then(responseJson => {
                console.log(responseJson);
            })
            .catch(error => this.setState({
                isLoading: false,
                message: 'Something bad happened ' + error
            }));
          }}>Test premium fetch</a>
        </div>
        <div>
          {count}
        </div>
        <div className="posts">
          {posts.map((p) => {
            return <Post key={p.date} date={p.date} image={p.image.fields} title={p.title} />
          })}
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

export async function getStaticProps() {
  const res = await fetchEntries()
  const posts = await res.map((p) => {
    return p.fields
  })

  return {
    props: {
      posts,
    },
  }
}
