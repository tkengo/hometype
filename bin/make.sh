#/bin/sh

BASE_DIR=$(cd $(dirname $0)/..;pwd)
ZIP_FILE=$BASE_DIR/hometype.zip
PUBLISH_DIR=$BASE_DIR/__publish
IGNORE_FILES="
.git
.gitignore
bin/
README.md
karma.conf.js
package.json
wercker.yml
spec
"

if [ -e "$ZIP_FILE" ]; then
    rm -f $ZIP_FILE
fi

git clone git@github.com:tkengo/hometype.git $PUBLISH_DIR

for ignore_file in $IGNORE_FILES; do
    rm -fr $PUBLISH_DIR/$ignore_file
done

cd $PUBLISH_DIR && ./bin/build_dict

cd $BASE_DIR && zip -r $ZIP_FILE ${PUBLISH_DIR##*/}
rm -fr $PUBLISH_DIR
