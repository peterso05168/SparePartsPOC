* Start the fabric runtime with `startFabric.sh`
https://hyperledger.github.io/composer/latest/installing/development-tools.html

* update the version property in package.json file

* Repackage the business network archive (.BNA) file, from the project directory with `composer archive create -t dir -n . `

* Install the network from the repackaged .BNA file with `composer network install --card PeerAdmin@hlfv1 --archiveFile NETWORK_NAME@NETWORK_VERSION.bna`

* Start the business network with `composer network start --networkName NETWORK_NAME --networkVersion NETWORK_VERSION --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card`

* Re-installed the admin card with `composer card import --file networkadmin.card`

* Ping the network to confirm it is running and the correct version with `composer network ping --card admin@NETWORK_NAME`. Make note of the Business Network Version.

* start the RESTful API `composer-rest-server -c admin@block-track -n never -u true -d n -w true`