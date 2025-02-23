System.register(["@main"], function (exports_1, context_1) {
    "use strict";
    var NexusTheme, nexus;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
            NexusTheme = class NexusTheme {
                static install(app, options) {
                    const nexus = app.$nexus = new this(app);
                }
                constructor(app) {
                    Object.defineProperty(this, "app", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: app
                    });
                    //
                }
                initRipple() {
                    if (!window.Ribble) {
                        return;
                    }
                    u.directive('ripple', {
                        mounted(el, { value }) {
                            if (value) {
                                value = JSON.parse(value);
                            }
                            else {
                                value = undefined;
                            }
                            Ribble.attachEvent(el, value);
                        }
                    });
                    const buttons = document.querySelector('#admin-toolbar')
                        ?.querySelectorAll('a, button') || [];
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
                        }
                        else {
                            document.body.classList.remove('sidebar-enabled');
                            document.body.classList.toggle('sidebar-collapsed');
                        }
                    });
                }
                initSidebarMenu() {
                    const menuButtons = document.querySelectorAll('.l-sidebar .dropdown-toggle');
                    for (const menuButton of menuButtons) {
                        const menu = menuButton.closest('.dropdown')?.querySelector('.dropdown-menu');
                        if (!menu) {
                            continue;
                        }
                        const menuCollapse = u.$ui.bootstrap.collapse(menu, { toggle: false });
                        menuButton.addEventListener('click', () => {
                            const show = menuButton.classList.toggle('show');
                            if (show) {
                                menuCollapse.show();
                            }
                            else {
                                menuCollapse.hide();
                            }
                        });
                    }
                }
                initFullscreen() {
                    const fullScreenButtons = document.querySelectorAll('[data-nx-toggle=fullscreen]');
                    for (const fullScreenButton of fullScreenButtons) {
                        fullScreenButton.addEventListener('click', () => {
                            if (!document.fullscreenElement) {
                                let el = document.body;
                                if (fullScreenButton.dataset.bsTarget) {
                                    el = document.querySelector(fullScreenButton.dataset.bsTarget);
                                }
                                if (el) {
                                    el.requestFullscreen?.()
                                        || el.mozRequestFullscreen?.()
                                        || el.webkitRequestFullscreen?.();
                                }
                            }
                            else {
                                document.cancelFullscreen?.()
                                    || document.mozCancelFullScreen?.()
                                    || document.webkitCancelFullScreen?.();
                            }
                        });
                    }
                }
            };
            u.use(NexusTheme);
            nexus = u.inject('$nexus');
            nexus.initRipple();
            nexus.initSidebarToggle();
            nexus.initSidebarMenu();
            nexus.initFullscreen();
        }
    };
});

//# sourceMappingURL=nexus.js.map
