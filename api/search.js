
const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

const client = require('contentful').createClient({
    space: space,
    accessToken: accessToken,
});

exports.handler = async function(event, context) {
    // your server-side functionality
    const {identity, user} = context.clientContext;

    let filter = {
        'content_type': 'testArticle'
    }

    if (!user) {
        filter['fields.premium'] = false;
    }

    // logged in
    return client.getEntries(filter)
    .then(function (entries) {
        if (entries.items) {
            return {
                statusCode: 200,
                body: JSON.stringify({content: entries.items})
            }
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({content: []})
            }
        }
    }).catch((e) => {
        return {
            statusCode: 200,
            body: JSON.stringify({content: 'fail'})
        }
    })
}