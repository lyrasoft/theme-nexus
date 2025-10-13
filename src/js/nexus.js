System.register(["@windwalker-io/unicorn-next", "bootstrap"], function (exports_1, context_1) {
    "use strict";
    var unicorn_next_1, bootstrap_1, nexus, NexusTheme;
    var __moduleName = context_1 && context_1.id;
    function useNexusTheme() {
        nexus ?? (nexus = new NexusTheme().init());
        return nexus;
    }
    exports_1("useNexusTheme", useNexusTheme);
    return {
        setters: [
            function (unicorn_next_1_1) {
                unicorn_next_1 = unicorn_next_1_1;
            },
            function (bootstrap_1_1) {
                bootstrap_1 = bootstrap_1_1;
            }
        ],
        execute: function () {
            NexusTheme = class NexusTheme {
                init() {
                    unicorn_next_1.domready(() => {
                        this.initRipple();
                        this.initSidebarToggle();
                        this.initSidebarMenu();
                        this.initFullscreen();
                    });
                    unicorn_next_1.useMacro('logout', async (url, data) => {
                        if (!url) {
                            throw new Error('Please provide logout URL.');
                        }
                        const form = await unicorn_next_1.useFormAsync();
                        return form.post(url, data);
                    });
                    return this;
                }
                initRipple() {
                    if (!window.Ribble) {
                        return;
                    }
                    unicorn_next_1.useUniDirective('ripple', {
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
                        const menuCollapse = bootstrap_1.Collapse.getOrCreateInstance(menu, { toggle: false });
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
        }
    };
});

//# sourceMappingURL=nexus.js.map
