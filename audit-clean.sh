npm i --package-lock-only --registry=https://registry.npmjs.org
npm audit --registry=https://registry.npmjs.org
npm audit fix --force --registry=https://registry.npmjs.org
rm -f yarn.lock 2>/dev/null
yarn import
rm -f package-lock.json 2>/dev/null
