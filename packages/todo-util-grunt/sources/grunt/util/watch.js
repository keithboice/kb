module.exports = {
	node_modules: {
		files: ["node_modules/", "**/node_modules"],
		tasks: ["run:modified:dependency"],
	},
	js: {
		files: ["*.{js,jsx,mjs,cjs}"],
		tasks: ["run:modified:js"],
	},
	subs_conf: {
		files: [".conf/"],
		tasks: ["repo:conf"],
	},
	subs_gh: {
		files: [".github/"],
		tasks: ["repo:github"],
	},
	subs_idea: {
		files: [".idea/"],
		tasks: ["repo:idea"],
	},
	subs_run: {
		files: [".run/"],
		tasks: ["repo:run"],
	},
	subs_docs: {
		files: ["docs/"],
		tasks: ["repo:docs"],
	},
};
