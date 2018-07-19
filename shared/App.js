import React             from 'react';
import { renderRoutes }  from 'react-router-config';
import routes            from './routes';

const App = () => {
	return (
		<div>
			{renderRoutes(routes)}
		</div>
	);
};

export default App;
