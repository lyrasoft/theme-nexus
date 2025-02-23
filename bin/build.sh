#!/bin/bash

rm -rf tabler
git clone https://github.com/tabler/tabler.git --depth=1

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

#rm -rf tabler
