#!/usr/bin/env node
// Generates a new ed25519 key for signing catalog.yaml.
// The private key goes straight to the GitHub environment secret CATALOG_SIGNING_KEY
// (environment catalog-signing) through `gh`, and is never printed. The key id goes to
// the environment variable CATALOG_SIGNING_KEY_ID. Prints only the public key entry that
// the ihc and the iht pin.
//
// Usage: node scripts/new-signing-key.mjs <key-id> [--backup <path>]
//   --backup writes the private key PEM (mode 600) for an offline copy (password vault).
import { generateKeyPairSync } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const [keyId, flag, backup] = process.argv.slice(2);
if (!/^[a-z0-9][a-z0-9-]{2,40}$/.test(keyId || '') || (flag && (flag !== '--backup' || !backup))) {
  console.error('usage: node scripts/new-signing-key.mjs <key-id> [--backup <path>]');
  process.exit(2);
}
const repo = 'In-House-Technology/catalog', env = 'catalog-signing';
const { privateKey, publicKey } = generateKeyPairSync('ed25519');
const pem = privateKey.export({ type: 'pkcs8', format: 'pem' });
const gh = (args, input) => {
  const r = spawnSync('gh', args, { input, stdio: ['pipe', 'inherit', 'inherit'] });
  if (r.status !== 0) { console.error(`gh ${args.slice(0, 2).join(' ')} failed`); process.exit(1); }
};
gh(['secret', 'set', 'CATALOG_SIGNING_KEY', '--env', env, '--repo', repo], pem);
gh(['variable', 'set', 'CATALOG_SIGNING_KEY_ID', '--env', env, '--repo', repo, '--body', keyId]);
if (backup) writeFileSync(backup, pem, { mode: 0o600, flag: 'wx' });
const x = publicKey.export({ format: 'jwk' }).x;
const entry = { key_id: keyId, alg: 'ed25519', public_key: Buffer.from(x, 'base64url').toString('base64') };
console.log(JSON.stringify(entry));
