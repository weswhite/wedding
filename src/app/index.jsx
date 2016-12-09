import React from 'react';
import {render} from 'react-dom';
import Request from 'superagent'
import { Router, Route, browserHistory, Link } from 'react-router';
import toastr from 'toastr';

const submitRsvp = e => {
	console.log(this.state);
}

class Dashboard extends React.Component {
	render() {
		return (
			<div id='dashboard'>
				<h1>The White Wedding</h1>
				<RsvpForm />
			</div>
		);
	}
};

class RsvpForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {name: "", numberGuest: "", attending: "yes"};
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeNum = this.handleChangeNum.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeName(e) {
		this.setState({name: e.target.value});
	}

	handleChangeNum(e) {
		this.setState({numberGuest: e.target.value});
	}

	handleSelectChange(e){
		this.setState({attending: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		if(this.state.name === 'admin'){
			browserHistory.push('/rsvps');
		}
		else{
			let newRsvp = {
				name: this.state.name,
				attending: this.state.attending,
				numberGuest: this.state.numberGuest
			};

			let stringNewRsvp = JSON.stringify(newRsvp);

			Request.post('/')
	    .set('Content-Type', 'application/json')
	    .send(stringNewRsvp)
	    .end(function(err, res){
				if(res.status === 201){
					toastr.success('Success!');
				}else{
					toastr.error('Sorry about that!', 'Think you could try again?');
				}
			})
		}
		this.setState({name: "", numberGuest: "", attending: "yes"});
	}

	render() {
		return (
			<div id='rsvpForm'>
				<form>
					<label>Name:</label>
					<input type="text" value={this.state.name} onChange={this.handleChangeName}/><br></br>
					<label>Will you be able to attend?</label>
					<select value={this.state.attending} onChange={this.handleSelectChange}>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select><br></br>
					<label>Number of guests attending:</label>
					<input type="text" value={this.state.numberGuest} onChange={this.handleChangeNum}/><br></br>
					<button className="button-primary" onClick={this.handleSubmit}>Submit</button>
					<button className="button"><a href="https://registry.theknot.com/avery-edwards-wes-white-february-2017-tx/16385113" target="_blank">View Registry</a></button>
				</form>
			</div>
		);
	}
};

class Rsvps extends React.Component {
	constructor(){
		super();
		this.state = {rsvps: []};
		this.callback = this.callback.bind(this);
	}
	componentWillMount(){
		Request.get('/rsvps')
		.end(this.callback);
	}
	callback(err, res){
		let response = JSON.parse(res.text);
		var newState = {};
		newState["rsvps"] = response;
		if(res.status === 200){
			this.setState(newState);
		}
	}
	render() {
		var rsvps = this.state.rsvps.map((rsvp) => {
	      return <tr key={rsvp._id}>
	        <td>{rsvp.name}</td>
	        <td>{rsvp.attending}</td>
	        <td>{rsvp.numberGuest}</td>
	        <td>{rsvp.createDate}</td>
	      </tr>
	    });
	    return <div>
				<h1>RSVPS</h1>
			<table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Attending?</th>
            <th>Number Attending</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rsvps}
        </tbody>
      </table>
		</div>
	}
};

render(
	<Router history={ browserHistory }>
	  <Route path="/" component={Dashboard}></Route>
	  <Route path="/rsvps" component={Rsvps}></Route>
  </Router>,
	document.getElementById('app')
);
