import React   from 'react';
import TopNav  from './TopNav';

class About extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<TopNav route={this.props.route} />
				<div className="ui main text container">
					<h1>About Page</h1>
				</div>
			</div>
		);
	}
}

export default About;