import config from './basic.config.mjs';

/** @type {import('@11ty/eleventy').LocalConfig} */
export default (eleventyConfig) => {
  config(eleventyConfig);
  // layout-navbar-hide-brand: true
  // layout-navbar-hide-page-menu: true
  // layout-navbar-class: "d-none d-lg-flex"
  // layout-navbar-condensed: true
  eleventyConfig.addGlobalData('layout-sidebar', true);
  eleventyConfig.addGlobalData('layout-navbar-hide-brand', true);
  eleventyConfig.addGlobalData('layout-navbar-hide-page-menu', true);
  eleventyConfig.addGlobalData('layout-navbar-condensed', true);
}
