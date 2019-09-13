import React from 'react';
import axios from 'axios';

class DataTable extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			data: {}
		}

		axios.get('https://api.spacexdata.com/v2/launches').then(response => {
			this.setState({
				data: response.data
			});
		});
	}

	render(){
		console.log(this.state.data);
		return(
			<div>test</div>
		);
	}
}

export default DataTable