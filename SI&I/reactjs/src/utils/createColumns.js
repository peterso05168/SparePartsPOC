import _ from 'lodash';

export default function createColumns(fields, { select = [] }) {
	let columns = _.map(select, name => _.find(fields, { name }));
	columns = _.map(columns, ({ name, key, aggregate, accessor, Cell }) => ({
		id: key,
		Header: name,
		filterable: true,
		accessor: accessor ? accessor: (v) => _.get(v, key),
		...aggregate && { aggregate },
		...Cell && { Cell }
	}));
	return columns;
}
