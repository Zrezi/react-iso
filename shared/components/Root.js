import React  from 'react';
import Main   from './Main';

const Root = ({ route }) => {
	return (
		<Main routes={route.routes} />
	);
};

export default Root;
