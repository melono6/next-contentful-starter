import React from 'react'
import Layout from './Layout'

const Templates = {
  'layout': Layout,
}

export default (content, template) => {

  if (typeof Templates[template] !== 'undefined') {
    return React.createElement(Templates[template], {content: content})
  }
  return React.createElement(() => (
    <div>The template {template} has not been created yet.</div>
  ), {key: blok._uid})
}