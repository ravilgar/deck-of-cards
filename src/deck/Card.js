import React, { Component } from "react";
import "./Card.css";

export default class Card extends Component {
	render() {
		return (
			<div
				className="Card"
				style={{ transform: `rotate(${this.props.rotate}deg)` }}
			>
				<img src={this.props.src} alt={this.props.alt} />
			</div>
		);
	}
}
