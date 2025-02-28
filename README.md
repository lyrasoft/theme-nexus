# Nexus Theme - LYRASOFT

![cover](https://github.com/user-attachments/assets/aff7835c-37f4-4f58-94bc-b7eb6dd7c6a7)

<!-- TOC -->
* [Nexus Theme - LYRASOFT](#nexus-theme---lyrasoft)
  * [Installation](#installation)
    * [Install via Composer](#install-via-composer)
    * [Project](#project)
  * [fusionfile.mjs](#fusionfilemjs)
    * [Add Assets to Middleware](#add-assets-to-middleware)
  * [Sidebar Mode](#sidebar-mode)
    * [Default](#default)
    * [Full Dark Sidebar](#full-dark-sidebar)
    * [White Sidebar](#white-sidebar)
    * [Colorful Sidebar](#colorful-sidebar)
<!-- TOC -->

## Installation

> ### Remove old Skote Theme
> ```shell
> composer remove lyrasoft/theme-skote
> ```
> And must remove the `repositories` at `composer.json`
> ```json
>     "repositories": [
>         {
>             "type": "git",
>             "url": "git@github.com:lyrasoft/theme-skote.git"
>         }
>     ]
> ```
> Then remove these 4 files:
> ![screenshot 2025-02-28 下午2 25 42](https://github.com/user-attachments/assets/3d199a74-261a-449e-82a2-a5074a500b55)


### Install via Composer

```shell
composer require lyrasoft/theme-nexus
```

Remember to add SSH key to your computer.

### Project

Use `pkg:install`

```shell
php windwalker pkg:install
```

```shell
  [xx] lyrasoft/theme-nexus ALL
  [xx] lyrasoft/theme-nexus: scss
  [xx] lyrasoft/theme-nexus: views
```

Direct install:

```shell
php windwalker pkg:install lyrasoft/theme-nexus --tag scss --tag views -f
```

The scss files will copy to `resources/assets/scss/admin/`, you can modify `_nexus-variables.scss` to configure colors.

And the view files will install to `views/admin/global/`.

## fusionfile.mjs

```js
export async function install() {
  installVendors([
    '@fortawesome/fontawesome-pro',
      // ...
  ]);

  // Add below...
src('vendor/lyrasoft/theme-nexus/').pipe(symlink('theme/nexus'))
    .on('end', () => {
        src('theme/nexus/src/js/').pipe(symlink('www/assets/vendor/nexus/'));
    });
}
```

```js
export async function admin() {
    fusion.watch([
        'vendor/lyrasoft/theme-nexus/src/**/*',
        'resources/assets/scss/admin/**/*.scss'
    ]);
    
    return wait(
        sass(
            'resources/assets/scss/admin/nexus.scss',
            'www/assets/css/admin/nexus.css',
            {
                sass: {
                    includePaths: [
                        'node_modules',
                        'vendor/lyrasoft/theme-nexus'
                    ]
                }
            }
        ),
    );
}
```

Then run:

```shell
yarn build install
yarn build admin
```

### Add Assets to Middleware

```php
namespace App\Module\Admin;

class AdminMiddleware extends AbstractLifecycleMiddleware
{
    // ...
    
    protected function preprocess(ServerRequestInterface $request): void
    {
        // ...
        
        // Remove bootstrap CSS, bootstrap styles was merged to nexus.css
        // $this->asset->css('css/admin/bootstrap.min.css');

        // ...

        $this->asset->js('vendor/nexus/libs/ribble/dist/ribble.js');
        $this->asset->js('vendor/nexus/nexus.js');
        $this->asset->css('css/admin/nexus.min.css');

        // ...
```

## Sidebar Mode

### Default

The default mode is white brand and dark sidebar:

![Image](https://github.com/user-attachments/assets/1b0d5fc8-58bd-4ed3-9472-654b42d588ad)

### Full Dark Sidebar

Add `data-bs-theme="dark"` to `sidebar.blade.php` navbar div:

```html
<aside class="l-sidebar navbar navbar-vertical navbar-expand" data-bs-theme="dark">
    ...
```

![Image](https://github.com/user-attachments/assets/83a2c2e6-b954-4c6a-af97-f38ef0a1f0fb)

### White Sidebar

Modify `sidebar.blade.php` both navbar and sidemenu as `light`, and consider add `border-end` to navbar div.

```html
<aside class="l-sidebar navbar navbar-vertical navbar-expand border-end" data-bs-theme="light">

    ...

    <div class="collapse navbar-collapse l-sidebar-menu" id="sidebar-menu"
        data-bs-theme="light">
```

![Image](https://github.com/user-attachments/assets/310ea8b8-e25c-499f-8898-2ec79c8a4719)

### Colorful Sidebar

Modify `_nexus-variables.scss` sidebar section, for example, use `primary` as sidebar color:

```scss
// Sidebar
$sidebar-width: 250px;
$sidebar-bg: shade-color($primary, 20%);
$sidebar-nav-item-active-bg: $primary;

// Sidebar - Dark
$sidebar-dark-bg: shade-color($primary, 20%);
$sidebar-dark-nav-item-active-bg: shade-color($primary, 30%);
$sidebar-dark-menu-item-color: tint-color($primary, 70%);
```

![Image](https://github.com/user-attachments/assets/4e00158b-8019-4d5b-beb1-8a4faca63215)
