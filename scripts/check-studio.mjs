import { chromium } from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

const preview = spawn(process.execPath, ['scripts/preview.mjs'], {env:{...process.env,PORT:'4178'},stdio:['ignore','pipe','pipe']});
const output = 'design/kitchen/studio-review';
let browser;
try {
  await new Promise((resolve,reject)=>{
    preview.stdout.on('data',data=>{if(data.toString().includes('production preview'))resolve()});
    preview.on('error',reject);
    preview.on('exit',code=>reject(new Error(`Preview exited: ${code}`)));
  });
  browser = await chromium.launch({headless:true,executablePath:process.env.OCIX_CHROME_PATH || undefined});
  fs.mkdirSync(output,{recursive:true});
  const results=[];
  for(const width of [1440,768,390,320]) {
    const context=await browser.newContext({viewport:{width,height:width===1440?900:844},reducedMotion:'reduce'});

    const page=await context.newPage();await page.clock.install({time:new Date('2026-10-19T00:00:00Z')});await page.clock.pauseAt(new Date('2026-10-19T00:00:01Z'));
    await page.route('https://**/*',route=>route.abort());
    for(const route of ['/','/about','/blog','/tools','/contact']) {
      await page.goto(`http://127.0.0.1:4178${route}`);
      await page.evaluate(()=>document.fonts.ready);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${route} ${width}: horizontal overflow`);
      if(width===1440||width===390)await page.screenshot({path:`${output}/${route==='/'?'home':route.slice(1)}-${width}.png`,fullPage:true});
      if(route==='/') {
        const trigger=page.locator('.menu-open'),dialog=page.locator('#ocix-menu');
        await trigger.focus();await page.keyboard.press('Enter');
        assert(await dialog.evaluate(el=>el.open));
        assert.equal(await dialog.locator('.menu-product').count(),4);
        await dialog.locator('img').evaluateAll(images=>Promise.all(images.map(image=>image.decode())));
        for(let i=0;i<10;i++) {
          await page.keyboard.press('Tab');
          assert(await dialog.evaluate(el=>el.contains(document.activeElement)),'Modal focus must stay inside the menu');
        }
        await page.screenshot({path:`${output}/menu-${width}.png`});
        await page.keyboard.press('Escape');
        assert.equal(await dialog.evaluate(el=>el.open),false);
        assert(await trigger.evaluate(el=>el===document.activeElement));
        await trigger.click();await page.keyboard.press('Shift+Tab');
        assert(await dialog.evaluate(el=>el.contains(document.activeElement)));
        await page.locator('[data-menu-close]').click();
        assert.equal(await dialog.evaluate(el=>el.open),false);
        await trigger.click();
        // Exercise catalogue growth without adding unpublished products to the site.
        await page.locator('.menu-products').evaluate(el=>{const product=el.firstElementChild;for(let i=0;i<12;i++)el.append(product.cloneNode(true))});
        assert(await page.locator('.menu-products').evaluate(el=>el.scrollHeight>el.clientHeight));
        const closeBox=await page.locator('[data-menu-close]').boundingBox();
        assert(closeBox.y>=0 && closeBox.y+closeBox.height<=844,'Close control must remain on screen');
        await page.locator('[data-menu-close]').click();
        if(width<=1000){
          await page.locator('.mobile-menu summary').click();
          assert.equal(await page.locator('.mobile-menu a[href="/#ocix-menu"]').count(),0);
          await page.locator('.mobile-menu a[href="/services/websites"]').click();
          assert(new URL(page.url()).pathname==='/services/websites','Mobile business navigation must work');
          await page.goto('http://127.0.0.1:4178/');
        }
      }
      if(route==='/about') {
        assert.equal(await page.locator('.about-studio section').count(),2);
        assert(!(await page.locator('main').innerText()).includes('Vishal'));
      }
      if(route==='/about'||route==='/contact') {
        const links=await page.locator('.contact-buttons a').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
        assert.deepEqual(links,['mailto:support@ocix.in','https://x.com/Ocixdotin','https://www.instagram.com/ocix.in','https://www.reddit.com/user/ocix_dot_in/']);
      }
      if(route==='/blog') {
        assert.equal(await page.locator('.sticky-note').count(),8);
        await page.locator('.sticky-note').first().click();
        await page.waitForFunction(()=>document.querySelector('.reader-article .article-body'));
        assert(page.url().endsWith('/blog'));
        await page.keyboard.press('Escape');
      }
      if(route==='/tools') {
        assert((await page.locator('.tools-actions a').first().getAttribute('href')).includes('view=roast'));
        assert.equal(await page.locator('.tools-actions .pop-amber').count(),1);
      }
      if(route!=='/'){
        assert(await page.locator('.kitchen-back').isVisible(),'Back control must be visible on every screen');
        if(route!=='/contact'){
          if(width<=1000)await page.locator('.mobile-menu>summary').click();
          const active=page.locator(`${width>1000?'.desktop-nav':'.mobile-menu'} [data-current-page]`);
          assert.equal(await active.getAttribute('href'),'/');await active.click();assert.equal(new URL(page.url()).pathname,'/','Active nav returns home');
          if(width<=1000)await page.locator('.mobile-menu>summary').click();
          await page.locator(`${width>1000?'.desktop-nav':'.mobile-menu'} a[href="${route}"]`).click();
          assert.equal(new URL(page.url()).pathname,route,'Inactive nav still opens its page');
        }
        await page.locator('.kitchen-back').click();assert.equal(new URL(page.url()).pathname,'/','Back button returns home');
      }
      results.push({route,width,passed:true});
    }
    await page.goto('http://127.0.0.1:4178/#ocix-menu');
    await page.clock.runFor(32);
    await page.waitForFunction(()=>document.querySelector('#ocix-menu').open);
    await context.close();
  }
  fs.writeFileSync(`${output}/interaction-results.json`,JSON.stringify(results,null,2));
  console.log(`Passed ${results.length} studio page/viewport checks, including modal keyboard focus, 16-product scrolling, contact URLs, recipe links and CTA order.`);
} finally {
  await browser?.close();
  preview.kill('SIGTERM');
}
