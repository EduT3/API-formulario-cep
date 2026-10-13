const test = require('node:test');
const assert = require('node:assert/strict');
const { context, element } = require('./dom.cjs');

test('CEP validation, successful lookup, and stale requests', async () => {
 const pending = []; const t = context({ fetch: (url) => new Promise(resolve => pending.push({ url, resolve })) });
 t.load('scripts.js'); await t.run('buscaEndereco("123")'); assert.equal(pending.length, 0);
 const first = t.run('buscaEndereco("01001-000")'); assert.match(pending[0].url, /01001000/);
 const second = t.run('buscaEndereco("20040002")');
 pending[1].resolve({ ok: true, json: async () => ({ localidade: 'Nova cidade', uf: 'RJ' }) }); await second;
 pending[0].resolve({ ok: true, json: async () => ({ localidade: 'Antiga cidade', uf: 'SP' }) }); await first;
 assert.equal(t.get('cidade').value, 'Nova cidade');
 t.get('cep').events.input(); assert.equal(t.get('cidade').value, '');
});
