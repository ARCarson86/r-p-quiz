import React from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";

class DataTable extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			data: {},
			filters: {
				land_success: true,
				reuse: false,
				with_reddit: false
			}
		}

		axios.get('https://api.spacexdata.com/v2/launches').then(response => {
			this.setState({
				data: response.data
			});
		});
	}

	renderDataTable(){
		const fields = [
			{ name: 'name', displayName: "Name", inputFilterable: true, sortable: true },
		]
	}

	render(){
		console.log(this.state.data);
		return(
			<div>test</div>
		);
	}
}

export default DataTable