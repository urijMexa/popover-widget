import './style.css';

export class PopoverWidget {
    constructor() {
        this.popovers = [];
    }

    init() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.dataset.toggle === 'popover') {
                if (this.popovers.includes(target)) {
                    this.hidePopover(target);
                } else {
                    this.showPopover(target);
                }
            }
        });
    }

    showPopover(element) {
        // Сначала скрываем все открытые popover
        this.hideAllPopovers();

        const title = element.dataset.title;
        const content = element.dataset.content;

        const popover = document.createElement('div');
        popover.classList.add('popover');
        popover.innerHTML = `
      <div class="popover-header">${title}</div>
      <div class="popover-body">${content}</div>
      <div class="popover-arrow"></div>
    `;

        document.body.appendChild(popover);

        // Позиционируем popover
        const rect = element.getBoundingClientRect();
        const popoverWidth = popover.offsetWidth;
        const popoverHeight = popover.offsetHeight;

        // Позиция сверху от элемента
        const top = window.scrollY + rect.top - popoverHeight - 10;
        const left = window.scrollX + rect.left + (element.offsetWidth - popoverWidth) / 2;

        popover.style.top = `${Math.max(0, top)}px`;
        popover.style.left = `${Math.max(0, left)}px`;
        popover.style.display = 'block';

        this.popovers.push(element);
    }

    hidePopover(element) {
        const index = this.popovers.indexOf(element);
        if (index > -1) {
            this.popovers.splice(index, 1);
        }
        this.hideAllPopovers();
    }

    hideAllPopovers() {
        const popovers = document.querySelectorAll('.popover');
        popovers.forEach(popover => popover.remove());
        this.popovers = [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const popoverWidget = new PopoverWidget();
    popoverWidget.init();
});
