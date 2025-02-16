
import { watch, sass, wait } from '@windwalker-io/fusion';

export function css() {
  watch([
    'src/scss/**/*.scss',
    'src/tabler/scss/**/*.scss'
  ]);

  return wait(
    sass('src/scss/main.scss', 'demo/dist/css/tabler.css', {
      sass: {
        includePaths: [
          'node_modules'
        ],
      },
      minify: 'separate_file'
    })
  )
}
