#!/usr/bin/env node
// Signs the exact bytes of catalog.yaml with the ed25519 key in CATALOG_SIGNING_KEY
// (PEM) and writes catalog-<sha256>.sig. Prints the file name. Used by sign.yml.
import { createHash, createPrivateKey, sign } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const pem = process.env.CATALOG_SIGNING_KEY, keyId = process.env.CATALOG_SIGNING_KEY_ID;
if (!pem || !keyId) { console.error('CATALOG_SIGNING_KEY and CATALOG_SIGNING_KEY_ID are required'); process.exit(2); }
const raw = readFileSync('catalog.yaml');
const sha256 = createHash('sha256').update(raw).digest('hex');
const signature = sign(null, raw, createPrivateKey(pem)).toString('base64');
const name = `catalog-${sha256}.sig`;
writeFileSync(name, JSON.stringify({ v: 1, alg: 'ed25519', key_id: keyId, sha256, signature }) + '\n');
console.log(name);
