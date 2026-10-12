// Editorial markers must be resolved before changing an article to published.
// Ignore code examples, including the intentional `TODO(next):` writing tip.
export function assertNoPlaceholders(source, file) {
  const prose = source.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  const marker = source.match(/\[(?:FOUNDER|CHECK|SHOT|ASK)[^\]\n]*\]|<!--[\s\S]*?-->/i)
    || prose.match(/\[(?:TODO|TBD|FIXME|PLACEHOLDER|INSERT\b|REPLACE\b)[^\]\n]*\]|\b(?:TODO|TBD|FIXME|PLACEHOLDER)\s*:|\blorem ipsum\b|\{\{[^}\n]+\}\}/i);
  if (marker) throw new Error(`Unresolved placeholder in ${file}: ${marker[0]}`);
}
