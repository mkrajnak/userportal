#!/bin/bash -xe

shopt -s nullglob

dependencies="$(sed -e '/^[ \t]*$/d' -e '/^#/d' automation/packages.force)"
# yum clean metadata || dnf clean metadata
# yum -y install ${dependencies} || dnf -y install ${dependencies}
yum-deprecated clean metadata || yum clean metadata
yum-deprecated -y install ${dependencies} || yum -y install ${dependencies}

# cleanup
rm -Rf \
    exported-artifacts \
    tmp.repos

# echo '{ "allow_root": true }' > ~/.bowerrc
mkdir exported-artifacts

# generate automake/autoconf files
export PATH=/usr/share/ovirt-engine-nodejs/bin:/usr/share/ovirt-engine-yarn/bin:${PATH}
echo === In build-artifacts.sh: PATH=${PATH}
rpm -qa | grep ovirt-engine-nodejs
./autogen.sh

# create rpm
yum-builddep ovirt-web-ui.spec
make rpm
cp *.tar.gz tmp.repos/

for file in $(find tmp.repos/ -iregex ".*\.\(tar\.gz\|rpm\)$"); do
    echo "Archiving $file"
    mv "$file" exported-artifacts/
done

