import React from 'react';
import {render} from 'react-dom';

const submitRsvp = e => {
	console.log(this.state);
}

class Dashboard extends React.Component {
	render() {
		return (
			<div id='dashboard'>
				<h1>Avery + Wes Wedding</h1>
				<RsvpForm />
			</div>
		);
	}
};

class RsvpForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {name: "", num: ""};
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeNum = this.handleChangeNum.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeName(e) {
		this.setState({name: e.target.value});
	}

	handleChangeNum(e) {
		this.setState({num: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("Name: " + this.state.name, "Num attending: " + this.state.num);
		alert('Hey not so fast. Come back in a day or two cause Wes is not as fast as you are. He still has to finish writing a little bit of code before Wes and Avery can know if you are coming to their awesome wedding! If you are really bored or have more money than you know what to do with, here is a link to our registry. https://registry.theknot.com/avery-edwards-wes-white-february-2017-tx/16385113')
	}

	render() {
		return (
			<div id='rsvpForm'>
				<form>
					<label>Name:</label>
					<input type="text" onChange={this.handleChangeName}/><br></br>
					<label>Will you be able to attend?</label>
					<select>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select><br></br>
					<label>Number of guests attending:</label>
					<input type="text" onChange={this.handleChangeNum}/><br></br>
					<button onClick={this.handleSubmit}>Submit</button>
				</form>
			</div>
		);
	}
};

render(
	<Dashboard />,
	document.getElementById('app')
);
