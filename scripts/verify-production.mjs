import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import {chromium} from '@playwright/test';
const root=resolve('dist');
const server=createServer(async(req,res)=>{try{const path=new URL(req.url,'http://localhost').pathname;if(!path.startsWith('/sample-repository/')){res.writeHead(404).end();return;}const file=resolve(root,path.slice('/sample-repository/'.length)||'index.html');if(!file.startsWith(root)){res.writeHead(403).end();return;}const data=await readFile(file);res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'})[extname(file)]||'application/octet-stream');res.end(data);}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(4184,'127.0.0.1',r));
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||undefined});
try{const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1')&&r.status()>=400)errors.push(r.url());});await page.goto('http://127.0.0.1:4184/sample-repository/');await page.getByRole('button',{name:'MULA MISI',exact:true}).click();await page.getByRole('heading',{name:'Pilih Pasukan Anda'}).waitFor();if(errors.length)throw new Error(errors.join('\n'));console.log('Production subpath /sample-repository/: assets and interaction passed.');}finally{await browser.close();server.close();}
