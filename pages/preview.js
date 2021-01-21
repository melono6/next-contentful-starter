import NextHead from 'next/head'
import React from 'react'
import Templates from '../templates';

import { fetchPreview } from '@utils/contentfulPosts'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        pageContent: null,
    }
    
  }

  static async getInitialProps(props) {
      console.log('oo, where these?', props)
    // StoryblokService.setQuery(query)
    // let slug = query.slug || 'home'

    // return {
    // //   page: await StoryblokService.get(`cdn/stories/${slug}`)
    // }
    return {};
  }

  componentDidMount() {
    console.log('props', this.props);
      console.log(
          this.props,
        this.props.url.asPath,
        this.props.url.pathname,
          
      );
    const entryId = this.props.url.asPath.replace(this.props.url.pathname, '').replace('/', '');
    console.log(entryId);
    fetchPreview(entryId).then((res) => {
        console.log(res);
        this.setState({
            pageContent: res
        })
    });
    // console.log(res);
    
    // StoryblokService.setQuery(slug);

    // StoryblokService.get(`cdn/stories/${slug}`, {}, true).then((a, b) => {
    //     console.log(a,b);
    //     this.setState({
    //         pageContent: a.data.story.content
    //         // page: await StoryblokService.get(`cdn/stories/${slug}`)
    //     })

    //     setTimeout(() => {
    //         StoryblokService.initEditor(this, true);
    //     }, 2000);

    // });

    
  }

  render() {

    return (
      <div>
        Preview
        
        {this.state.pageContent && (
            Templates(this.state.pageContent.fields, this.state.pageContent.sys.contentType.sys.id)
        )}
        


        <style jsx global>{`
          html {
              font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              font-size: 16px;
              word-spacing: 1px;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              -moz-osx-font-smoothing: grayscale;
              -webkit-font-smoothing: antialiased;
              box-sizing: border-box;
            }

            *, *:before, *:after {
              box-sizing: border-box;
              margin: 0;
            }

            .teaser,
            .column {
              font-size: 2rem;
              text-align: center;
              line-height: 3;
              background: #ebeff2;
              border-radius: 10px;
              margin: 10px 5px;
            }

            .grid {
              display: flex;
            }

            .column {
              flex: 1;
            }
          `}</style>
      </div>
    )
  }
}
