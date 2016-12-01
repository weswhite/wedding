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
		alert('Hey not so fast. Come back in a day or too cause Wes is not as fast as you are. He still has to finish writing a little bit of code before Wes and Avery can know if you are coming to their awesome wedding! (Sorry) 8)')
	}

	render() {
		return (
			<div id='rsvpForm'>
				<form>
					<label>Name:</label>
					<input type="text" onChange={this.handleChangeName}/><br></br>
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
	document.getElementById('container')
);
