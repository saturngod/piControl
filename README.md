***TEST VERSION AND NOT READY YET***

piControl is allow reboot and shutdown from browser in local network. It's using node.js.

## Install Node.js

	cd /usr/src
	sudo wget http://nodejs.org/dist/v0.8.18/node-v0.8.18.tar.gz
	sudo tar xvzf node-v0.8.18.tar.gz
	cd node-v0.8.18
	sudo ./configure
	sudo make
	sudo make install
	
The make process can take quite a while, well over an hour in most case.

If you want to install node.js automatically , call

	sudo sh ./install.sh

## Install forever

	npm install forever -g
	
## Copy file

	sudo mkdir /opt/piControl/
	
Copy all files to /opt/piControl/

## Edit Control file

Open the pictlnode.

Edit **forever** and **APP** path.

## Create Service

	sudo cp /opt/piControl/pictlnode /etc/init.d/pictlnode
	sudo chmod +x pictlnode
	update-rc.d pictlnode defaults
	reboot
	
After reboot , check your ip first.

	ifconfig
	
After you know the IP , call ***http://[your_ip_address]:1337*** from any browser in your local network.

Recommend to use static IP to control the raspberry pi.

