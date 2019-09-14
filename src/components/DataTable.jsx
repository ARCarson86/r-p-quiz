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
				land_success: false
			},
			filtered: [{
				id: "land_success", value: ""
			}]
		}

		this.getLaunches();
	}

	async getLaunches(){
		const response = await axios.get('https://api.spacexdata.com/v2/launches');
		this.setState({data: response.data, isLoading: false});
	}

	handleLandSuccess(e){
		let filtered = this.state.filtered;
		let filters = this.state.filters;

		filters.land_success = !filters.land_success
		filtered[0].value = filters.land_success ? "true" : "";

		this.setState({filters: filters, filtered: filtered})
	}

	renderTable(){
		if(this.state.isLoading){
			return 'Loading Data';
		}else{
			return(
				<ReactTable
					data={this.state.data}
					filterable
					filtered={this.state.filtered}
        	onFilteredChange={filtered => this.setState({ filtered })}
					columns={[
						{
							Header: "Badge",
							accessor: "links.mission_patch_small",
							Cell: ({value}) => (<img src={value} />),
							filterable: false
						},
						{
							Header: "Rocket Name",
							accessor: "rocket.rocket_name",
							filterable: false
						},
						{
							Header: "Rocket Type",
							accessor: "rocket.rocket_type",
							filterable: false
						},
						{
							Header: "Launch Date",
							accessor: "launch_date_utc",
							Cell: ({value}) => (Moment(value).format("L")),
							filterable: false
						},
						{
							Header: "Details",
							accessor: "details",
							filterable: false
						},
						{
							Header: "ID",
							accessor: "flight_number",
							filterable: false
						},
						{
							Header: "Article",
							accessor: "links.article_link",
							Cell: ({value}) => (<a href={value} target="_blank"><img src={Link} /></a>),
							filterable: false
						},
						{
							accessor: (row) => {
								let success = 'false';
								if(row.rocket.first_stage.cores.length > 0){
									for(let e of row.rocket.first_stage.cores){
										if(e.land_success){
											success = 'true';
											break;
										}
									}
								}
								return success;
							},
							id: "land_success",
							show: false,
							filterMethod: (filter, row) => {
								if(filter.value){
									return row[filter.id] === "true";
								}else{
									return true;
								}
              }
            }
					]}
				/>
			);
		}
	}

	render(){
		
		console.log(this.state.data);
		return(
			

			<div>
				<div>
					<label>
						          Land Success
						          <input
						            name="landSuccess"
						            type="checkbox"
						            checked={this.state.filters.land_success}
						            onChange={event => {this.handleLandSuccess()}} />
						        </label>
				</div>
				{this.renderTable()}
			</div>
		);
	}
}

export default DataTable