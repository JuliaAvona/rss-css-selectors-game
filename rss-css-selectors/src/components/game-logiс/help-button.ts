import { textarea, enterBtn } from './check-answer';
import { trueAnsvers } from '../levels/levels';
import { currentLevel, levels } from '../aside-bar';

const helpBtn: HTMLButtonElement = document.querySelector('.help') as HTMLButtonElement;
type numberOrNull = number | null;

export function showTrueAnsvers(): void {
    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            levels[currentLevel].classList.add('help');
            const answer: string = trueAnsvers[currentLevel][0];
            const delay: numberOrNull = 100;
            textarea.value = '' as string;
            let i = 0 as number;
            helpBtn.disabled = true;
            helpBtn.style.backgroundColor = 'grey';

            const typingInterval: NodeJS.Timeout = setInterval(() => {
                textarea.value += answer[i];
                i++;

                if (i >= answer.length) {
                    clearInterval(typingInterval);
                    if (enterBtn) {
                        enterBtn.disabled = false;
                        enterBtn.style.backgroundColor = '#001c49';
                    }
                    helpBtn.disabled = false;
                    helpBtn.style.backgroundColor = '#4f79b2';
                }
            }, delay);

            if (enterBtn) {
                enterBtn.disabled = true;
                enterBtn.style.backgroundColor = 'grey';
            }
        });
    }
}
