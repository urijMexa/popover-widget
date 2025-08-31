import './style.css';

export class PopoverWidget {
    constructor() {
        this.popover = null;
        this.activeButton = null;
    }

    init() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.dataset.toggle === 'popover') {
                e.preventDefault();
                e.stopPropagation();

                if (this.activeButton === target) {
                    this.hidePopover();
                } else {
                    this.showPopover(target);
                }
            } else if (this.popover) {
                this.hidePopover();
            }
        });

        // Закрывать popover при клике вне его области
        document.addEventListener('click', (e) => {
            if (this.popover && !e.target.closest('.popover') && !e.target.closest('[data-toggle="popover"]')) {
                this.hidePopover();
            }
        });
    }

    showPopover(button) {
        // Скрываем предыдущий popover
        this.hidePopover();

        const title = button.dataset.title;
        const content = button.dataset.content;

        // Создаем popover
        this.popover = document.createElement('div');
        this.popover.className = 'popover';
        this.popover.innerHTML = `
      <div class="popover-header">${title}</div>
      <div class="popover-body">${content}</div>
      <div class="popover-arrow"></div>
    `;

        // Добавляем popover в body
        document.body.appendChild(this.popover);

        // Позиционируем popover над кнопкой
        this.positionPopover(button);

        // Показываем popover с анимацией
        setTimeout(() => {
            this.popover.classList.add('show');
        }, 10);

        this.activeButton = button;
    }

    positionPopover(button) {
        const buttonRect = button.getBoundingClientRect();
        const popoverRect = this.popover.getBoundingClientRect();

        // Позиционируем popover над кнопкой
        const top = window.scrollY + buttonRect.top - popoverRect.height - 10;
        const left = window.scrollX + buttonRect.left + (buttonRect.width - popoverRect.width) / 2;

        this.popover.style.top = `${Math.max(0, top)}px`;
        this.popover.style.left = `${Math.max(0, left)}px`;
    }

    hidePopover() {
        if (this.popover) {
            this.popover.remove();
            this.popover = null;
        }
        this.activeButton = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const popoverWidget = new PopoverWidget();
    popoverWidget.init();
});
