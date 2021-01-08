import Head from 'next/head'
import { useState, useEffect } from 'react';
import Article from '../[id]';

import { fetchEntries, fetchEntry } from '@utils/contentfulPosts'

export default Article;

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const posts = await fetchEntries({
        'content_type': 'testArticle',
        'fields.premium': true
    })
    console.log('preem', posts);
  
    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
      params: { id: post.sys.id },
    }))

    console.log(paths);
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }

export async function getStaticProps({ params }) {
  const post = await fetchEntry(params.id);

  console.log(post);

  return {
    props: {
      post: post,
    },
  }
}
