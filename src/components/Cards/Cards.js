import React from 'react';
import api from '../../services/api';

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
	state = {
		repos: [],
	}
	
	async UNSAFE_componentWillMount() {
		const response = await APIResponse();
		let repos = []
		
		for (let i = 0; i < response.length; i++) {
			if (response[i] !== true) {
				repos.push(response[i]);
			}
		}
	
		this.setState({ repos: repos });
	}
	
	render() {
		const { repos } = this.state;

		return (
			<section>
				{
					repos.map(repo => {
						return (
							<div className="card" id="card" key={repo.id}>
								<p className="Repo-name">{repo.name}</p>
								<p className="Repo-desc">{repo.description}</p>
								<a href={repo.url}>Visit</a>
							</div>
						)
					})
				}
    		</section>
		)
	}
}

export default Cards;