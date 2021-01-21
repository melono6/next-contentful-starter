# POC Netlify + Netlify-identity + Next.js + Contentful

##Covered in this POC:
**1. Static deploy using next.js and netlify to host**
Netlify links straight into github or gitlab repos. All that needs to be confirued is what commands to run for build and where the build assets output to. Can be configured to build every push to specific branch and auto-publish or cna preview before publish. easy rollbacks to previous builds.

**2. Login/Signup with netlify-idenity**
using netlifys login widget for this: https://github.com/netlify/netlify-identity-widget if heavy customisation is requierd we would need to use the lower level api: https://github.com/netlify/gotrue-js

**3. looking at how netlify handles forms**
adding a html-attribute into the html form, netlify will handle the form submission and sotring of form data for us.

**4. Ability to use 1 contentful space while keeping some content behind authwall**
added field "premium" as boolean to articles in contentful so they can be correctly tagged up.
Public and private articles are then statically generated at build time with different url scheme to determine premium posts: eg /posts/* and /posts/premium/*
then using role based redirects within netlify, we can hide premium urls unless user is logged in as a premium role (https://docs.netlify.com/visitor-access/role-based-access-control/)

**5. Able to text-search against contentful content, results dependant on loggedin or out without keys being in FE code**
Using netlify serverless functions + netlify-identity, we can set up functions that will take the users JWT as a bearer header and validate the user before connecting to contentful to request data. If the user is logged in, premium posts are also returned (https://docs.netlify.com/functions/functions-and-identity/)


## Demo links:
https://friendly-hugle-6dd81c.netlify.app/ - Here you can login/signup (NOTE: signing up wont give you access to premium posts, let me know if you want and i can set your login to 'premium' role after sign up)

https://friendly-hugle-6dd81c.netlify.app/search - here you can search for articles created in contentful (need to be logged as a premium role for premium artiles to be displayed)

https://friendly-hugle-6dd81c.netlify.app/posts/17yxe3n6sh28bphk2wmo8h - public post example

https://friendly-hugle-6dd81c.netlify.app/posts/premium/3ftspjb1xxtekmtowdecpw - premium post example (will 404 if not logged in as premium user)


## Local setup
rename .env.example to .env

add keys, my testig acount detials below:
```
FUNC_PRIVATE_CONTENTFUL_SPACE_ID=ieb3bcp5p39h
FUNC_PRIVATE_CONTENTFUL_ACCESS_TOKEN=lIGEmCt62XgARAlDpBFBI0rIEeaaNvBc6qQVSrel7Cw
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=g2t0rmtsvrcd
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=WzRvBJpadbS9coUgtPsvR2HpSabZjxvpo3Nbch7Z53M
```

```
npm i
npm run dev
```

you can use netlify-dev to run instead which is useful as it allowed the severless functions to work as they would in live
```
npm install netlify-cli -g
netlify dev
```
NOTE: seems to be a bug with the redirects in netlify-dev not working correctly, if using this comment out redirect rules in netlify.toml