mkdir <repo>
cd <repo>
git init
git remote add -f origin <url>

git config core.sparseCheckout true

echo "some/dir/" >> .git/info/sparse-checkout

git pull origin master
