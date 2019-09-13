import React from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import Moment from 'moment';
import Link from './images/link.svg';
import "react-table/react-table.css";
import "./datatable.css";

class DataTable extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			data: [],
			isLoading: true,
			filters: {
				land_success: true,
				reuse: false,
				with_reddit: false
			}
		}

		this.getLaunches();
	}

	async getLaunches(){
		const response = await axios.get('https://api.spacexdata.com/v2/launches');
		this.setState({data: response.data, isLoading: false});
	}

	renderTable(){
		if(this.state.isLoading){
			return 'Loading Data';
		}else{
			return(
				<ReactTable
					data={this.state.data}
					filterable
					columns={[
						{
							Header: "Badge",
							accessor: "links.mission_patch_small",
							Cell: ({value}) => (<img src={value} />)
						},
						{
							Header: "Rocket Name",
							accessor: "rocket.rocket_name"
						},
						{
							Header: "Rocket Type",
							accessor: "rocket.rocket_type"
						},
						{
							Header: "Launch Date",
							accessor: "launch_date_utc",
							Cell: ({value}) => (Moment(value).format("L"))
						},
						{
							Header: "Details",
							accessor: "details"
						},
						{
							Header: "ID",
							accessor: "flight_number"
						},
						{
							Header: "Article",
							accessor: "links.article_link",
							Cell: ({value}) => (<a href={value} target="_blank"><img src={Link} /></a>)
						}
					]}
				/>
			);
		}
	}

	render(){
		
		console.log(this.state.data);
		return(
			<div>{this.renderTable()}</div>
		);
	}
}

export default DataTable