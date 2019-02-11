export default {
	Customer: {
		//'$class': 'org.hyperledger_composer.scms.Customer',
		'email': 'string',
		'firstName': 'string',
		'lastName': 'string',
		'type': 'string'
	},
	Distributor: {
		//'$class': 'org.hyperledger_composer.scms.Distributor',
		'email': 'string',
		'firstName': 'string',
		'lastName': 'string',
		'type': 'string'
	},
	Manufacturer: {
		//'$class': 'org.hyperledger_composer.scms.Manufacturer',
		'email': 'string',
		'firstName': 'string',
		'lastName': 'string',
		'type': 'string'
	},
	Retailer: {
		//'$class': 'org.hyperledger_composer.scms.Retailer',
		'email': 'string',
		'firstName': 'string',
		'lastName': 'string',
		'type': 'string'
	},
	Product: {
		//'$class': 'org.hyperledger_composer.scms.Product',
		'productId': 'string',
		'producttype': 'string',
		'size': 'SMALL',
		'description': 'Shoes',
		'owner': 'resource:org.hyperledger_composer.scms.participant#id',
		'issuer': 'resource:org.hyperledger_composer.scms.participant#id'
	},
	MoveProduct: {
		//'$class': 'org.hyperledger_composer.scms.MoveProduct',
		'product': 'resource:org.hyperledger_composer.scms.asset#id',
		'issuer': 'resource:org.hyperledger_composer.scms.participant#id',
		'newOwner': 'resource:org.hyperledger_composer.scms.participant#id',
		//'timestamp': '2019-02-09T15:09:41.136Z'
	}
};
