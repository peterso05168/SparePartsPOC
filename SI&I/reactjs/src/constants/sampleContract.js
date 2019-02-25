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
		rejectLabel: '',
		value: 'P',
		field: 'requestorStatus',
		enable: ''
	},
	1: {
		label: 'Approve',
		rejectLabel: 'Reject',
		value: 'A',
		field: 'requestorStatus',
		enable: 'responder',
		updateAvaliability: '-'
	},	
	// 2: {
	// 	label: 'Sign & Deliver',
	// 	value: 'A',
	// 	field: 'requestorStatus',
	// 	enable: 'responder'
	// },
	2: {
		label: 'Comfirm Received',
		rejectLabel: 'Fail To Receive',
		value: 'R',
		field: 'requestorStatus',
		enable: 'requestor',
		updateAvaliability: '+'
	},
	3: {
		label: 'Finish Test',
		rejectLabel: 'Fail',
		value: 'T',
		field: 'requestorStatus',
		enable: 'requestor',
		rejectUpdateAvaliability: '-'
	},
	4: {
		label: 'Arrange and Deliver',
		rejectLabel: '',
		value: 'A',
		field: 'respondorStatus',
		enable: 'requestor',
		updateAvaliability: '-'
	},
	5: {
		label: 'Comfirm Received',
		rejectLabel: 'Failed to receive',
		value: 'R',
		field: 'respondorStatus',
		enable: 'responder',
		updateAvaliability: '+'
	},
	6: {
		label: 'Finish Test',
		rejectLabel: 'Fail',
		value: 'T',
		field: 'respondorStatus',
		enable: 'responder',
		rejectUpdateAvaliability: '-'
	}
};