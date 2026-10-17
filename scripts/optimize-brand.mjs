import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
const source='public/assets/ocix-logo-transparent.png',dir='public/assets/ocix_favicon_io';
await sharp(source).resize(188,96).webp({quality:82,alphaQuality:90}).toFile('public/assets/ocix-logo.webp');
const mark=await sharp(source).extract({left:20,top:30,width:410,height:405}).resize(400,400,{fit:'contain',background:'#00000000'}).png().toBuffer();
const canvas=await sharp({create:{width:448,height:448,channels:4,background:'#00000000'}}).composite([{input:mark}]).png().toBuffer();
await sharp(canvas).webp({quality:94}).toFile('public/assets/ocix-mark.webp');
for(const [name,size] of [['favicon-16x16',16],['favicon-32x32',32],['apple-touch-icon',180],['android-chrome-192x192',192],['android-chrome-512x512',512]]){
 let image=sharp(canvas).resize(size,size);
 if(size>=180) image=image.flatten({background:'#ECE8F3'});
 await image.png({palette:size>=180,colours:128,effort:10}).toFile(`${dir}/${name}.png`);
}
// ICO supports PNG payloads; keep the traditional multi-size path working.
const sizes=[16,32,48],images=await Promise.all(sizes.map(size=>sharp(canvas).resize(size,size).png().toBuffer()));
const header=Buffer.alloc(6+16*sizes.length);header.writeUInt16LE(1,2);header.writeUInt16LE(sizes.length,4);let offset=header.length;
for(let i=0;i<sizes.length;i++){const p=6+i*16;header[p]=sizes[i];header[p+1]=sizes[i];header.writeUInt16LE(1,p+4);header.writeUInt16LE(32,p+6);header.writeUInt32LE(images[i].length,p+8);header.writeUInt32LE(offset,p+12);offset+=images[i].length}
await writeFile(`${dir}/favicon.ico`,Buffer.concat([header,...images]));
const manifest=JSON.parse(await readFile(`${dir}/site.webmanifest`,'utf8'));Object.assign(manifest,{theme_color:'#ECE8F3',background_color:'#ECE8F3',description:'A small kitchen for software. Games, tools and software by OCIX.'});await writeFile(`${dir}/site.webmanifest`,JSON.stringify(manifest,null,2)+'\n');
