import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
const roots = ['client/src','client/public'];
const rx = /(coming soon|placeholder|todo)/i;
let hits = [];
function walk(dir){
  for (const f of readdirSync(dir, { withFileTypes:true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?|html|md|css)$/.test(f.name)) {
      const t = readFileSync(p,'utf8');
      if (rx.test(t)) hits.push(p);
    }
  }
}
roots.forEach(walk);
if (hits.length){ 
  console.error('❌ Placeholder text found in:\n' + hits.join('\n'));
  process.exit(1);
}
console.log('✅ No placeholder text found.');
