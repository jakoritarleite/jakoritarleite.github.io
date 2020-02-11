import React, { useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from './hooks';
import { GlobalStyles } from './global';
import { theme } from './theme';
import Burger from './Burger';
import Menu from './Menu';
import FocusLock from 'react-focus-lock';
import './styles.css';
import { Link } from 'react-router-dom';

function Header() {
	const [open, setOpen] = useState(false);
	const node = useRef();
	const menuId = "main-menu";

	useOnClickOutside(node, () => setOpen(false));
	let width = window.innerWidth;

	if (width <= 700) {
		return (
			<ThemeProvider theme={theme}>
				<>
					<GlobalStyles />
					<div ref={node}>
						<FocusLock disabled={!open}>
							<Burger open={open} setOpen={setOpen} aria-controls={menuId} />
							<Menu open={open} setOpen={setOpen} id={menuId} />
						</FocusLock>
					</div>
				</>
			</ThemeProvider>
		);
	} else if (width >= 701) {
		return (
			<header className="App-header">
				<div className="App-logo">
					<h1>Koritar</h1>
				</div>
				<nav className="App-nav">
					<ul>
						<li>
							<Link id='home' to="/">Home</Link>
						</li>
						<li>
							<Link id='projects' to="/projects">Projects</Link>
						</li>
						<li>
							<Link id='skills' to="/skills">Skills</Link>
						</li>
						<li>
							<Link id='contact' to="/contact">Contact</Link>
						</li>
					</ul>
				</nav>
			</header>
		);
	}

	
}

export default Header;