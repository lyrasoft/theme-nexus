#!/bin/bash

rm -rf tabler
./bin/clone.sh

cd tabler
git pull
pnpm install

ORIGIN_CONFIG_FILE="preview/basic.config.mjs"

if [ ! -f "$ORIGIN_CONFIG_FILE" ]; then
  mv preview/eleventy.config.mjs $ORIGIN_CONFIG_FILE
fi

cp ../build/eleventy.nexus.config.mjs preview/eleventy.config.mjs

pnpm run build

cd ..

rm -rf demo
cp -r tabler/preview/dist demo

rm -rf src/tabler
mkdir src/tabler
cp -r tabler/core/js src/tabler
cp -r tabler/core/img src/tabler
cp -r tabler/core/scss src/tabler
cp -r tabler/preview/scss src/scss/preview

#rm -rf tabler
