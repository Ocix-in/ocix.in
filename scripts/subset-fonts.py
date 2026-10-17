"""Subset licensed source TTFs: python scripts/subset-fonts.py <source-directory>.
Requires fonttools and brotli. Source filenames: fraunces.ttf,
fraunces-italic.ttf, geist.ttf, geist-mono.ttf. Font licences ship in OFL.txt.
"""
import sys
from io import BytesIO
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.varLib.instancer import instantiateVariableFont

source = Path(sys.argv[1])
out = Path('public/assets/fonts')
core = list(range(0x20, 0x7f)) + list(range(0x2000, 0x2070)) + [0x20ac, 0x2190, 0x2192, 0x2197, 0x2713, 0x25cf, 0x2116, 0x00d7]
supplement = list(range(0xa0, 0x100)) + [0x131, 0x152, 0x153]
for name, axes in [('fraunces', {'wght': (400, 500), 'WONK': 1}), ('fraunces-italic', {'wght': (400, 500), 'WONK': 1}), ('geist', {'wght': (400, 600)}), ('geist-mono', {'wght': (400, 500)})]:
    font = instantiateVariableFont(TTFont(source / (name + '.ttf')), axes, inplace=True)
    buffer = BytesIO(); font.save(buffer)
    # Keep all required display axes, including the complete opsz and SOFT ranges.
    # English display text loads the core only; accented Latin has its own range.
    variants = [('latin', core), ('latin-supplement', supplement)] if name.startswith('fraunces') else [('latin', core + supplement)]
    for suffix, characters in variants:
        buffer.seek(0); font = TTFont(buffer)
        options = subset.Options(); options.flavor = 'woff2'
        options.name_IDs = ['*']; options.name_legacy = True; options.name_languages = ['*']
        sub = subset.Subsetter(options=options); sub.populate(unicodes=characters); sub.subset(font)
        font.flavor = 'woff2'; font.save(out / (name + '-' + suffix + '.woff2'))
