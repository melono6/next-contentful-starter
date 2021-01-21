const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
})

const previewClient = require('contentful').createClient({
  space: space,
  accessToken: previewToken,
  host: "preview.contentful.com"
})

export async function fetchEntries(filter) {
  const entries = await client.getEntries(filter)
  if (entries.items) return entries.items
  console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function fetchEntry(id) {
  const entry = await client.getEntry(id)
  if (entry) return entry
  console.log(`Error getting entry for id ${id}.`)
}

export async function fetchPreview(id) {
  const entry = await previewClient.getEntry(id)
  if (entry) return entry
  console.log(`Error getting entry for id ${id}.`)
}

export default { fetchEntries }
