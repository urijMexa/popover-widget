import './style.css';

export class PopoverWidget {
    constructor() {
        this.currentPopover = null;
    }

    init() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.dataset.toggle === 'popover') {
                e.preventDefault();

                if (this.currentPopover === target) {
                    this.hidePopover();
                } else {
                    this.showPopover(target);
                }
            } else if (this.currentPopover) {
                this.hidePopover();
            }
        });
    }

    showPopover(element) {
        // Скрываем предыдущий popover
        this.hidePopover();

        const title = element.dataset.title;
        const content = element.dataset.content;

        // Создаем обертку для popover
        const popoverWrapper = document.createElement('div');
        popoverWrapper.className = 'popover-wrapper';

        popoverWrapper.innerHTML = `
      <div class="popover">
        <div class="popover-header">${title}</div>
        <div class="popover-body">${content}</div>
      </div>
      <div class="popover-arrow"></div>
    `;

        // Добавляем обертку к кнопке
        element.appendChild(popoverWrapper);

        // Показываем popover
        setTimeout(() => {
            popoverWrapper.classList.add('show');
        }, 10);

        this.currentPopover = element;
    }

    hidePopover() {
        if (this.currentPopover) {
            const popoverWrapper = this.currentPopover.querySelector('.popover-wrapper');
            if (popoverWrapper) {
                popoverWrapper.remove();
            }
            this.currentPopover = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const popoverWidget = new PopoverWidget();
    popoverWidget.init();
});
