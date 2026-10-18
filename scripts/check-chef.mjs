import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';

const server=spawn(process.execPath,['scripts/preview.mjs'],{env:{...process.env,PORT:'4182'},stdio:['ignore','pipe','pipe']});
const out='design/kitchen/chef-popout-review';
const isOpen=page=>page.locator('#chef-welcome').evaluate(el=>el.matches(':popover-open'));
async function freezeClock(page){
  const time=new Date('2026-10-19T06:00:00Z');
  await page.clock.install({time});
  await page.clock.pauseAt(new Date(+time+100));
}
(async()=>{
  await new Promise((resolve,reject)=>{
    server.stdout.on('data',data=>{if(data.toString().includes('production preview'))resolve()});
    server.on('error',reject);server.on('exit',code=>reject(new Error(`Preview exited: ${code}`)));
  });
  const browser=await chromium.launch({headless:true,executablePath:process.env.OCIX_CHROME_PATH||undefined});
  fs.mkdirSync(out,{recursive:true});
  const results=[];
  try{
    for(const [w,h] of [[1440,900],[390,724],[320,568],[375,667],[844,390]]){
      const context=await browser.newContext({viewport:{width:w,height:h},reducedMotion:'reduce',timezoneId:'Asia/Kolkata'});
      const page=await context.newPage();
      await page.route('https://**/*',route=>route.abort());
      await page.addInitScript(()=>sessionStorage.setItem('ocix-chef-welcomed','1'));
      await freezeClock(page);
      await page.goto('http://127.0.0.1:4182/');
      await page.clock.runFor(1200);
      assert.equal(await isOpen(page),false,'Chef should start shy');
      assert.equal(await page.locator('.chef-rest').evaluate(el=>getComputedStyle(el).opacity),'1');
      assert.equal(await page.locator('.chef-launcher').evaluate(el=>getComputedStyle(el).borderTopColor),'rgb(91, 79, 196)','Resting ring must use site purple');
      await page.screenshot({path:`${out}/shy-${w}x${h}.png`});
      await page.clock.runFor(300);
      assert(await isOpen(page),'Chef should automatically emerge');
      assert.equal(await page.evaluate(()=>document.activeElement===document.body),true,'Automatic greeting must not steal focus');
      const measurements=await page.evaluate(()=>{
        const box=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom}};
        return {dock:box('.served-dock'),avatar:box('.chef-mascot'),cta:box('#chef-welcome .pop'),panel:box('#chef-welcome'),button:box('.chef-launcher'),height:document.documentElement.scrollHeight};
      });
      const {dock,avatar,cta,panel,button,height}=measurements;
      assert(avatar.y<button.y,'Chef must pop above the disc');
      assert(cta.y>=panel.y&&cta.bottom<=panel.bottom,'Greeting CTA must fit');
      if(w<=1000){assert(height<=h,'Home must fit first viewport');assert(avatar.y>=dock.bottom,'Chef must not cover Taste dock')}
      await page.screenshot({path:`${out}/automatic-${w}x${h}.png`});
      await page.clock.runFor(4700);
      assert(await isOpen(page),'Greeting must stay open before five seconds');
      await page.clock.runFor(300);
      assert.equal(await isOpen(page),false,'Greeting must close after five seconds');
      assert.equal(await page.locator('.chef-rest').evaluate(el=>getComputedStyle(el).opacity),'1','Chef must return to the circular portrait');
      assert.equal(await page.locator('.chef-avatar').evaluate(el=>getComputedStyle(el).opacity),'0');
      await page.screenshot({path:`${out}/avatar-${w}x${h}.png`});
      await page.reload();await page.clock.runFor(1700);
      assert(await isOpen(page),'Greeting must replay on reload even with the old session flag');
      await page.clock.runFor(5100);
      assert.equal(await isOpen(page),false,'Reloaded greeting must also retreat after five seconds');
      await page.locator('.chef-launcher').click();
      assert(await isOpen(page),'Resting icon must reopen greeting');
      await page.emulateMedia({reducedMotion:'no-preference'});
      assert.equal(await page.locator('.chef-wave').evaluate(el=>getComputedStyle(el).animationName),'chef-wave');
      await page.emulateMedia({reducedMotion:'reduce'});
      assert.equal(await page.locator('.chef-wave').evaluate(el=>el.getAnimations().length),0);
      await page.locator('#chef-welcome h2').hover();
      await page.clock.runFor(6000);
      assert(await isOpen(page),'Hovering the card must prevent dismissal');
      await page.locator('.guide-close').click();
      assert.equal(await isOpen(page),false);
      await page.mouse.move(0,0);
      await page.locator('.chef-launcher').click();
      await page.locator('#chef-welcome .pop').focus();
      await page.clock.runFor(6000);
      assert(await isOpen(page),'Focused card must stay open');
      await page.keyboard.press('Escape');
      assert.equal(await isOpen(page),false);
      assert.equal(await page.locator('.chef-wave').evaluate(el=>getComputedStyle(el).animationName),'none','Resting chef must stop waving');
      results.push({w,h,...measurements,shy:true,automatic:true,fiveSecondRetreat:true,replaysOnReload:true,reopens:true,hoverAndFocusSafe:true,reducedMotion:true});
      await context.close();
    }
    const motionContext=await browser.newContext({viewport:{width:390,height:724},reducedMotion:'no-preference'});
    const motionPage=await motionContext.newPage();
    await motionPage.addInitScript(()=>sessionStorage.setItem('ocix-chef-welcomed','1'));
    await motionPage.goto('http://127.0.0.1:4182/');
    await motionPage.locator('.chef-launcher').click();
    await motionPage.waitForTimeout(700);
    assert.equal(await motionPage.locator('.chef-avatar').evaluate(el=>getComputedStyle(el).opacity),'1');
    assert.equal(await motionPage.locator('.chef-rest').evaluate(el=>getComputedStyle(el).opacity),'0');
    await motionPage.screenshot({path:`${out}/waving-390x724.png`});
    await motionPage.locator('.guide-close').click();
    await motionPage.waitForTimeout(700);
    assert.equal(await motionPage.locator('.chef-avatar').evaluate(el=>getComputedStyle(el).opacity),'0');
    assert.equal(await motionPage.locator('.chef-rest').evaluate(el=>getComputedStyle(el).opacity),'1');
    await motionContext.close();
    const freshContext=await browser.newContext({reducedMotion:'reduce'}),freshPage=await freshContext.newPage();
    await freezeClock(freshPage);
    const pendingImages=[];
    await freshPage.route('**/*',route=>{
      if(route.request().resourceType()==='image')pendingImages.push(route);
      else if(route.request().url().startsWith('https://'))return route.abort();
      else return route.continue();
    });
    await freshPage.goto('http://127.0.0.1:4182/',{waitUntil:'domcontentloaded'});
    assert.notEqual(await freshPage.evaluate(()=>document.readyState),'complete','Images must still be pending');
    await freshPage.clock.runFor(1500);
    assert(await isOpen(freshPage),'Fresh visits must open even before images finish loading');
    await freshPage.clock.runFor(5100);
    assert.equal(await isOpen(freshPage),false,'Fresh visit must automatically retreat');
    await Promise.all(pendingImages.map(route=>route.abort()));
    await freshContext.close();
    const context=await browser.newContext(),page=await context.newPage();
    await freezeClock(page);await page.goto('http://127.0.0.1:4182/');
    await page.locator('.menu-open').click();await page.clock.runFor(1700);
    assert.equal(await isOpen(page),false,'Greeting must not interrupt menu');
    await context.close();
    fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
    console.log('Fresh visits with pending images, reload replay despite old storage, five-second retreat, interaction safety and reduced motion pass at 5 viewports.');
  }finally{await browser.close();server.kill('SIGTERM')}
})().catch(error=>{server.kill('SIGTERM');console.error(error);process.exit(1)});
