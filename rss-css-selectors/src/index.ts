import './global.css';
import { CreateLevel } from './components/levels/mainClass';
import { showItemsOnTheTable, addBlueClassToSpan } from './components/tableElements';
import { htmlStructure } from './components/levels/levels';
import { levels, activeLevelEffects, currentLevel } from './components/aside-bar';
import { handleInput, handleButtonClick, enterBtn, textarea } from './components/game-logiс/check-answer';
import { addAnimationToTarget } from './components/game-logiс/targetAddAnimation';
import { showTrueAnsvers } from './components/game-logiс/help-button';
import { highlightCodeOnHover, colorizeText } from './components/game-logiс/text-colors';

// declare const hljs: {
//     highlightAll: () => void;
// };

// createLevel
addEffects();
activeLevelEffects();
textarea?.addEventListener('keydown', handleInput);
enterBtn?.addEventListener('click', handleButtonClick);
highlightCodeOnHover();

levels.forEach((item) => {
    item.addEventListener('click', () => {
        addEffects();
    });
});

showTrueAnsvers();
addBlueClassToSpan();

function addEffects(): void {
    const newLevel = new CreateLevel<string>(htmlStructure[currentLevel]);
    newLevel.addHTMLtoTable();
    newLevel.insertHTMLStructure();
    showItemsOnTheTable();
    addAnimationToTarget(currentLevel);
    // hljs.highlightAll();
    highlightCodeOnHover();
    colorizeText();
}
