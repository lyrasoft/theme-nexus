#!/bin/bash

# Remove non-necessary files
rm -rf demo/static/emails
rm -rf demo/static/components
echo "<a href='https://tabler.io/icons' target='_blank'>https://tabler.io/icons</a>" >> demo/icons.html

rm -rf tabler
