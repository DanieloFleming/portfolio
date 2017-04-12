#!/usr/bin/php

<?php
echo "\033[1;32m \033[43m --- Build Started --- \033[0m \n";

exec ('compass compile _sass');

echo "-- compiled css -- \n";

passthru ('node node_modules/.bin/r.js -o public/static/js/build.js');

echo "\033[0;32m ----Build Completed--- \033[0m \n";