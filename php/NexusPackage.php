<?php

declare(strict_types=1);

namespace Lyrasoft\Theme\Nexus;

use Windwalker\Core\Package\AbstractPackage;
use Windwalker\Core\Package\PackageInstaller;

/**
 * The NexusPackage class.
 */
class NexusPackage extends AbstractPackage
{
    public function install(PackageInstaller $installer): void
    {
        $installer->installModules(
            [
                static::path('src/assets/scss/_variables.scss') => '@resources/assets/scss/admin/',
                static::path('src/assets/scss/bootstrap.scss') => '@resources/assets/scss/admin/',
                static::path('src/assets/scss/app.scss') => '@resources/assets/scss/admin/',
                static::path('src/assets/scss/icons.scss') => '@resources/assets/scss/admin/',
            ],
            [
                '"custom/' => '"./vendor/lyrasoft/theme-nexus/src/assets/scss/custom/'
            ],
            ['nexus']
        );

        $installer->installModules(
            [
                static::path('src/assets/scss/_variables-dark.scss') => '@resources/assets/scss/admin/',
                static::path('src/assets/scss/bootstrap-dark.scss') => '@resources/assets/scss/admin/',
                static::path('src/assets/scss/app-dark.scss') => '@resources/assets/scss/admin/',
                static::path('src/assets/scss/icons.scss') => '@resources/assets/scss/admin/',
            ],
            [
                '"custom/' => '"./vendor/lyrasoft/theme-nexus/src/assets/scss/custom/'
            ],
            ['nexus_dark']
        );

        $installer->installModules(
            [
                static::path('views/admin/global/**/*') => '@views/admin/global/',
            ],
            [],
            ['nexus_views']
        );
    }
}
