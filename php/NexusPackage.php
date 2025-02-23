<?php

declare(strict_types=1);

namespace Lyrasoft\Theme\Nexus;

use Windwalker\Core\Html\HtmlFrame;
use Windwalker\Core\Package\AbstractPackage;
use Windwalker\Core\Package\PackageInstaller;

/**
 * The NexusPackage class.
 */
class NexusPackage extends AbstractPackage
{
    public function __construct(protected HtmlFrame $htmlFrame)
    {
    }

    public function install(PackageInstaller $installer): void
    {
        $installer->installModules(
            [
                static::path('src/scss/_nexus-variables.scss') => '@resources/assets/scss/admin/',
                static::path('src/scss/nexus.scss') => '@resources/assets/scss/admin/',
            ],
            [
                '"./' => '"vendor/lyrasoft/theme-nexus/src/scss/'
            ],
            ['scss']
        );

        $installer->installModules(
            [
                static::path('views/admin/global/**/*') => '@views/admin/global/',
            ],
            [],
            ['views']
        );
    }
}
