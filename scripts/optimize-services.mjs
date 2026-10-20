import sharp from 'sharp';
import {mkdir} from 'node:fs/promises';
const source='design/kitchen/service-source/shop-original.png';
const output='public/assets/services';
await mkdir(output,{recursive:true});
for(const [suffix,width] of [['',768],['@2x',1536]]){
  await sharp(source).resize(width).avif({quality:65,effort:6}).toFile(`${output}/shop${suffix}.avif`);
  await sharp(source).resize(width).webp({quality:82,alphaQuality:90,effort:6}).toFile(`${output}/shop${suffix}.webp`);
}

// A real browser capture of vishaldevlift.in, not a generated client example.
for(const width of [640,1280]){
  const image=sharp('design/kitchen/service-source/portfolio-original.png').resize(width);
  await image.clone().avif({quality:65,effort:6}).toFile(`${output}/portfolio-${width}.avif`);
  await image.clone().webp({quality:85,effort:6}).toFile(`${output}/portfolio-${width}.webp`);
}
