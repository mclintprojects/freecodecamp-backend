<template>
  <div id="app">
    <navbar></navbar>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import axios from 'axios';

export default {
	name: 'App',
	components: { navbar: Navbar },
	created() {
		this.getPolls();
		this.$store.dispatch('loginLocal');
	},
	methods: {
		getPolls() {
			this.$store.dispatch('getPolls');
		}
	}
};
</script>

<style>
:root {
	--primary: #2f3b41;
	--accent: #141414;
	--primaryText: rgba(255, 255, 255, 0.8);
	--secondaryText: rgba(255, 255, 255, 0.5);
}
body {
	background-color: var(--primary);
	font-family: 'IBM Plex Sans', sans-serif;
	color: var(--primaryText);
}

.navbar {
	background-color: white;
}

.app-container {
	margin-top: 70px;
}

.app-btn {
	background-color: #181f22;
	border: 1px solid transparent;
	border-radius: 5px;
	color: white;
	padding: 8px;
	margin: 0 auto;
}

.app-btn:hover {
	background-color: #20282c;
}

.app-btn:disabled {
	background-color: #4a5f68;
	cursor: not-allowed;
}

.app-btn-tweet {
	background-color: skyblue;
}

a:hover {
	text-decoration: none;
	cursor: pointer;
}

.poll-details {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}

#lbl-question {
	font-size: 30px;
	font-weight: bold;
}

.text-small {
	font-size: 12px;
}

.text-secondary {
	color: var(--secondaryText);
}

.line-vertical {
	border: 2px solid transparent;
	border-right-color: var(--primaryText);
	height: 16px;
	margin: 0px 8px 0px 8px;
}

.empty-state {
	position: fixed;
	top: 50%;
	left: 46%;
	font-size: 18px;
}

@media screen and (max-width: 568px) {
	.empty-state {
		left: 30%;
	}
}
</style>
