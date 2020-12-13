
const space = process.env.FUNC_PRIVATE_CONTENTFUL_SPACE_ID;
const accessToken = process.env.FUNC_PRIVATE_CONTENTFUL_ACCESS_TOKEN;

const client = require('contentful').createClient({
    space: space,
    accessToken: accessToken,
});

exports.handler = async function(event, context) {
    // your server-side functionality
    const {identity, user} = context.clientContext;

    if (user) {
        // logged in
        const entries = await client.getEntries()
        if (entries.items) {
            return {
                statusCode: 200,
                body: JSON.stringify({content: entries.items})
            }
        }
    } else {
        return {
            statusCode: 403,
            body: JSON.stringify({message: "Unauthorized"})
        };
    }
}