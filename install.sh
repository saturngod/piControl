cd /usr/src
wget http://nodejs.org/dist/v0.8.18/node-v0.8.18.tar.gz
tar xvzf node-v0.8.18.tar.gz
cd node-v0.8.18
./configure
make
make install
npm install freedisk