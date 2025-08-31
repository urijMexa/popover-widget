/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('PopoverWidget', () => {
    let popoverWidget;
    let button;

    beforeEach(() => {
        document.body.innerHTML = `
      <button class="btn" data-toggle="popover" data-title="Test Title" data-content="Test Content">
        Click to toggle popover
      </button>
    `;

        button = document.querySelector('.btn');

        // Импортируем класс PopoverWidget
        const PopoverWidget = require('../src/index.js').default;
        popoverWidget = new PopoverWidget();
        popoverWidget.init();
    });

    test('popover appears on click', () => {
        button.click();
        const popover = document.querySelector('.popover');
        expect(popover).not.toBeNull();
        expect(popover.querySelector('.popover-header').textContent).toBe('Test Title');
        expect(popover.querySelector('.popover-body').textContent).toBe('Test Content');
    });

    test('popover disappears on second click', () => {
        button.click(); // show
        button.click(); // hide

        const popover = document.querySelector('.popover');
        expect(popover).toBeNull();
    });

    test('popover is positioned correctly', () => {
        button.click();
        const popover = document.querySelector('.popover');

        expect(popover.style.display).toBe('block');
        expect(popover.style.top).toBeDefined();
        expect(popover.style.left).toBeDefined();
    });
});
