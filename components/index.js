import React from 'react'
import LayoutCopy from './LayoutCopy'

const Components = {
  'layoutCopy': LayoutCopy,
}

export default (content, component) => {
  if (typeof Components[component] !== 'undefined') {
    return React.createElement(Components[component], {content: content})
  }
  return React.createElement(() => (
    <div>The component {component} has not been created yet.</div>
  ), {key: blok._uid})
}