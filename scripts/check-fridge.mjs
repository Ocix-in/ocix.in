import { chromium } from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
const preview=spawn(process.execPath,['scripts/preview.mjs'],{env:{...process.env,PORT:'4180'},stdio:['ignore','pipe','pipe']});
let browser;
const output='design/kitchen/fridge-review';
try {
 await new Promise((resolve,reject)=>{preview.stdout.on('data',data=>{if(data.toString().includes('production preview'))resolve()});preview.on('error',reject);preview.on('exit',code=>reject(new Error(`Preview exited: ${code}`)))});
 browser=await chromium.launch({headless:true,executablePath:process.env.OCIX_CHROME_PATH||undefined});fs.mkdirSync(output,{recursive:true});const results=[];
 for(const width of [1440,768,390,320]) {
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),page=await context.newPage();
  await page.route('https://**/*',route=>route.abort());
  await page.goto('http://127.0.0.1:4180/');
  const mini=page.locator('.object-fridge');
  assert.equal(await mini.locator('.sticky-note').count(),8);
  assert.equal(await mini.locator('a').count(),0,'Home notes must be decorative, not article links');
  assert.equal(await mini.locator('.fridge-notes').getAttribute('aria-hidden'),'true');
  const homeImage=await mini.locator('img').getAttribute('src');
  await page.locator('.menu-open').focus();
  assert.equal(await page.locator('.menu-open').evaluate(el=>getComputedStyle(el).outlineStyle),'none');
  await page.locator('.menu-open').click();
  assert.equal(await page.locator('.menu-close').evaluate(el=>getComputedStyle(el).outlineStyle),'none');
  await page.keyboard.press('Escape');
  await mini.scrollIntoViewIfNeeded();
  await page.screenshot({path:`${output}/home-fridge-${width}.png`});
  await mini.locator('.sticky-note').first().click();
  await page.waitForURL('**/blog');
  assert.equal(await page.locator('.fridge-art img').getAttribute('src'),homeImage,'The close-up must use the same fridge image');
  assert.equal(await page.locator('.fridge-closeup').evaluate(el=>getComputedStyle(el).viewTransitionName),'fridge');
  assert.equal(await page.locator('.sticky-note').count(),8);
  const coverage=await page.locator('.fridge-notes').evaluate(el=>{
   const area=el.clientWidth*el.clientHeight;
   return [...el.querySelectorAll('.sticky-note')].reduce((sum,note)=>sum+note.clientWidth*note.clientHeight,0)/area;
  });
  assert(coverage<.35,'Eight notes should leave ample space for more recipes');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const clipping=await page.locator('.sticky-note h2').evaluateAll(headings=>headings.filter(el=>el.scrollHeight>el.parentElement.clientHeight-parseFloat(getComputedStyle(el.parentElement).paddingTop)*2+1).map(el=>el.textContent));
  assert.deepEqual(clipping,[],`Clipped note titles at ${width}`);
  await page.screenshot({path:`${output}/fridge-${width}.png`,fullPage:true});
  const links=await page.locator('a[data-article-open]').evaluateAll(els=>els.map(el=>({href:el.getAttribute('href'),title:el.getAttribute('aria-label')})));
  for(let i=0;i<links.length;i++) {
   const note=page.locator('a[data-article-open]').nth(i);await note.click();
   const reader=page.locator('#recipe-reader');await page.waitForFunction(()=>document.querySelector('.reader-article .article-body'));
   assert(await reader.evaluate(el=>el.open));assert.equal(await page.locator('#reader-title').textContent(),links[i].title);
   assert((await page.locator('.article-body').innerText()).length>500);
   assert(page.url().endsWith('/blog'),'Opening an article should keep the fridge behind it');
   assert.equal(await page.locator('.reader-content').evaluate(el=>el.scrollWidth>el.clientWidth),false);
   if(i===0)await page.screenshot({path:`${output}/reader-${width}.png`});
   await page.keyboard.press('Shift+Tab');assert(await reader.evaluate(el=>el.contains(document.activeElement)));
   await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('#recipe-reader').open);
   await page.waitForFunction(index=>document.querySelectorAll('a[data-article-open]')[index]===document.activeElement,i);
  }
  await page.route(`**${links[0].href}`,route=>route.fulfill({status:503,body:'Unavailable'}));
  await page.locator('a[data-article-open]').first().click();await page.waitForFunction(()=>document.querySelector('.reader-content').textContent.includes('could not load'));
  assert.equal(await page.locator('.reader-content a').getAttribute('href'),links[0].href===null?null:`http://127.0.0.1:4180${links[0].href}`);
  await page.locator('.reader-close').click();
  results.push({width,decorativeHomeNotes:8,articlePreviews:8,sameFridge:true,titlesFit:true,focusAndEscape:true,fallback:true});await context.close();
 }
 fs.writeFileSync(`${output}/results.json`,JSON.stringify(results,null,2));console.log('Passed fridge checks at 4 widths: same artwork, decorative home notes, 32 article previews, keyboard focus, fitting titles and load-error fallbacks.');
} finally {await browser?.close();preview.kill('SIGTERM')}
