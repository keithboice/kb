---
to: <%=package_dir%>/<%=package_name%>/package.json
---
{
  "author": "Keith Boice <69816300+keithboice@users.noreply.github.com> (https://github.com/keithboice)",
  "bin": "./bin/cli.js",
  "bugs": {
	"url": "https://github.com/keithboice/kb/issues"
  },
  "dependencies": {},
  "description": "{%= package_description %}",
  "directories": {
	"bin": "bin",
	"dist": "dist"
  },
  "engines": {
	"node": ">=14.0.0"
  },
  "exports": {
	"import": "./dist/index.mjs",
	"require": "./dist/index.cjs"
  },
  "files": ["cli.js", "index.js", "index.cjs", "index.mjs", "index.umd.js"],
  "homepage": "https://github.com/keithboice/kb/tree/master/packages/<%=package_name%>#readme",
  "license": "MIT",
  "main": "./dist/index.cjs",
  "name:": "<%=package_name%>",
  "publishConfig": {
	"access": "public"
  },
  "repository": {
	"type": "git",
	"url": "git+https://github.com/keithboice/kb.git",
	"directory": "packages/<%=package_name%>"
  },
  "scripts": {
	"test": "echo \"Error: run test from root\" && exit 1"
  },
  "type": "module",
  "version": "0.0.6"
}
