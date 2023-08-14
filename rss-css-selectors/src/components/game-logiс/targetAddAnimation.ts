import { target } from '../levels/levels';

export function addAnimationToTarget(level: number): void {
    document.querySelector(`${target[level]}`)?.classList.add('rotate');
}
