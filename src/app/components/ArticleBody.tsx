import { Fragment } from 'react';

function inline(text: string) {
  return text.split(/(\[[^\]]+\]\([^\s)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (link && /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(link[2])) return <a key={index} href={link[2]}>{link[1]}</a>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function ArticleBody({ body }: { body: string }) {
  const blocks: React.ReactNode[] = [];
  const lines = body.replace(/\r/g, '').split('\n');
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith('```')) {
      const code: string[] = []; i++;
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]);
      i++; blocks.push(<pre key={blocks.length}><code>{code.join('\n')}</code></pre>); continue;
    }
    if (line.startsWith('### ')) { blocks.push(<h3 key={blocks.length}>{inline(line.slice(4))}</h3>); i++; continue; }
    if (line.startsWith('## ')) { blocks.push(<h2 key={blocks.length}>{inline(line.slice(3))}</h2>); i++; continue; }
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) items.push(lines[i++].slice(2));
      blocks.push(<ul key={blocks.length}>{items.map((item, j) => <li key={j}>{inline(item)}</li>)}</ul>); continue;
    }
    const paragraph: string[] = [lines[i++]];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3} |```|[-*] )/.test(lines[i])) paragraph.push(lines[i++]);
    blocks.push(<p key={blocks.length}>{inline(paragraph.join(' '))}</p>);
  }
  return <div className="article-body">{blocks}</div>;
}
