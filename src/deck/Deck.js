import React, { Component } from "react";
import Card from "./Card";
import NewCardBtn from "./NewCardBtn";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default class Deck extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: "",
			cards: [],
			nCards: 0,
			nVisibleCards: 0,
			disabled: false,
		};
		this.create = this.create.bind(this);
	}
	async componentDidMount() {
		const response = await axios.get(
			"https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
		);
		const id = response.data.deck_id;
		const remaining = response.data.remaining;
		this.setState({ id: id, remaining: remaining });
	}
	async create() {
		try {
			const cards = [];
			const card = axios.get(
				`https://deckofcardsapi.com/api/deck/${this.state.id}/draw/?count=2`
			);

			for (let index = 0; index < 2; index++) {
				const cardResponse = (await card).data.cards[index];
				cards[index] = {
					image: cardResponse.images.png,
					card: `${cardResponse.value} ${cardResponse.suit}`,
					rotate: Math.floor(Math.random() * 40),
					id: uuidv4(),
				};
			}

			this.setState((st) => {
				return {
					cards: [...st.cards, ...cards],
					nCards: st.nCards + 2,
					nVisibleCards: st.nVisibleCards + 1,
				};
			});
		} catch (error) {
			this.setState((st) => {
				if (st.nCards === st.nVisibleCards) {
					return {
						disabled: true,
					};
				} else {
					return {
						nVisibleCards: st.nVisibleCards + 1,
					};
				}
			});
		}
	}

	render() {
		return (
			<div>
				Deck is here!
				<NewCardBtn create={this.create} disabled={this.state.disabled} />
				{this.state.cards.slice(0, this.state.nVisibleCards).map((card) => (
					<Card
						alt={card.card}
						src={card.image}
						rotate={card.rotate}
						id={card.id}
						key={card.id}
					/>
				))}
			</div>
		);
	}
}
