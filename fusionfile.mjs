
import { watch, sass, wait, copy, ts, parallel } from '@windwalker-io/fusion';
import fs from 'fs';
import path from 'path';

export function js() {
  watch([
    'src/ts/**/*.ts',
  ]);

  return wait(
    ts(
      'src/ts/*.ts',
      'src/js/',
      {
        tsconfig: path.resolve('tsconfig.json'),
        minify: 'separate_file'
      }
    )
  )
}

export function css() {
  watch([
    'src/scss/**/*.scss',
    'src/tabler/scss/**/*.scss'
  ]);

  return wait(
    sass('src/scss/nexus.scss', 'demo/dist/css/tabler.css', {
      sass: {
        includePaths: [
          'node_modules',
          './'
        ],
      },
      minify: 'separate_file'
    }),
    sass('src/scss/demo.scss', 'demo/preview/css/demo.css', {
      sass: {
        includePaths: [
          'node_modules',
          './'
        ],
      },
      minify: 'separate_file'
    }),
  )
}

const copyList = [
  'ribble'
];

export async function install() {
  deleteExists('src/js/libs/');

  const streams = [];

  for (const item of copyList) {
    const path = `node_modules/${item}/**/*`;
    const dest = `src/js/libs/${item}/`;

    const p = await copy(path, dest);

    p.on('end', () => {
      console.log(`[Copy] ${path} => ${dest}`);
    });

    streams.push(p);
  }

  return wait(...streams);
}

function deleteExists(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const subDirs = fs.readdirSync(dir, { withFileTypes: true });

  subDirs.forEach((subDir) => {
    if (subDir.isSymbolicLink() || subDir.isFile()) {
      fs.unlinkSync(path.join(dir, subDir.name));
    } else if (subDir.isDirectory()) {
      deleteExists(path.join(dir, subDir.name));
    }
  });

  fs.rmdirSync(dir);
}

export default parallel(css, js);
