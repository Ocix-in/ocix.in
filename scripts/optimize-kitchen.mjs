import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
const newer=(output,input)=>existsSync(output)&&statSync(output).mtimeMs>statSync(input).mtimeMs;
const dir='public/assets/kitchen'; await mkdir(dir,{recursive:true});
const manifest={};
for(const file of (await readdir('design/kitchen/renders')).filter(f=>f.endsWith('.png'))){
 const name=file.slice(0,-4), input=`design/kitchen/renders/${file}`, meta=await sharp(input).metadata();
 let pipeline=sharp(input), width=meta.width, height=meta.height;
 if(name.startsWith('scene-')){
  const {data,info}=await sharp(input).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let l=info.width,t=info.height,r=0,b=0;
  for(let y=0;y<info.height;y++) for(let x=0;x<info.width;x++) if(data[(y*info.width+x)*4+3]>3){l=Math.min(l,x);r=Math.max(r,x);t=Math.min(t,y);b=Math.max(b,y)}
  l=Math.max(0,l-8);t=Math.max(0,t-8);r=Math.min(info.width-1,r+8);b=Math.min(info.height-1,b+8);
  width=r-l+1;height=b-t+1;pipeline=pipeline.extract({left:l,top:t,width,height});
  manifest[name]={left:l/meta.width*100,top:t/meta.height*100,width:width/meta.width*100,height:height/meta.height*100};
 }
 const buffer=await pipeline.png().toBuffer();
 const w1=Math.round(width/2);
 for(const scale of [1,2]){
  const w=Math.round(w1*scale),suffix=scale===1?'':'@2x';
  if(newer(`${dir}/${name}${suffix}.avif`,input)&&newer(`${dir}/${name}${suffix}.webp`,input)) continue;
  await sharp(buffer).resize({width:w}).webp({quality:76,alphaQuality:85,effort:6}).toFile(`${dir}/${name}${suffix}.webp`);
  await sharp(buffer).resize({width:w}).avif({quality:55,effort:4}).toFile(`${dir}/${name}${suffix}.avif`);
 }
 manifest[name]={...manifest[name],pixelWidth:w1,pixelHeight:Math.round(height/2)};
}
// Re-project hero layers into the home camera. Reusing the same camera tilt
// means an affine placement is exact, with no additional Blender renders.
const cameras={pot:{target:[-.62,0,1.8],ortho:2.6,parts:['pot-body','pot-lid','steam']},cloche:{target:[3,0,1.35],ortho:2,parts:['cloche-body','cloche-dome']},chef:{target:[-2.15,.75,2],ortho:2.6,parts:['chef-body','chef-head']},dough:{target:[.35,0,1.45],ortho:1.8,parts:['dough-body','dough-rise']},popcorn:{target:[1.55,0,1.6],ortho:2.2,parts:['popcorn-body','popcorn-kernels']}};
for(const [object,camera] of Object.entries(cameras)){
 const m=await sharp(`design/kitchen/renders/${object}.png`).metadata();
 const fw=camera.ortho*Math.min(1,m.width/m.height),fh=camera.ortho*Math.min(1,m.height/m.width);
 const cx=.5+(camera.target[0]+.4)/10.4;
 const cy=.5-((camera.target[1])*Math.cos(74*Math.PI/180)+(camera.target[2]-1.45)*Math.sin(74*Math.PI/180))/(10.4*1200/2880);
 const width=fw/10.4,height=fh/(10.4*1200/2880);
 manifest[`home-${object}`]={left:(cx-width/2)*100,top:(cy-height/2)*100,width:width*100,height:height*100,pixelWidth:Math.round(width*1440),pixelHeight:Math.round(height*600)};
 for(const part of camera.parts){
  const w1=Math.round(width*1440);
  for(const scale of [1,2]){
   const suffix=scale===1?'':'@2x';
   if(newer(`${dir}/home-${part}${suffix}.avif`,`design/kitchen/renders/${part}.png`)&&newer(`${dir}/home-${part}${suffix}.webp`,`design/kitchen/renders/${part}.png`)) continue;
   await sharp(`design/kitchen/renders/${part}.png`).resize({width:w1*scale}).webp({quality:76,alphaQuality:85,effort:6}).toFile(`${dir}/home-${part}${suffix}.webp`);
   await sharp(`design/kitchen/renders/${part}.png`).resize({width:w1*scale}).avif({quality:55,effort:4}).toFile(`${dir}/home-${part}${suffix}.avif`);
  }
  manifest[`home-${part}`]={pixelWidth:w1,pixelHeight:Math.round(w1*m.height/m.width)};
 }
}
// A compact phone source; same camera proportions preserve the attached hotspots.
for(const ext of ['webp','avif']) await sharp('design/kitchen/renders/kitchen-base.png').resize(912,380)[ext]({quality:ext==='avif'?50:72}).toFile(`${dir}/kitchen-mobile.${ext}`);
await writeFile('src/app/kitchen-assets.json',JSON.stringify(manifest,null,2)+'\n');
console.log('Optimized kitchen stills and transparent layers.');
