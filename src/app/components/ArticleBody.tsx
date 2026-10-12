import { Fragment } from 'react';

function inline(text: string) {
  return text.split(/(\[[^\]]+\]\([^\s)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*\n]+\*)/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (link && /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(link[2])) return <a key={index} href={link[2]}>{link[1]}</a>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
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
    if (/^(?:[-*] |\d+\. )/.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const pattern = ordered ? /^\d+\. / : /^[-*] /;
      const items: string[] = [];
      while (i < lines.length && pattern.test(lines[i])) items.push(lines[i++].replace(pattern, ''));
      const List = ordered ? 'ol' : 'ul';
      blocks.push(<List key={blocks.length}>{items.map((item, j) => <li key={j}>{inline(item)}</li>)}</List>); continue;
    }
    const paragraph: string[] = [lines[i++]];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3} |```|[-*] |\d+\. )/.test(lines[i])) paragraph.push(lines[i++]);
    blocks.push(<p key={blocks.length}>{inline(paragraph.join(' '))}</p>);
  }
  return <div className="article-body">{blocks}</div>;
}
