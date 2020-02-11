import React from 'react';
import api from '../../services/api';
import './styles.css';

async function APIResponse() {
	const response = await api.get('/repos');
	const repos = response.data.map(repo => {
		if (!repo.fork) {
			return {
					name: repo.name, 
					id: repo.id,
					description: repo.description,
					url: repo.url
				};
		} else {
			return true;
		}
	})

	return repos;
}

class Cards extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentCardContent: props.data,
		}
	}

	UNSAFE_componentWillReceiveProps(new_props) {
		this.setState({ currentCardContent: new_props.currentCardContent })
	}

	render() {
		let card;

		if(this.state.currentCardContent !== undefined) {
			card = <div className="card" id="card" key={this.state.currentCardContent.id}><p className="title">{this.state.currentCardContent.name}</p><p className="desc">{this.state.currentCardContent.description}</p><a href={this.state.currentCardContent.url}>Visit</a></div>;
		} else if (this.state.currentCardContent === undefined) {
			card = <p>Waiting for API response</p>;
		}

		return(
			<section>
				{card}
			</section>
		);
	}
}

class Display extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			repos: [],
			currentCard: 0,
			cardsLength: 0,
			currentCardContent: [],
		}
	}

	handleClick(param) {
		console.log('Button param: ', param)
		
		if (param === 'next' && this.state.currentCard < this.state.cardsLength) {
			this.setState({ currentCard: this.state.currentCard + 1 });
		} else if (param === 'prev' && this.state.currentCard > 0) {
			this.setState({ currentCard: this.state.currentCard - 1 });
		}

		this.setState({ currentCardContent: this.state.repos[this.state.currentCard] });

		console.log('Current Card: ', this.state.currentCard);
	}

	async UNSAFE_componentWillMount() {
		const response = await APIResponse();
		let repos = []
		
		for (let i = 0; i < response.length; i++) {
			if (response[i] !== true) {
				repos.push(response[i]);
			}
		}
	
		this.setState({ repos: repos, currentCard: 0, cardsLength: repos.length, currentCardContent: repos[0] });	
	}

	render() {
		return (
			<div className="cards-slider">
				<div className="slider-btns">
					<button className="slider-btn btn-l" onClick={() => this.handleClick('next')}>&lt;</button>
					<button className="slider-btn btn-r" onClick={() => this.handleClick('prev')}>&gt;</button>
				</div>
				<Cards currentCardContent = { this.state.currentCardContent }/>
			</div>
		);
	}
}

export default Display;