export default {
	ProjectSite: {
		//"$class": "org.hyperledger_composer.scms.ProjectSite",
		'id': 'string',
		'address': 'string',
		'name': 'string',
		'powerTech': 'string',
		'contactName': 'string',
		'contactTel': 'string'
	},
	Contract: {
		//"$class": "org.hyperledger_composer.scms.Contract",
		'id': 'string',
		'requestorStatus': 'string',
		'respondorStatus': 'string',
		'amiToken': 'string',
		'paymentToRespondor': 'string',
		'requestorProjectSite': 'resource:org.hyperledger_composer.scms.ProjectSite#id',
		'respondorProjectSite': 'resource:org.hyperledger_composer.scms.ProjectSite#id'
	},
	SparePart: {
		//'$class': 'org.hyperledger_composer.scms.SparePart',
		'id': 'string',
		'displayName': 'string',
		'currentLocation': 'string',
		'category': 'string',
		'OEM': 'string',
		'modelNo': 'string',
		'certOfOrigin': 'string',
		'countryOfOrigin': 'string',
		'firstUseDate': '2019-02-17T16:56:06.671Z',
		'condition': 'string',
		'accumulateEOH': 'string',
		'owner': 'resource:org.hyperledger_composer.scms.ProjectSite#id'
	},
	SparePartToProjectSite: {
		//"$class": "org.hyperledger_composer.scms.SparePartToProjectSite",
		'id': 'string',
		'sparePartId': 'string',
		'noOfAvailable': 0,
		'ownerProjectSite': 'resource:org.hyperledger_composer.scms.ProjectSite#id'
	},
	UpdateAvailNoOfSparePartToProjSite: {
		//"$class": "org.hyperledger_composer.scms.UpdateAvailNoOfSparePartToProjSite",
		'noOfAvailable': 0,
		'sparePartToProjectSite': 'resource:org.hyperledger_composer.scms.SparePartToProjSite#id',
		// "transactionId": "string",
		// "timestamp": "2019-02-17T16:56:06.741Z"
	},
	UpdateReqContract: {
		//"$class": "org.hyperledger_composer.scms.UpdateReqContract",
		'newStatus': 'string',
		'contract': 'resource:org.hyperledger_composer.scms.Contract#id',
		// "transactionId": "string",
		// "timestamp": "2019-02-17T16:56:06.753Z"
	},
	UpdateRespContract: {
		//"$class": "org.hyperledger_composer.scms.UpdateRespContract",
		'newStatus': 'string',
		'contract': 'resource:org.hyperledger_composer.scms.Contract#id',
		// "transactionId": "string",
		// "timestamp": "2019-02-17T16:56:06.753Z"
	},
	MoveProduct: {
		//'$class': 'org.hyperledger_composer.scms.MoveProduct',
		'product': 'resource:org.hyperledger_composer.scms.asset#id',
		'issuer': 'resource:org.hyperledger_composer.scms.participant#id',
		'newOwner': 'resource:org.hyperledger_composer.scms.participant#id',
		//'timestamp': '2019-02-09T15:09:41.136Z'
	}
};
