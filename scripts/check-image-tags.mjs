// Every container image tag this project documents has to actually exist in the registry.
//
// The README's one runnable self-hosting command is a `docker run` against a tag. If that tag
// is not published, the command fails with "manifest unknown" and the reader concludes the
// project does not work, which is the opposite of what the page is for. That happened: the
// publishing workflow creates `:latest` only for a published release, the README told people
// to run `:latest`, and no release had been cut since the workflow landed, so the headline
// self-hosting command was broken from the day it was written.
//
// So read every ghcr.io reference out of the documentation, ask the registry whether each one
// resolves, and fail on one that does not. No credentials: a public package answers an
// anonymous token, and a private one would fail here too, which is also worth knowing.
//
// A placeholder such as `:sha-<commit>` is skipped, because the angle brackets keep it out of
// the pattern. Network trouble is not a documentation error, so an unreachable registry warns
// and passes; only a definite "that tag is not there" fails the run.

import { readFile } from 'node:fs/promises'
import process from 'node:process'

const FILES = ['README.md', 'CHANGELOG.md']
const REF = /ghcr\.io\/([a-z0-9._-]+)\/([a-z0-9._-]+):([A-Za-z0-9][A-Za-z0-9._-]*)/g
const ACCEPT = [
  'application/vnd.oci.image.index.v1+json',
  'application/vnd.oci.image.manifest.v1+json',
  'application/vnd.docker.distribution.manifest.list.v2+json',
  'application/vnd.docker.distribution.manifest.v2+json',
].join(', ')

async function anonymousToken(repository) {
  const url = `https://ghcr.io/token?scope=repository:${repository}:pull&service=ghcr.io`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`token endpoint answered ${response.status}`)
  const body = await response.json()
  if (!body.token) throw new Error('token endpoint returned no token')
  return body.token
}

async function collect() {
  /** @type {Map<string, Set<string>>} repository -> tags */
  const wanted = new Map()
  /** @type {Map<string, string[]>} "repository:tag" -> files it appears in */
  const where = new Map()

  for (const file of FILES) {
    let text
    try {
      text = await readFile(file, 'utf8')
    } catch {
      continue // a file this project does not have is not a failure
    }
    for (const [, owner, name, tag] of text.matchAll(REF)) {
      const repository = `${owner}/${name}`
      if (!wanted.has(repository)) wanted.set(repository, new Set())
      wanted.get(repository).add(tag)
      const key = `${repository}:${tag}`
      where.set(key, [...new Set([...(where.get(key) ?? []), file])])
    }
  }
  return { wanted, where }
}

const { wanted, where } = await collect()

if (wanted.size === 0) {
  console.log('check-image-tags: no ghcr.io image tags are documented, nothing to check.')
  process.exit(0)
}

const missing = []
const skipped = []
let checked = 0

for (const [repository, tags] of wanted) {
  let token
  try {
    token = await anonymousToken(repository)
  } catch (error) {
    skipped.push(`${repository}: ${error.message}`)
    continue
  }

  for (const tag of [...tags].sort()) {
    const url = `https://ghcr.io/v2/${repository}/manifests/${tag}`
    let response
    try {
      response = await fetch(url, {
        method: 'HEAD',
        headers: { authorization: `Bearer ${token}`, accept: ACCEPT },
      })
    } catch (error) {
      skipped.push(`${repository}:${tag}: ${error.message}`)
      continue
    }
    checked += 1
    if (response.ok) {
      console.log(`  ok       ghcr.io/${repository}:${tag}`)
    } else if (response.status === 404) {
      missing.push({ ref: `${repository}:${tag}`, files: where.get(`${repository}:${tag}`) })
      console.log(`  MISSING  ghcr.io/${repository}:${tag}`)
    } else {
      skipped.push(`${repository}:${tag}: registry answered ${response.status}`)
    }
  }
}

for (const note of skipped) console.warn(`  skipped  ${note}`)

if (missing.length > 0) {
  console.error('')
  console.error('These image tags are documented but are not in the registry:')
  for (const { ref, files } of missing) {
    console.error(`  ghcr.io/${ref}   named in ${files.join(', ')}`)
  }
  console.error('')
  console.error('Either publish the tag or document one that exists. `:latest` and a version')
  console.error('tag are only created for a published release; `:edge` follows the default')
  console.error('branch and `:sha-<commit>` is created for every build.')
  process.exit(1)
}

console.log(`check-image-tags: ${checked} documented image tag(s) resolve.`)
