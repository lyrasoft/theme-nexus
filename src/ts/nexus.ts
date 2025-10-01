import { domready, useUniDirective } from '@windwalker-io/unicorn-next';
import { Collapse } from 'bootstrap';

let nexus: NexusTheme;

export function useNexusTheme() {
  nexus ??= new NexusTheme().init();

  return nexus;
}

class NexusTheme {
  init() {
    domready(() => {
      this.initRipple();
      this.initSidebarToggle();
      this.initSidebarMenu();
      this.initFullscreen();
    });

    return this;
  }

  initRipple() {
    if (!window.Ribble) {
      return;
    }

    useUniDirective('ripple', {
      mounted(el, { value }) {
        if (value) {
          value = JSON.parse(value);
        } else {
          value = undefined;
        }

        Ribble.attachEvent(el, value);
      }
    });

    const buttons = document.querySelector('#admin-toolbar')
      ?.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>('a, button') || [];

    for (const button of buttons) {
      Ribble.attachEvent(button);
    }
  }

  initSidebarToggle() {
    const toggler = document.querySelector('[data-nx-toggle="sidebar"]');

    toggler?.addEventListener('click', () => {
      if (window.innerWidth <= 991) {
        document.body.classList.remove('sidebar-collapsed');
        document.body.classList.toggle('sidebar-enabled');
      } else {
        document.body.classList.remove('sidebar-enabled');
        document.body.classList.toggle('sidebar-collapsed');
      }
    });
  }

  initSidebarMenu() {
    const menuButtons = document.querySelectorAll<HTMLDivElement>('.l-sidebar .dropdown-toggle');

    for (const menuButton of menuButtons) {
      const menu = menuButton.closest('.dropdown')?.querySelector('.dropdown-menu');

      if (!menu) {
        continue;
      }

      const menuCollapse = Collapse.getOrCreateInstance(menu, { toggle: false });

      menuButton.addEventListener('click', () => {
        const show = menuButton.classList.toggle('show');

        if (show) {
          menuCollapse.show();
        } else {
          menuCollapse.hide();
        }
      });
    }
  }

  initFullscreen() {
    const fullScreenButtons = document.querySelectorAll<HTMLAnchorElement|HTMLButtonElement>('[data-nx-toggle=fullscreen]');

    for (const fullScreenButton of fullScreenButtons) {
      fullScreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          let el: HTMLElement | null = document.body;

          if (fullScreenButton.dataset.bsTarget) {
            el = document.querySelector(fullScreenButton.dataset.bsTarget);
          }

          if (el) {
            el.requestFullscreen?.()
            || el.mozRequestFullscreen?.()
            || el.webkitRequestFullscreen?.();
          }
        } else {
          document.cancelFullscreen?.()
          || document.mozCancelFullScreen?.()
          || document.webkitCancelFullScreen?.();
        }
      })
    }
  }
}

declare global {
  interface HTMLElement {
    mozRequestFullscreen?: Function;
    webkitRequestFullscreen?: Function;
  }
  interface Document {
    cancelFullscreen?: Function;
    mozCancelFullScreen?: Function;
    webkitCancelFullScreen?: Function;
  }
}
