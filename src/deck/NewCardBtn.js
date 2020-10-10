import React, { Component } from "react";

export default class NewCardBtn extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.handleCreate = this.handleCreate.bind(this);
	}

	handleCreate(e) {
		this.props.create();
	}

	render() {
		return (
			<div>
                
				<button onClick={this.handleCreate} disabled={this.props.disabled}>
					New Card from!
				</button>
                {this.props.disabled && <h1>There are no cards more!!</h1>} 
			</div>
		);
	}
}
