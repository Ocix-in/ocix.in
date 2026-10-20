import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';

const server=spawn(process.execPath,['scripts/preview.mjs'],{env:{...process.env,PORT:'4183'},stdio:['ignore','pipe','pipe']});
const output='design/kitchen/services-review';
let browser;
try{
  await new Promise((resolve,reject)=>{server.stdout.on('data',data=>{if(data.toString().includes('production preview'))resolve()});server.on('error',reject);server.on('exit',code=>reject(new Error(`Preview exited: ${code}`)))});
  browser=await chromium.launch({headless:true,executablePath:process.env.OCIX_CHROME_PATH||undefined});
  fs.mkdirSync(output,{recursive:true});
  const results=[];
  for(const [width,height] of [[320,568],[375,667],[390,844],[600,900],[768,1024],[1001,768],[1280,900],[1440,900],[844,390]]){
    const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
    const page=await context.newPage();
    await page.clock.install({time:new Date('2026-10-20T06:00:00Z')});await page.clock.pauseAt(new Date('2026-10-20T06:00:01Z'));
    await page.route('https://**/*',route=>route.abort());
    await page.goto('http://127.0.0.1:4183/services/websites');
    await page.evaluate(()=>Promise.all([document.fonts.ready,...[...document.images].map(image=>image.decode())]));
    assert.equal(await page.locator('link[rel=stylesheet][href^="/assets/services-"]').count(),1,'Service stylesheet must be linked in prerendered HTML');
    assert.equal(await page.title(),'Websites for local businesses | Made to order by OCIX');
    assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://ocix.in/services/websites');
    await page.screenshot({path:`${output}/services-${width}x${height}.png`,fullPage:true});
    const geometry=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth,controls:[...document.querySelectorAll('.website-enquiry input,.website-enquiry textarea,.website-enquiry button,.service-actions a')].filter(el=>el.getClientRects().length).map(el=>{const r=el.getBoundingClientRect();return {x:r.x,right:r.right,width:r.width}})}));
    assert(geometry.width<=width,`Service page overflows at ${width}`);
    assert(geometry.controls.every(rect=>rect.x>=0&&rect.right<=width&&rect.width>0),`Controls must fit at ${width}`);
    assert.equal(await page.locator('h1').count(),1);
    if(width>1000){
      const header=await page.locator('.site-header').evaluate(el=>[...el.children].filter(child=>getComputedStyle(child).display!=='none').map(child=>{const r=child.getBoundingClientRect();return {x:r.x,right:r.right}}));
      assert(header.every((rect,i)=>i===0||rect.x>=header[i-1].right),'Header controls must not overlap');
    }
    assert.equal(await page.locator('[data-website-enquiry]').evaluate(form=>form.checkValidity()),false,'Empty enquiry must require details');
    await page.locator('[data-website-kind=refresh]').click();
    assert(await page.locator('input[value=refresh]').isChecked());
    await page.locator('[name=business]').fill('Mira & Sons — test business');
    await page.locator('[name=email]').fill('mira+website@example.com');
    await page.locator('[name=website]').fill('https://example.com/?a=1&b=2');
    await page.locator('[name=details]').fill('A mobile-friendly shop website.\nPhotos, opening hours & an easy way to call.');
    const submissions=[];page.on('request',request=>{if(request.method()==='POST')submissions.push(request.url())});
    await page.locator('button[type=submit]').click();
    assert(await page.locator('.enquiry-draft').isVisible());
    assert(await page.locator('.enquiry-draft h3').evaluate(el=>el===document.activeElement));
    const href=await page.locator('[data-enquiry-email]').getAttribute('href'),mail=new URL(href);
    assert.equal(mail.protocol,'mailto:');assert.equal(mail.pathname,'support@ocix.in');
    assert.equal(mail.searchParams.get('subject'),'Website enquiry: Mira & Sons — test business');
    const body=mail.searchParams.get('body');
    assert(body.includes('Project: Refresh my website'));assert(body.includes('Reply email: mira+website@example.com'));
    assert(body.includes('https://example.com/?a=1&b=2'));assert(body.includes('\nPhotos, opening hours & an easy way to call.'));
    assert.equal(submissions.length,0,'Preparing enquiry must not submit personal information');
    await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.__copiedEnquiry=text}}}));
    await page.locator('[data-enquiry-copy]').click();
    assert.equal(await page.evaluate(()=>window.__copiedEnquiry),await page.locator('[data-enquiry-text]').inputValue());
    assert((await page.locator('.enquiry-status').textContent()).includes('copied'));
    await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('Unavailable')}}}));
    await page.locator('[data-enquiry-copy]').click();
    assert((await page.locator('.enquiry-status').textContent()).includes('Select and copy'));
    await page.locator('[name=details]').fill('A fresh website for our shop, with services, photos and opening hours.');
    assert.equal(await page.locator('.enquiry-draft').isVisible(),false,'Editing details must invalidate the previous email draft');
    await page.locator('button[type=submit]').click();
    assert(new URL(await page.locator('[data-enquiry-email]').getAttribute('href')).searchParams.get('body').includes('A fresh website for our shop'));
    await page.screenshot({path:`${output}/enquiry-${width}x${height}.png`,fullPage:true});
    await page.goto('http://127.0.0.1:4183/services/websites');await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:`${output}/services-${width}x${height}.png`,fullPage:true});
    await page.goto('http://127.0.0.1:4183/');await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('link[rel=stylesheet][href^="/assets/services-"]').count(),0,'Home must not load the service-only stylesheet');
    assert.equal(await page.locator('.service-bell').getAttribute('href'),'/services/websites');
    if(width<=1000){
      const home=await page.evaluate(()=>{const business=document.querySelector('.home-business').getBoundingClientRect(),dock=document.querySelector('.served-dock').getBoundingClientRect();return {page:document.documentElement.scrollHeight,width:document.documentElement.scrollWidth,business:{x:business.x,right:business.right,y:business.y,bottom:business.bottom},dock:{y:dock.y,bottom:dock.bottom}}});
      assert(home.page<=height&&home.width<=width,`Home must fit ${width}x${height}`);
      assert(home.business.x>=0&&home.business.right<=width&&home.business.y>=0&&home.business.bottom<=height,'Business entry must be visible');
      assert(home.dock.y>=0&&home.dock.bottom<=height,'Taste must stay visible');
      await page.locator('.home-business').click();
    }else await page.locator('.desktop-nav a[href="/services/websites"]').click();
    assert(new URL(page.url()).pathname==='/services/websites','Business entry must navigate to service page');
    results.push({width,height,geometry,formEncoding:true,localDraft:true,clipboard:true,clipboardFallback:true,homeEntry:true});
    await context.close();
  }
  const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');assert(sitemap.includes('https://ocix.in/services/websites'));
  fs.writeFileSync(`${output}/results.json`,JSON.stringify(results,null,2));
  console.log('Service page and home entry pass at 9 viewports; enquiry validation, encoding, local preparation, copy/fallback, metadata and sitemap pass.');
}finally{await browser?.close();server.kill('SIGTERM')}
