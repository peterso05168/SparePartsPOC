# Section 1: Pre-requisites
install prerequisites
https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html

install the development environment
https://hyperledger.github.io/composer/latest/installing/development-tools.html

# Section 2: Deploying the .bna file on the Fabric
### Install composer runtime
In order to install the Business Network Archive onto the Hyperledger Fabric network you need to install the business network onto the peers. You will need to have the Business Network archive to do this.

`composer network install --card PeerAdmin@hlfv1 --archiveFile
block-track@NETWORK_VERSION.bna`

### Deploy the business network
`composer network start --networkName block-track --networkVersion NETWORK_VERSION --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card`

### Import the network administrator identity as a usable business network card
`composer card import --file networkadmin.card`

### Checking the card
`composer network ping --card admin@block-track`

# Section 3: Start the RESTful API
`composer-rest-server -c admin@block-track -n never -u true -d n -w true`

more detail on https://medium.com/coinmonks/building-a-blockchain-application-using-hyperledger-fabric-with-angular-frontend-part-2-22ef7c77f53

# Deploying the changes

* update the version property in package.json file

* Repackage the business network archive (.BNA) file, from the project directory with `composer archive create -t dir -n . `

* Install the network from the repackaged .BNA file with `composer network install --card PeerAdmin@hlfv1 --archiveFile NETWORK_NAME@NETWORK_VERSION.bna`

* Start the business network with `composer network start --networkName NETWORK_NAME --networkVersion NETWORK_VERSION --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card`

* Re-installed the admin card with `composer card import --file networkadmin.card`

* Ping the network to confirm it is running and the correct version with `composer network ping --card admin@NETWORK_NAME`. Make note of the Business Network Version.

* start the RESTful API `composer-rest-server -c admin@block-track -n never -u true -d n -w true`

