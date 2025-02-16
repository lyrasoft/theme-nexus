/*!
 * Tabler Demo v1.0.0 (https://tabler.io)
 * Copyright 2018-2025 The Tabler Authors
 * Copyright 2018-2025 codecalm.net Paweł Kuna
 * Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
 */
const themeStorageKey="tablerTheme",defaultTheme="light";let selectedTheme;const params=new Proxy(new URLSearchParams(window.location.search),{get:(e,t)=>e.get(t)});if(params.theme)localStorage.setItem("tablerTheme",params.theme),selectedTheme=params.theme;else{selectedTheme=localStorage.getItem("tablerTheme")||"light"}"dark"===selectedTheme?document.body.setAttribute("data-bs-theme",selectedTheme):document.body.removeAttribute("data-bs-theme");
//# sourceMappingURL=demo-theme.min.js.map