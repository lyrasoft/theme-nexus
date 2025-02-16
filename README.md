# Nexus Theme - LYRASOFT

## Installation

### Composer

```json
{
    "require": {
        ...
        "lyrasoft/theme-nexus": "^3.2",  
    },
    
    ...
    
    "repositories": [
        {
            "type": "git",
            "url": "git@github.com:lyrasoft/theme-nexus.git"
        }
    ]
}
```

Remember to add SSH key to your computer.

### Project

Use `pkg:install`

```shell
php windwalker pkg:install
```

```shell
  [xx] lyrasoft/theme-nexus ALL
  [xx] lyrasoft/theme-nexus: nexus
  [xx] lyrasoft/theme-nexus: nexus_dark
  [xx] lyrasoft/theme-nexus: nexus_views
```

Direct install:

```shell
php windwalker pkg:install --tag nexus --tag nexus_views -f

# OR

php windwalker pkg:install --tag nexus_dark --tag nexus_views -f
```

The scss files will copy to `resources/assets/scss/admin/`, you can modify `_variables.scss` to configure colors.

And the view files will install to `views/admin/global/` and you can modify `layout/submenu.blade.php` to add links.

## fusionfile.mjs

```javascript
export async function install() {
  installVendors([
    '@fortawesome/fontawesome-pro',
  ]);

  // Add below...
  src('vendor/lyrasoft/theme-nexus/').pipe(symlink('theme/admin'))
    on('end', () => {
      src('theme/admin/dist/assets/libs/').pipe(symlink('www/assets/vendor/admin/'));
      src('theme/admin/dist/assets/fonts/').pipe(symlink('www/assets/css/fonts/'));
    });
}
```

```javascript
export async function admin() {
  fusion.watch([
    'vendor/lyrasoft/theme-nexus/src/**/*',
    'resources/assets/scss/admin/**/*.scss'
  ]);

return wait(
    sass(
      'resources/assets/scss/admin/app.scss',
      'www/assets/css/admin/app.css'
    ),
    sass(
      'resources/assets/scss/admin/bootstrap.scss',
      'www/assets/css/admin/bootstrap.css'
    ),
    sass(
      'resources/assets/scss/admin/icons.scss',
      'www/assets/css/admin/icons.css'
    ),
    babel(
      'theme/admin/src/assets/js/app.js',
      'www/assets/js/admin/app.js'
    )
  );
}
```
