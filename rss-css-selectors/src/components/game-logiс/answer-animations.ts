import { textarea } from './check-answer';

type numberOrNull = number | null;
type stringOrNull = string | null;
type TableElement = HTMLElement;

//False - Animation
export function isFalseAnswerAnimation(): void {
    const duration: numberOrNull = 2000;
    const animationClass: stringOrNull = 'shake';

    if (textarea instanceof HTMLElement) {
        textarea.classList.add(animationClass);

        setTimeout(() => {
            textarea.classList.remove(animationClass);
        }, duration);
    }
}

//True - Animation
class Animation {
    duration: number;
    interval: number;
    bounceDistance: string;

    constructor(duration: number, interval: number, bounceDistance: string) {
        this.duration = duration as number;
        this.interval = interval as number;
        this.bounceDistance = bounceDistance as string;
    }

    applyBouncingAnimation(elements: NodeListOf<TableElement>): void {
        elements.forEach((element: TableElement, index: number) => {
            element.style.animation = `bounce ${this.duration}ms ease-in-out ${index * this.interval}ms`;
            element.style.transform = `translateY(-${this.bounceDistance})`;
        });

        setTimeout(() => {
            elements.forEach((element: TableElement) => {
                element.style.animation = '';
                element.style.transform = '';
            });
        }, this.duration);
    }
}

export function isTrueAnswerAnimation(): void {
    const duration: numberOrNull = 2000;
    const interval: numberOrNull = 500;
    const bounceDistance: stringOrNull = '100px';
    const tableElements: NodeListOf<TableElement> = document.querySelectorAll('.table > *') as NodeListOf<TableElement>;

    const animation = new Animation(duration, interval, bounceDistance);
    animation.applyBouncingAnimation(tableElements);
}
