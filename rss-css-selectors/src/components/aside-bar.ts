import { textarea } from './game-logiс/check-answer';
import { CreateLevel } from './levels/mainClass';
import { htmlStructure } from './levels/levels';
import { showItemsOnTheTable } from './tableElements';
import { addAnimationToTarget } from './game-logiс/targetAddAnimation';
import { highlightCodeOnHover, colorizeText } from '../components/game-logiс/text-colors';

const completedLevels: number[] = JSON.parse(localStorage.getItem('completedLevels') || '[]');
const helpedLevels: number[] = JSON.parse(localStorage.getItem('helpedLevels') || '[]');

// declare const hljs: {
//     highlightAll: () => void;
// };

export const levels = document.querySelectorAll('.aside h2') as NodeListOf<HTMLHeadingElement>;
export let currentLevel: number = Number(localStorage.getItem('currentLevel')) || 0;

const resetBtn = document.querySelector('.reset') as HTMLButtonElement;
resetBtn.addEventListener('click', resetProgress);

window.addEventListener('beforeunload', saveCurrentLevelToLocalStorage);
window.addEventListener('DOMContentLoaded', () => {
    checkLocalStorageForCurrentLevel();
    createLevelAfterReload();
    colorizeText();
});

export function activeLevelEffects(): number | void {
    levels.forEach((item) => {
        item.addEventListener('click', () => {
            levels.forEach((elem) => elem.classList.remove('active'));
            textarea.value = '';
            item.classList.add('active');
            const array = Array.from(levels) as HTMLHeadingElement[];
            const activeH2 = document.querySelector('h2.active') as HTMLHeadingElement;
            if (activeH2) {
                currentLevel = array.indexOf(activeH2);
                return currentLevel;
            }
        });
    });
}

export function addDoneClassToLevelsList(): void {
    setTimeout(() => {
        levels[currentLevel].classList.remove('active');
        if (!levels[currentLevel].classList.contains('help')) {
            levels[currentLevel].classList.add('done');
        }
        checkLevels();

        // We go through the levels to start the next one
        class BreakException extends Error {} // Exception declaration
        try {
            levels.forEach((elem, index) => {
                if (!elem.classList.contains('done') && !elem.classList.contains('help')) {
                    currentLevel = index as number;
                    levels[currentLevel].classList.add('active');
                    throw new BreakException() as BreakException; // Throwing an exception to stop the loop
                }
            });
        } catch (e) {
            if (e instanceof BreakException) {
                // Handling a Loop Stop Exception
            } else {
                throw e; // If the exception is not a BreakException, we rethrow it.
            }
        }

        const newLevel: CreateLevel<string> = new CreateLevel<string>(htmlStructure[currentLevel]);
        newLevel.addHTMLtoTable();
        newLevel.insertHTMLStructure();
        showItemsOnTheTable();
        addAnimationToTarget(currentLevel);
        // hljs.highlightAll();
        colorizeText();
        textarea.value = '';
    }, 2000);
}

export function checkLevels(): void {
    let allLevelsDone = true as boolean;

    levels.forEach(() => {
        if (![...levels].every((level) => level.classList.contains('done') || level.classList.contains('help'))) {
            allLevelsDone = false as boolean;
        }
    });

    if (allLevelsDone) {
        alert('Congratulations, you are the CSS Master! Press the "Reset progress" to start again!');
    }
}

function resetProgress(): void {
    currentLevel = 0 as number;
    levels.forEach((elem) => elem.classList.remove('done'));
    levels.forEach((elem) => elem.classList.remove('help'));
    levels.forEach((elem) => elem.classList.remove('active'));
    levels[currentLevel].classList.add('active');
    const newLevel: CreateLevel<string> = new CreateLevel<string>(htmlStructure[currentLevel]);
    newLevel.addHTMLtoTable();
    newLevel.insertHTMLStructure();
    showItemsOnTheTable();
    addAnimationToTarget(currentLevel);
    localStorage.removeItem('completedLevels');
    localStorage.removeItem('helpedLevels');
    // hljs.highlightAll();
    colorizeText();
    textarea.value = '';
}

function saveCurrentLevelToLocalStorage(): void {
    localStorage.setItem('currentLevel', currentLevel.toString());
}

export function checkLocalStorageForCurrentLevel(): void {
    const storedCurrentLevel = localStorage.getItem('currentLevel');
    if (storedCurrentLevel) {
        currentLevel = parseInt(storedCurrentLevel);
    }
}

function createLevelAfterReload(): void {
    const newLevel: CreateLevel<string> = new CreateLevel<string>(htmlStructure[currentLevel]);
    newLevel.addHTMLtoTable();
    newLevel.insertHTMLStructure();
    showItemsOnTheTable();
    addAnimationToTarget(currentLevel);
    highlightCodeOnHover();
    // hljs.highlightAll();
    colorizeText();
    levels[0].classList.remove('active');
    levels[currentLevel].classList.add('active');
    completedLevels.forEach((item) => {
        levels[item].classList.add('done');
    });
    helpedLevels.forEach((item) => {
        levels[item].classList.add('help');
    });
}
