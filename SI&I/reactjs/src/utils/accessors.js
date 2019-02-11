import _ from 'lodash';
import moment from 'moment';

export const date = key => row => {
	let value = _.get(row, key);
	return value
		? moment(value).format('YYYY-MM-DD')
		: 'No Data';
};
export const nil = () => () => '';
export const string = key => key;
export const number = string;
export const boolean = key => row => _.get(row, key) ? 'Yes': 'No';
