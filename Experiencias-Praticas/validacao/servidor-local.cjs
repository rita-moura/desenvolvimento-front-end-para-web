const http = require('node:http');
const { readFile } = require('node:fs/promises');
const { resolve, extname, sep } = require('node:path');

// Servidor temporário para verificar módulos ES e recursos usando HTTP, como na publicação.
module.exports = async function servir(raiz) {
  const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
  const servidor = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const arquivo = resolve(raiz, '.' + decodeURIComponent(url.pathname));
      if (!arquivo.startsWith(resolve(raiz) + sep)) throw new Error('Caminho fora do site');
      const corpo = await readFile(arquivo);
      res.writeHead(200, { 'Content-Type': tipos[extname(arquivo)] || 'application/octet-stream' });
      res.end(corpo);
    } catch { res.writeHead(404); res.end('Não encontrado'); }
  });
  await new Promise((ok, falha) => { servidor.once('error', falha); servidor.listen(0, '127.0.0.1', ok); });
  return { url: `http://127.0.0.1:${servidor.address().port}`, fechar: () => new Promise(ok => servidor.close(ok)) };
};
