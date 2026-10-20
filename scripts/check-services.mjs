import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
const server=spawn(process.execPath,['scripts/preview.mjs'],{env:{...process.env,PORT:'4183'},stdio:['ignore','pipe','pipe']});
const output='design/kitchen/services-review';
const visibleBox=async locator=>locator.evaluate(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width}});
let browser;
try{
 await new Promise((resolve,reject)=>{server.stdout.on('data',data=>{if(data.toString().includes('production preview'))resolve()});server.on('error',reject);server.on('exit',code=>reject(new Error(`Preview exited: ${code}`)))});
 browser=await chromium.launch({headless:true,executablePath:process.env.OCIX_CHROME_PATH||undefined});
 fs.mkdirSync(output,{recursive:true});const results=[];
 for(const [width,height] of [[320,568],[375,667],[390,844],[600,900],[768,1024],[1001,768],[1280,900],[1440,900],[844,390]]){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'}),page=await context.newPage();
  await page.clock.install({time:new Date('2026-10-20T06:00:00Z')});await page.clock.pauseAt(new Date('2026-10-20T06:00:01Z'));
  await page.route('https://**/*',route=>route.abort());
  await page.goto('http://127.0.0.1:4183/services/websites');
  await page.evaluate(()=>Promise.all([document.fonts.ready,...[...document.querySelectorAll('.service-overview img')].map(image=>image.decode())]));
  assert.equal(await page.title(),'Websites for local businesses | Made to order by OCIX');
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://ocix.in/services/websites');
  assert.equal(await page.locator('link[rel=stylesheet][href^="/assets/services-"]').count(),1);
  await page.screenshot({path:`${output}/services-${width}x${height}.png`});
  const geometry=await page.evaluate(()=>({width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}));
  assert(geometry.width<=width&&geometry.height<=height,`Overview must fit ${width}x${height}: ${JSON.stringify(geometry)}`);
  const stage=await visibleBox(page.locator('.service-stage'));
  for(const selector of ['.service-recipe','.service-serving-tray','.service-order-bell']){
   const box=await visibleBox(page.locator(selector));
   assert(box.x>=-1&&box.right<=width+1&&box.y>=stage.y-1&&box.bottom<=stage.bottom+1,`${selector} must be visible at ${width}x${height}: ${JSON.stringify({box,stage})}`);
  }
  assert.equal(await page.locator('.site-header a[href="/#ocix-menu"]').count(),0);
  if(width>1000){const nav=await page.locator('.desktop-nav').boundingBox();assert(Math.abs(nav.x+nav.width/2-width/2)<1)}
  assert.equal(await page.locator('[data-website-enquiry]').isVisible(),false,'Form must be optional');
  assert.doesNotMatch(await page.locator('#why-ocix').textContent(),/₹|\d+\s*%|market average/i,'No price figures or savings claims');

  await page.locator('.service-recipe').click();assert(await page.locator('#why-ocix').evaluate(el=>el.open));
  assert.equal(await page.locator('.service-ingredient').count(),3);
  assert.equal(await page.locator('.service-dialog[open]').count(),1);
  if([320,390,1440].includes(width))await page.screenshot({path:`${output}/why-${width}x${height}.png`});
  await page.locator('#why-ocix .service-panel-next').click();
  assert(await page.locator('#enquiry').evaluate(el=>el.open));assert.equal(await page.locator('.service-dialog[open]').count(),1,'Panels must replace one another');
  await page.keyboard.press('Escape');assert(await page.locator('.service-recipe').evaluate(el=>el===document.activeElement),'Focus must return to main recipe');

  await page.locator('.service-serving-tray').click();assert(await page.locator('#our-work').evaluate(el=>el.open));
  await page.locator('.service-work-preview img').evaluate(image=>image.decode());
  assert.equal(await page.locator('.service-work-actions a[target=_blank]').getAttribute('href'),'https://www.vishaldevlift.in/');
  assert.equal(await page.locator('#our-work iframe').count(),0,'Preview must stay local');
  if([320,390,1440].includes(width))await page.screenshot({path:`${output}/work-${width}x${height}.png`});
  await page.keyboard.press('Escape');assert(await page.locator('.service-serving-tray').evaluate(el=>el===document.activeElement));

  await page.locator('.service-actions [data-service-open=enquiry]').click();
  const panel=page.locator('#enquiry');assert(await panel.evaluate(el=>el.open));
  assert.equal(await panel.locator('.enquiry-option').getAttribute('open'),null);
  const links=await panel.locator('.contact-buttons a').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
  assert.deepEqual(links,['mailto:support@ocix.in','https://x.com/Ocixdotin','https://www.instagram.com/ocix.in','https://www.reddit.com/user/ocix_dot_in/']);
  const direct=await visibleBox(panel.locator('.service-direct-contact')),brief=await visibleBox(panel.locator('.service-brief'));
  if(width>600)assert(direct.x<brief.x,'Social contacts belong on the left');else assert(direct.y<brief.y,'Social contacts belong before the form on phones');
  if([320,390,1440].includes(width))await page.screenshot({path:`${output}/contact-${width}x${height}.png`});
  await panel.locator('.service-close').focus();await page.keyboard.press('Shift+Tab');
  assert(await panel.locator('summary').evaluate(el=>el===document.activeElement),'Keyboard users must reach the optional brief');
  await page.keyboard.press('Tab');assert(await panel.locator('.service-close').evaluate(el=>el===document.activeElement));
  await panel.locator('summary').click();assert(await panel.locator('form').isVisible());
  assert.equal(await panel.locator('form').evaluate(form=>form.checkValidity()),false);
  await panel.locator('[name=project][value=refresh]').check();
  await panel.locator('[name=business]').fill('Mira & Sons — test business');await panel.locator('[name=email]').fill('mira+website@example.com');
  await panel.locator('[name=website]').fill('https://example.com/?a=1&b=2');await panel.locator('[name=details]').fill('A website for our shop.\nPhotos, hours & an easy way to call.');
  const submissions=[];page.on('request',request=>{if(request.method()==='POST')submissions.push(request.url())});
  await panel.locator('button[type=submit]').click();assert(await panel.locator('.enquiry-draft').isVisible());
  const mail=new URL(await panel.locator('[data-enquiry-email]').getAttribute('href'));
  assert.equal(mail.protocol,'mailto:');assert.equal(mail.pathname,'support@ocix.in');assert.equal(mail.searchParams.get('subject'),'Website enquiry: Mira & Sons — test business');
  assert(mail.searchParams.get('body').includes('Project: Refresh my website'));assert(mail.searchParams.get('body').includes('https://example.com/?a=1&b=2'));assert(mail.searchParams.get('body').includes('\nPhotos, hours & an easy way to call.'));
  assert.equal(submissions.length,0);
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.__copiedEnquiry=text}}}));
  await panel.locator('[data-enquiry-copy]').click();assert.equal(await page.evaluate(()=>window.__copiedEnquiry),await panel.locator('[data-enquiry-text]').inputValue());
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('Unavailable')}}}));
  await panel.locator('[data-enquiry-copy]').click();assert((await panel.locator('.enquiry-status').textContent()).includes('Select and copy'));
  await panel.locator('[name=details]').fill('A fresh website for our shop, with photos and opening hours.');assert.equal(await panel.locator('.enquiry-draft').isVisible(),false);
  await panel.locator('button[type=submit]').click();assert(new URL(await panel.locator('[data-enquiry-email]').getAttribute('href')).searchParams.get('body').includes('A fresh website'));
  const close=await visibleBox(panel.locator('.service-close'));assert(close.y>=0&&close.bottom<=height,'Close must stay available while form scrolls');
  await page.screenshot({path:`${output}/enquiry-${width}x${height}.png`});
  await page.keyboard.press('Escape');assert(await page.locator('.service-actions [data-service-open=enquiry]').evaluate(el=>el===document.activeElement));
  await page.goto('http://127.0.0.1:4183/services/websites#how-it-works');await page.clock.runFor(32);assert(await page.locator('#why-ocix').evaluate(el=>el.open),'Old process links must still work');
  await context.close();results.push({width,height,geometry,compactOverview:true,why:true,realWorkPreview:true,socialFirst:true,optionalForm:true,focusAndClose:true,emailAndCopy:true,noPriceFigures:true,legacyLinks:true});
 }
 assert(fs.readFileSync('dist/sitemap.xml','utf8').includes('https://ocix.in/services/websites'));
 fs.writeFileSync(`${output}/results.json`,JSON.stringify(results,null,2));
 console.log('Compact kitchen passes at 9 viewports: panels, real portfolio preview, social-first contact, optional email brief, focus, no price figures and legacy links.');
}finally{await browser?.close();server.kill('SIGTERM')}
