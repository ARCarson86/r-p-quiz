import React from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";

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