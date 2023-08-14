export function highlightCodeOnHover() {
    const tableElements = document.querySelectorAll('.table > *') as NodeListOf<HTMLElement>;
    const codeElement = document.querySelector('.code') as HTMLElement;

    if (!codeElement) {
        return;
    }

    const codeLines: string[] = Array.from(tableElements).map((element) =>
        element.outerHTML
            .replace(/ class="rotate"/g, '')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
    );

    tableElements.forEach((element, index) => {
        element.addEventListener('mouseover', () => {
            const highlightedCode: string[] = codeLines.map((line, i) => {
                if (i === index) {
                    return `<span style="color: green; font-weight: 500;">${line}</span>`;
                } else {
                    return line;
                }
            });
            codeElement.innerHTML = highlightedCode.join('\n') as string;
        });

        element.addEventListener('mouseout', () => {
            codeElement.innerHTML = codeLines.join('\n') as string;
        });
    });

    const table = document.querySelector('.table') as HTMLElement;
    table.addEventListener('mouseleave', () => {
        colorizeText();
    });
}

export function colorizeText() {
    const codeElement = document.querySelector('pre.code') as HTMLElement;
    const codeText = codeElement?.innerHTML as string;
    const lines = codeText?.split('\n') as string[];

    const patterns: {
        regex: RegExp;
        style: string;
    }[] = [
        { regex: /&lt;cacao&gt;.*?&lt;\/cacao&gt;/, style: 'color: blue;' },
        { regex: /&lt;plate&gt;/, style: 'color: green;' },
        { regex: /&lt;\/plate&gt;/, style: 'color: green;' },
        { regex: /&lt;scull.*?&lt;\/scull&gt;/, style: 'color: #FF5722;' },
        { regex: /&lt;pan&gt;.*?&lt;\/pan&gt;/, style: 'color: purple;' },
    ];

    lines?.forEach((line: string, i: number): void => {
        patterns.forEach((pattern) => {
            if (pattern.regex.test(line)) {
                line = line.replace(pattern.regex, `<span style="${pattern.style}">${line}</span>`) as string;
            }
        });

        lines[i] = line as string;
    });

    if (codeElement) {
        const updatedCodeText = lines?.join('\n') ?? '';
        codeElement.innerHTML = updatedCodeText;
    }
}
