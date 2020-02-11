import React, { Component } from 'react';
import './styles.css'

import { Cards } from '../../components'

export default class Home extends Component {
	componentDidMount() {
		let link = document.styleSheets['0'].cssRules

		for (let i = 0; i < link.length; i++) {
			if (link[i].selectorText === ".App-nav ul li a#home::after") {
				link[i].style.width = '70%';
			}
		}
	}

	render() {
		return (
			<main className="App-main">
				<div className="App-presenting side">
					<div className="presentation" id="name">
						<h1>João <span>Koritar</span></h1>
					</div>
					<div className="presentation" id="description">
						<h4><span>Web</span> developer</h4>
						<div className="bottom-shape"></div>
					</div>
				</div>
				<div className="App-cards side">
					<Cards />
				</div>
			</main>
		);
	}
}