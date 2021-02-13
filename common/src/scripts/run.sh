#cd /Users/dkb/repos/working || exit
pwd

# documentation build ./**/!(pnpm|node_modules|docs|rush|dist|build)/*.js -f md --resolve=node --github -o "./docs/documentation/md/backend.md"
# documentation build ./*/*.js -f md --resolve=node --github -o "./docs/documentation/md/backend.md"

documentation readme ./index.js --readme-file=/Users/dkb/repos/working/script-docs-readme/README_local.md --section=Documentation --resolve=node --sort-order=alpha --github

jsdoc2md --configure ./conf.js --partial /Users/dkb/repos/working/script-docs-readme/main.hbs -t /Users/dkb/repos/working/script-docs-readme/local_README.hbs --files ./
