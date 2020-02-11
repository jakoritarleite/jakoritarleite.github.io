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
					url: repo.html_url
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
			card = <div className="App-card" id="card" key={this.state.currentCardContent.id}>
						<div className="App-card-info">
							<div className="card-info">
								<h1 className="card-title">{this.state.currentCardContent.name}</h1>
								<h4 className="card-desc">{this.state.currentCardContent.description}</h4>
							</div>
							<div className="cbtn">
								<div className="card-button" >
									<a href={this.state.currentCardContent.url} target="_blank" rel="noopener noreferrer">Visit this repo</a>
								</div>
							</div>
						</div>
						<div className="App-card-logo">
							<ion-icon name="logo-github"></ion-icon>
						</div>
					</div>;
					
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

	handleClick(param, currentCard) {
		if (param === 'next' && currentCard < this.state.cardsLength - 1) {
		  currentCard += 1;
		} else if (param === 'prev' && currentCard > 0) {
		  currentCard -= 1;
		}
		this.setState({ currentCard, currentCardContent: this.state.repos[currentCard] });
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
		const { currentCard } = this.state;

		return (
			<div className="App-slider">
				<div className="App-slider-buttons">
					<button disabled={this.state.currentCard === this.state.cardsLength - 1} className="slider-btn btn-l button-animation" onClick={() => this.handleClick('next', currentCard)}><ion-icon name="chevron-back-circle"></ion-icon></button>
					<Cards currentCardContent = { this.state.currentCardContent }/>
					<button disabled={this.state.currentCard === 0} className="slider-btn btn-r button-animation" onClick={() => this.handleClick('prev', currentCard)}><ion-icon name="chevron-forward-circle"></ion-icon></button>
				</div>
			</div>
		);
	}
}

export default Display;