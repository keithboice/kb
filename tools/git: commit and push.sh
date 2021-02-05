#!/bin/bash

yarn install && yarn pack && yarn stage --commit & echo "finished yarn commit step"

# see https://blog.heroku.com/building-a-monorepo-with-yarn-2
# yarn dlx --package typescript tsc --init && yarn workspace server build && yarn workspaces foreach run build

yarn run commit #follow prompts

# npx cz # as an alternative