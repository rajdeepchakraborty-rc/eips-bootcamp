const fs = require('fs');
const path = require('path');

function findFiles(dir, filter, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        findFiles(path.join(dir, file), filter, fileList);
      }
    } else if (filter.test(file)) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = findFiles(path.join(__dirname, 'app'), /\.tsx?$/);

let totalChanged = 0;

for (const file of files) {
  const originalContent = fs.readFileSync(file, 'utf8');
  let content = originalContent;

  // Replacements
  // Backgrounds
  content = content.replace(/bg-\[#080808\]/g, 'bg-background');
  content = content.replace(/bg-\[#050505\]/g, 'bg-background');
  content = content.replace(/bg-\[#070707\]/g, 'bg-background');
  content = content.replace(/\bbg-black\b/g, 'bg-background');
  
  content = content.replace(/bg-\[#0f0f0f\]/g, 'bg-card');
  content = content.replace(/bg-\[#111\]/g, 'bg-card');
  content = content.replace(/bg-\[#141414\]/g, 'bg-card');
  content = content.replace(/bg-\[#1a1a1a\]/g, 'bg-card');
  content = content.replace(/bg-\[#0a0a0a\]/g, 'bg-card');
  content = content.replace(/bg-\[#0d0d0d\]/g, 'bg-card');
  
  // Texts
  content = content.replace(/\btext-white\b/g, 'text-foreground');
  content = content.replace(/\btext-zinc-100\b/g, 'text-foreground');
  content = content.replace(/\btext-zinc-200\b/g, 'text-foreground');
  content = content.replace(/\btext-gray-100\b/g, 'text-foreground');
  content = content.replace(/\btext-gray-200\b/g, 'text-foreground');
  content = content.replace(/\btext-zinc-300\b/g, 'text-muted-foreground');
  content = content.replace(/\btext-zinc-400\b/g, 'text-muted-foreground');
  content = content.replace(/\btext-zinc-500\b/g, 'text-muted-foreground');
  content = content.replace(/\btext-zinc-600\b/g, 'text-muted-foreground');
  content = content.replace(/\btext-gray-400\b/g, 'text-muted-foreground');
  content = content.replace(/\btext-gray-500\b/g, 'text-muted-foreground');
  content = content.replace(/\btext-gray-300\b/g, 'text-foreground');
  content = content.replace(/from-white to-gray-400/g, 'from-foreground to-muted-foreground');
  content = content.replace(/from-white via-emerald-100 to-emerald-400/g, 'from-foreground via-emerald-500 to-emerald-400');
  content = content.replace(/from-white via-emerald-200 to-emerald-400/g, 'from-foreground via-emerald-500 to-emerald-400');
  
  // Borders
  content = content.replace(/border-white\/5/g, 'border-border');
  content = content.replace(/border-white\/6/g, 'border-border');
  content = content.replace(/border-white\/7/g, 'border-border');
  content = content.replace(/border-white\/10/g, 'border-border');
  content = content.replace(/border-white\/20/g, 'border-border');
  content = content.replace(/border-white\/8/g, 'border-border');
  content = content.replace(/\bborder-zinc-800\b/g, 'border-border');
  content = content.replace(/border-zinc-800\/50/g, 'border-border');
  content = content.replace(/border-gray-700\/50/g, 'border-border');
  content = content.replace(/border-gray-700/g, 'border-border');
  content = content.replace(/border-gray-800/g, 'border-border');
  
  // Grays (Assignments specific)
  content = content.replace(/bg-gray-800\/30/g, 'bg-accent/50');
  content = content.replace(/bg-gray-800\/50/g, 'bg-accent');
  content = content.replace(/bg-gray-900\/95/g, 'bg-popover');
  content = content.replace(/from-gray-900\/30/g, 'from-accent/30');
  content = content.replace(/to-gray-800\/20/g, 'to-accent/20');
  content = content.replace(/placeholder-gray-500/g, 'placeholder:text-muted-foreground');
  
  // Accents / Muted / Hover
  content = content.replace(/bg-zinc-900\/50/g, 'bg-accent');
  content = content.replace(/\bbg-zinc-900\b/g, 'bg-accent');
  content = content.replace(/bg-white\/5/g, 'bg-accent');
  content = content.replace(/bg-white\/10/g, 'bg-accent');
  
  content = content.replace(/hover:bg-white\/5/g, 'hover:bg-accent');
  content = content.replace(/hover:bg-white\/10/g, 'hover:bg-accent');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    totalChanged++;
    console.log(`Updated: ${file.replace(__dirname, '')}`);
  }
}

console.log(`\nComplete! Updated ${totalChanged} files.`);
