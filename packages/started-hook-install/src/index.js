const fs = require(`fs`);
const util = require(`util`);

module.exports = {
	name: `hook-cmd-reg`,
	factory: (require) => {
		const { structUtils } = require(`@yarn/core`);

		return {
			default: {
				hooks: {
					afterAllInstalled(project) {
						let descriptorCount = 0;
						for (const descriptor of project.storedDescriptors.values())
							if (!structUtils.isVirtualDescriptor(descriptor)) descriptorCount += 1;

						let packageCount = 0;
						for (const pkg of project.storedPackages.values())
							if (!structUtils.isVirtualLocator(pkg)) packageCount += 1;

						console.log(
							`This project contains ${descriptorCount} different descriptors that resolve to ${packageCount} packages`
						);
					},
				},
			},
		};
	},
};
