export const requestorKeys = 
	['respondorProjectSite', 
		'sparePartId', 
		'noOfSparePart'];

export const respondorKeys =
	['requestorProjectSite',
		'sparePartId',
		'noOfSparePart'];

export const displayName = {
	'respondorProjectSite': 'Response Project Site',
	'requestorProjectSite': 'Request Project Site',
	'sparePartId': 'Spare Part',
	'noOfSparePart': 'Requested Quantity'
};

export const steps = ['Pending', 'Approved',
	//  'Contract Signed', 
	'Received Requested Part', 'Tested by Requestor',
	'Arranged New Part', 'Received New Part', 'Tested by Responder'];
	
export const stepperStatus = {
	0: {
		label: '',
		value: 'P',
		field: 'requestorStatus',
		enable: ''
	},
	1: {
		label: 'Approve',
		value: 'A',
		field: 'requestorStatus',
		enable: 'responder'
	},	
	// 2: {
	// 	label: 'Sign & Deliver',
	// 	value: 'A',
	// 	field: 'requestorStatus',
	// 	enable: 'responder'
	// },
	2: {
		label: 'Comfirm Received',
		value: 'R',
		field: 'requestorStatus',
		enable: 'requestor'
	},
	3: {
		label: 'Finish Test',
		value: 'T',
		field: 'requestorStatus',
		enable: 'requestor'
	},
	4: {
		label: 'Arrange and Deliver',
		value: 'A',
		field: 'respondorStatus',
		enable: 'requestor'
	},
	5: {
		label: 'Comfirm Received',
		value: 'R',
		field: 'respondorStatus',
		enable: 'responder'
	},
	6: {
		label: 'Finish Test',
		value: 'T',
		field: 'respondorStatus',
		enable: 'responder'
	}
};