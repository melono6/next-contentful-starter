import React from 'react'
import Components from '../components/index'

export default ({content}) => {
    console.log('HERE', content);
  return (
    <div class="layout">
        <div>
            title: {content.title}
        </div>
        <div class="body">
            {content.contentModules.map((contentModule) => {
                return Components(contentModule.fields, contentModule.sys.contentType.sys.id);
            })}
        </div>
    </div>
  );
}