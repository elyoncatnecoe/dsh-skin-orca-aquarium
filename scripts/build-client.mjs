#!/usr/bin/env node
/**
 * Build lib/client.js: inline the vendored orca-aquarium embed into the Client
 * source template so the Client half ships as one classic script for the page's
 * module table (`window.__ModuleLoader__.load`).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const templatePath = path.join(root, 'src', 'client.js');
const vendorPath = path.join(root, 'lib', 'vendor', 'orca-embed.js');
const outputPath = path.join(root, 'lib', 'client.js');
const marker = '/* __ORCA_AQUARIUM_VENDOR__ */';

const [template, vendor] = await Promise.all([
  readFile(templatePath, 'utf8'),
  readFile(vendorPath, 'utf8'),
]);

if (!template.includes(marker)) {
  throw new Error(`vendor marker missing from ${path.relative(root, templatePath)}`);
}

// The vendor is inserted verbatim: re-indenting it could rewrite a multi-line
// template literal (its shader sources), and one extra scope keeps its helpers
// out of the page globals. A function replacement avoids `$` substitution.
const wrapped = [
  '    // ---- vendored orca-aquarium embed: lib/vendor/orca-embed.js ----',
  '    (function () {',
  vendor,
  '    }).call(globalThis);',
  '    // ---- end vendored orca-aquarium embed ----',
].join('\n');

const output = template.replace(marker, () => wrapped);
await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, output, 'utf8');
console.log(`built ${path.relative(root, outputPath)}: ${Buffer.byteLength(output, 'utf8')} bytes`);
