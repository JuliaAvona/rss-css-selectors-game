export function showElementCode(elements: NodeListOf<Node>): void {
    elements.forEach((element: Node) => {
        if (element instanceof HTMLElement) {
            const tooltip = createTooltip(element.outerHTML);
            let existingTooltipText = '';

            element.addEventListener('mouseenter', () => {
                const elementRect = element.getBoundingClientRect() as DOMRect;
                const existingTooltips = document.querySelectorAll('.tooltip') as NodeListOf<HTMLElement>;

                if (existingTooltips.length > 0) {
                    const lastTooltip = existingTooltips[existingTooltips.length - 1] as HTMLElement;
                    existingTooltipText = lastTooltip.innerText as string;

                    if (tooltip.innerText !== existingTooltipText) {
                        positionTooltip(tooltip, elementRect, existingTooltips);
                        document.body.appendChild(tooltip);
                    }
                } else {
                    positionTooltip(tooltip, elementRect);
                    document.body.appendChild(tooltip);
                }
            });

            element.addEventListener('mouseleave', () => {
                if (tooltip && tooltip.parentNode === document.body) {
                    document.body.removeChild(tooltip);
                    existingTooltipText = '';
                }
            });
        }
    });
}

function createTooltip(innerHTML: string): HTMLElement {
    const tooltip = document.createElement('div') as HTMLElement;
    tooltip.classList.add('tooltip');
    tooltip.innerText = innerHTML.replace(/[\r\n]+/g, '') as string;
    return tooltip;
}

function positionTooltip(tooltip: HTMLElement, elementRect: DOMRect, existingTooltips?: NodeListOf<HTMLElement>): void {
    let leftOffset = elementRect.left + window.pageXOffset - tooltip.offsetWidth / 2 + elementRect.width / 2;
    let topOffset = elementRect.top + window.scrollY - tooltip.offsetHeight;

    if (existingTooltips) {
        existingTooltips.forEach((existingTooltip: HTMLElement) => {
            const existingTooltipRect = existingTooltip.getBoundingClientRect() as DOMRect;
            const existingTooltipBottom = existingTooltipRect.top + existingTooltipRect.height;
            const tooltipBottom = topOffset + tooltip.offsetHeight;

            if (topOffset - existingTooltipRect.height < existingTooltipBottom) {
                topOffset = existingTooltipBottom;
            }

            if (
                tooltipBottom > existingTooltipRect.top &&
                leftOffset > existingTooltipRect.left &&
                leftOffset < existingTooltipRect.right
            ) {
                leftOffset = existingTooltipRect.right;
            }
        });
    }

    tooltip.style.left = `${leftOffset}px`;
    tooltip.style.top = `${topOffset}px`;
}

export function showItemsOnTheTable(): void {
    const elementLists: NodeListOf<Element>[] = [
        document.querySelectorAll('scull'),
        document.querySelectorAll('pan'),
        document.querySelectorAll('cacao'),
        document.querySelectorAll('#scull'),
        document.querySelectorAll('plate'),
    ];

    elementLists.forEach((elementList: NodeListOf<Element>) => {
        showElementCode(elementList);
    });
}

export function addBlueClassToSpan(): void {
    const target = document.getElementById('target') as HTMLElement;

    if (target) {
        target.addEventListener('mouseover', (event) => {
            const element = event.target as HTMLElement;

            if (element.tagName === 'SPAN') {
                element.classList.add('blue');
                showTooltip(element.innerHTML);
            }
        });

        target.addEventListener('mouseout', (event) => {
            const element = event.target as HTMLElement;

            if (element.tagName === 'SPAN') {
                element.classList.remove('blue');

                let nextSibling = element.nextElementSibling;
                while (nextSibling instanceof HTMLElement) {
                    nextSibling.classList.remove('blue');
                    nextSibling = nextSibling.nextElementSibling as HTMLElement;
                }
            }
        });
    }
}

function showTooltip(element: string): void {
    const regex = /^[a-z]+$/i as RegExp;
    if (!regex.test(element)) {
        return;
    }

    const elements = Array.from(document.querySelectorAll(`${element}`)) as HTMLElement[];

    elements.forEach((element: HTMLElement) => {
        const mouseEnterEvent: MouseEvent = new MouseEvent('mouseenter', {
            bubbles: true as boolean,
            cancelable: true as boolean,
        });

        const mouseLeaveEvent: MouseEvent = new MouseEvent('mouseleave', {
            bubbles: true as boolean,
            cancelable: true as boolean,
        });

        element.dispatchEvent(mouseEnterEvent);

        setTimeout(() => {
            element.dispatchEvent(mouseLeaveEvent);
        }, 1000);
    });
}
