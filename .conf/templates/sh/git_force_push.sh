#!/bin/bash


##### Functions

# Git commit/push for each module/submodule
commitPush () {
   echo ".... repo: $1 ....";
		cd "$2" || exit && echo ".... in root dir ....";
		git add . && git commit -am "feat(xxx): added x y z"
		git push -f origin main || echo ".... skipping ...." && echo ".... pushed files ....";
}


##### Main

clear

echo "##### starting #####";

# .github submodule
commitPush ".github" "./.conf" && echo "finished with the .github repo";

# core repo
commitPush "core" "../" && echo "finished with the core repo";


# backend submodule
commitPush "backend" "./backend" && echo "finished with the backend repo";



echo "";
echo "##### done #####";