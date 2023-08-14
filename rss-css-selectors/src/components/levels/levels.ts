export const htmlStructure: string[] = [
    `<pan></pan>
<cacao></cacao>
<scull></scull>
`,
    `<pan class="bread"></pan>
<scull></scull>
<cacao></cacao>
`,
    `<scull></scull>
<pan></pan>
<cacao></cacao>
<scull id="scull"></scull>
`,
    `<cacao></cacao>
<plate>
 <pan></pan>
</plate>
<scull></scull>
`,
    `<plate>
 <scull></scull>
 <scull></scull>
</plate>
`,
    `<plate>
 <cacao></cacao>
 <cacao></cacao>
</plate>
`,
    `<plate>
 <cacao></cacao>
</plate>
<plate id="taza">
 <cacao></cacao>
</plate>
`,
    `<pan></pan>
<plate>
 <cacao></cacao>
</plate>
<plate>
 <pan></pan>
</plate>
`,
    `<cacao></cacao>
<plate>
 <scull></scull>
</plate>
<plate>
 <cacao></cacao>
</plate>
`,
    `<scull></scull>
<plate>
 <scull></scull>
</plate>
<plate>
 <scull></scull>
</plate>
`,
    `<plate>
 <pan></pan>
</plate>
<plate id="one">
 <pan></pan>
  <pan id="two"></pan>
 <pan></pan>
</plate>
`,
    `<cacao></cacao>
<cacao></cacao>
<cacao></cacao>
<cacao></cacao>
`,
    `<scull></scull>
<scull></scull>
<scull></scull>
<scull></scull>
`,
    `<plate>
 <pan></pan>
</plate>
<plate>
 <scull></scull>
</plate>
<plate>
 <cacao></cacao>
 <cacao></cacao>
</plate>
`,
    `<plate>
    <cacao data-attribute="drink"></cacao>
 <scull></scull>
 <pan></pan>
</plate>`,
];

export const trueAnsvers: string[][] = [
    ['cacao'],
    ['.bread'],
    ['#scull'],
    ['plate pan', 'plate pan:first-child', 'plate pan:nth-child(1)'],
    ['plate scull'],
    ['plate cacao:nth-child(2)', 'plate cacao:last-child'],
    ['#taza cacao'],
    ['plate pan'],
    ['plate:nth-child(3) cacao'],
    ['plate:nth-child(2) scull'],
    ['#one #two', 'plate:nth-child(2) #two', 'plate:nth-child(2) pan:nth-child(2)'],
    ['cacao:first-child', 'cacao:nth-child(1)'],
    ['scull:last-child'],
    [
        'plate:last-child cacao:last-child',
        'plate:last-child cacao:nth-child(2)',
        'plate:nth-child(3) cacao:nth-child(2)',
        'plate:nth-child(3) cacao:last-child',
    ],
    [
        'cacao[data-attribute="drink"]',
        'plate cacao[data-attribute="drink"], plate cacao:first-child',
        'plate cacao:nth-child(1)',
    ],
];

export const target: string[] = [
    'cacao',
    '.bread',
    '#scull',
    'plate pan:first-child',
    'plate scull',
    'plate cacao:last-child',
    '#taza cacao',
    'plate pan',
    'plate:nth-child(3) cacao',
    'plate:nth-child(2) scull',
    '#one #two',
    'cacao:first-child',
    'scull:nth-child(4)',
    'plate:nth-child(3) cacao:last-child',
    'cacao[data-attribute="drink"]',
];
