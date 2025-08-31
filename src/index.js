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
        const title = element.dataset.title;
        const content = element.dataset.content;

        // Удаляем существующий popover если есть
        const existingPopover = document.querySelector('.popover');
        if (existingPopover) {
            existingPopover.remove();
        }

        const popover = document.createElement('div');
        popover.classList.add('popover');
        popover.innerHTML = `
      <div class="popover-header">${title}</div>
      <div class="popover-body">${content}</div>
      <div class="popover-arrow"></div>
    `;

        document.body.appendChild(popover);

        const rect = element.getBoundingClientRect();
        const popoverHeight = popover.offsetHeight;
        const top = rect.top - popoverHeight - 10;
        const left = rect.left + (element.offsetWidth - popover.offsetWidth) / 2;

        popover.style.top = `${top}px`;
        popover.style.left = `${left}px`;
        popover.style.display = 'block';

        this.popovers.push(element);
    }

    hidePopover(element) {
        const index = this.popovers.indexOf(element);
        if (index > -1) {
            this.popovers.splice(index, 1);
        }
        const popover = document.querySelector('.popover');
        if (popover) {
            popover.remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const popoverWidget = new PopoverWidget();
    popoverWidget.init();
});
