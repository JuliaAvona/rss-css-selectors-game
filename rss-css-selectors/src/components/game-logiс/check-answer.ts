import { currentLevel, addDoneClassToLevelsList, levels } from '../aside-bar';
import { trueAnsvers } from '../levels/levels';
import { isFalseAnswerAnimation, isTrueAnswerAnimation } from './answer-animations';

export const textarea: HTMLTextAreaElement = document.querySelector('textarea') as HTMLTextAreaElement;
export const enterBtn: HTMLButtonElement = document.querySelector('.enter') as HTMLButtonElement;

let completedLevels: number[];
const completedLevelsData: string | null = localStorage.getItem('completedLevels');
if (completedLevelsData) {
    completedLevels = JSON.parse(completedLevelsData) as number[];
} else {
    completedLevels = [] as number[];
}

let helpedLevels: number[] = [];
const helpedLevelsData: string | null = localStorage.getItem('helpedLevels');
if (helpedLevelsData) {
    helpedLevels = JSON.parse(helpedLevelsData) as number[];
} else {
    helpedLevels = [] as number[];
}

export function handleInput(event: KeyboardEvent | FocusEvent): void {
    if ((event as KeyboardEvent).key === 'Enter' || event.type === 'blur') {
        handleAnswerCheck();
    }
}

export function handleButtonClick(): void {
    handleAnswerCheck();
}

export function handleAnswerCheck(): void {
    const isTrue: boolean = trueAnsvers[currentLevel].some((item: string) => textarea?.value.trim() === item);

    if (!isTrue) {
        isFalseAnswerAnimation();
    } else if (levels[currentLevel].classList.contains('help')) {
        addedLevelsProgress(helpedLevels, 'helpedLevels');
        isTrueAnswerAnimation();
        addDoneClassToLevelsList();
    } else {
        addedLevelsProgress(completedLevels, 'completedLevels');
        isTrueAnswerAnimation();
        addDoneClassToLevelsList();
    }
}

// Delete all lines except the first
textarea.addEventListener('input', (): void => {
    const lines: string[] = textarea.value.split('\n');

    if (lines.length > 1) {
        textarea.value = lines[0];
    }
});

function addedLevelsProgress(arr: number[], key: string): void {
    arr.push(currentLevel);
    arr.sort((a: number, b: number) => a - b);
    arr = Array.from(new Set(arr));

    // Save to localStorage
    localStorage.setItem(key, JSON.stringify(arr));
}
