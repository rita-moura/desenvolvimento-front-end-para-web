import { cp, mkdir, rm, writeFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destino = resolve(raiz, '.pages');
await access(resolve(raiz, 'dist/html/index.html'));
// O caminho antigo permanece válido; somente a saída já validada é copiada.
await rm(destino, { recursive: true, force: true });
await mkdir(destino, { recursive: true });
await cp(resolve(raiz, 'dist'), resolve(destino, 'Experiencias-Praticas'), { recursive: true });
await writeFile(resolve(destino, 'index.html'), '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=Experiencias-Praticas/html/index.html"><title>Laços da Comunidade</title></head><body><a href="Experiencias-Praticas/html/index.html">Abrir o site Laços da Comunidade</a></body></html>\n');
console.log('Artefato do GitHub Pages preparado em .pages/.');
