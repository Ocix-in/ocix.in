import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
const server=spawn(process.execPath,['scripts/preview.mjs'],{env:{...process.env,PORT:'4181'},stdio:['ignore','pipe','pipe']});
let browser;const output='design/kitchen/welcome-review';
try{
 await new Promise((resolve,reject)=>{server.stdout.on('data',data=>{if(data.toString().includes('production preview'))resolve()});server.on('error',reject);server.on('exit',code=>reject(new Error(`Preview exited: ${code}`)))});
 browser=await chromium.launch({headless:true,executablePath:process.env.OCIX_CHROME_PATH||undefined});fs.mkdirSync(output,{recursive:true});const results=[];
 for(const [width,height]of [[390,724],[390,844],[375,667],[320,568],[414,736],[360,640],[430,932],[768,1024],[844,390],[1440,900],[1024,768]]){
  const ctx=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'}),page=await ctx.newPage();await page.route('https://**/*',route=>route.abort());await page.goto('http://127.0.0.1:4181/');await page.evaluate(()=>document.fonts.ready);
  const metrics=await page.evaluate(()=>{const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom}};const overlap=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));const dock=rect('.served-dock'),launcher=rect('.chef-launcher'),fridge=rect('.object-fridge'),head=rect('.object-chef .layer-chef-head img');return {pageHeight:document.documentElement.scrollHeight,pageWidth:document.documentElement.scrollWidth,dock,launcher,fridge,head,dockGuideOverlap:overlap(dock,launcher),guideFooterOverlap:overlap(launcher,rect('.site-footer nav')),scrollLeft:document.querySelector('.scene-scroll').scrollLeft}});
  assert(metrics.pageWidth<=width,`Horizontal page overflow ${width}×${height}`);
  if(width<=1000){assert(metrics.pageHeight<=height,`Home must fit without scrolling ${width}×${height}`);assert(metrics.dock.top>=0&&metrics.dock.bottom<=height,'Vigilante CTA must be visible');assert(metrics.fridge.left>=-1&&metrics.fridge.right<=width+1,'Fridge must be in the opening view');const headWidth=metrics.head.right-metrics.head.left;assert(metrics.head.left+headWidth*.27>=-1&&metrics.head.left+headWidth*.74<=width+1,'Chef head must be in the opening view');}
  assert.equal(metrics.dockGuideOverlap,0,'Guide button must not cover the served CTA');assert.equal(metrics.guideFooterOverlap,0,'Guide must not cover footer links');
  await page.screenshot({path:`${output}/home-${width}x${height}.png`});
  await page.locator('.chef-launcher').click();assert(await page.locator('#chef-welcome').evaluate(el=>el.matches(':popover-open')));assert.equal(await page.locator('#chef-welcome .pop').getAttribute('href'),'/products/vigilante');await page.screenshot({path:`${output}/greeting-${width}x${height}.png`});await page.keyboard.press('Escape');assert.equal(await page.locator('#chef-welcome').evaluate(el=>el.matches(':popover-open')),false);
  if(width===1440){await page.locator('.menu-open').click();await page.locator('.menu-products img').evaluateAll(images=>Promise.all(images.map(img=>img.decode())));const shadow=await page.locator('.menu-paper').evaluate(el=>getComputedStyle(el).boxShadow);assert(!shadow.includes('255, 255, 255'),'No white outer glow');await page.screenshot({path:`${output}/menu-desktop.png`});await page.keyboard.press('Escape');await page.emulateMedia({reducedMotion:'no-preference'});assert.equal(await page.locator('.object-chef .layer-chef-head').evaluate(el=>getComputedStyle(el).animationName),'chef-look');await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.object-chef .layer-chef-head').evaluate(el=>el.getAnimations().length),0);}
  results.push({width,height,...metrics});await ctx.close();
 }
 for(const [timezoneId,expected]of [['Asia/Kolkata','Good morning!'],['Pacific/Auckland','Good afternoon!'],['America/Los_Angeles','Good evening!'],['Europe/London','Hello, night owl!']]){
  const ctx=await browser.newContext({timezoneId}),page=await ctx.newPage();await page.clock.install({time:new Date('2026-10-19T00:00:00Z')});await page.route('https://**/*',route=>route.abort());await page.goto('http://127.0.0.1:4181/');await page.locator('.chef-launcher').click();assert.equal(await page.locator('[data-chef-greeting]').textContent(),expected);results.push({timezoneId,greeting:expected});await ctx.close();
 }
 fs.writeFileSync(`${output}/results.json`,JSON.stringify(results,null,2));console.log('Passed 11 first-viewport checks, 4 local-time greetings, unobstructed CTA/footer, chef motion and reduced motion, and white-glow removal.');
}finally{await browser?.close();server.kill('SIGTERM')}
