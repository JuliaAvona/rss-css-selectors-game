export class CreateLevel<T extends string> {
    private htmlStructure: T;

    constructor(htmlStructure: T) {
        this.htmlStructure = htmlStructure;
    }

    insertHTMLStructure() {
        const container = document.createElement('pre') as HTMLElement;
        const formattedHTML = this.htmlStructure.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        container.textContent = formattedHTML;
        container.classList.add('code');

        const targetElement = document.getElementById('target') as HTMLElement;

        if (targetElement) {
            targetElement.innerHTML = '';
            targetElement.appendChild(container);
        } else {
            console.error('Element (Markup) didn"t found!');
        }
    }

    addHTMLtoTable() {
        const container = document.createElement('div') as HTMLElement;
        // Delete previous Table:
        const table = document.querySelector('.table-field') as HTMLElement;
        if (table) {
            const tableDiv = table.querySelector('.table') as HTMLElement;

            if (tableDiv) {
                table.removeChild(tableDiv);
            }
        }
        container.classList.add('table');
        container.innerHTML = this.htmlStructure as string;

        const targetElement = document.querySelector('.table-field') as HTMLElement;

        if (targetElement) {
            targetElement.appendChild(container);
        } else {
            console.error('Element (table) not found!');
        }
    }
}
