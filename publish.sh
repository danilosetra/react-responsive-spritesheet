clear
pwd
echo " "

while true; do
    read -p "Do you wish to upgrade this version and publish to NPM? " yn
    case $yn in
        [Yy]* )
          echo " "
          echo "PUBLISH VERSION STARTS...";
          break;;
        [Nn]* )
          exit;;
        * )
          echo "Please answer yes or no.";;
    esac
done

# Version key/value should be on his own line
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",\t ]//g')

read -p "Enter the type of update ('major', 'minor' or 'patch' -> MAJOR.MINOR.PATCH): " PATCH_TYPE
read -p "Enter commit message: " COMMIT_MESSAGE


echo " "
echo "/////--------------------------------------------------------/////"
echo "START -> CURRENT VERSION: ${PACKAGE_VERSION}"
echo " "

echo "BUILD IN PROGRESS..."
yarn build
echo "DONE!"
echo " "

echo "GIT COMMIT"
git add .
git commit -m "npm version update // ${COMMIT_MESSAGE}"
echo "DONE! "
echo " "

echo "UPDATING LOCAL BRANCHES..."
git checkout develop
git pull origin develop
git pull origin master
echo "DONE!"
echo " "

echo "UPDATING VERSION"
npm version $PATCH_TYPE
echo "DONE! "
echo " "

echo "PUBLISHING..."
npm publish
echo "DONE! "
echo " "

# Version key/value should be on his own line
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",\t ]//g')

echo "GIT MERGING AND UPDATING..."
git checkout master
git merge develop
git push origin master
git push origin v$PACKAGE_VERSION
git push origin develop
git checkout develop
echo "DONE!"
echo " "

echo " "
echo "..."
echo " "
echo "DONE! V${PACKAGE_VERSION} PUBLISHED"
echo " "
echo "/////--------------------------------------------------------/////"
echo " "