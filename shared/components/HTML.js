import React from 'react';

class HTML extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<html lang="en">
				<head>
					<title>Isomorphic Router Demo</title>
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"/>
				</head>
				<body>
					<div id="root" dangerouslySetInnerHTML={{ __html: this.props.html }} />
					<script type="application/javascript" src="/main.bundle.js" />
				</body>
			</html>
		)
	}
}

export default HTML