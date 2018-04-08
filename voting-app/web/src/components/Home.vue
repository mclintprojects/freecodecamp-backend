<template>
  <div class="app-container">
    <loader :isLoading="isLoading"></loader>
    <div class="banner">
      <h1>Voting app</h1>
      <p>Below are the polls hosted on this app</p>
			<button v-if="this.$store.getters.userLoggedIn" class="app-btn" @click="newPoll">New poll</button>
    </div>
    <div class="container">
      <ul class="list-group">
        <li class="poll-item" v-for="(poll, index) in polls" :key="index" @click="showDetail(index)">
          <p id="lbl-question">{{poll.question}}</p>
          <div class="poll-details">
            <p class="text-small text-secondary">by {{poll.author}}</p>
            <div class="line-vertical"></div>
            <p class="text-small text-secondary">created on {{getDate(poll.date)}}</p>
          </div>
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>
import Loader from './Loader';

export default {
	name: 'Home',
	components: { loader: Loader },
	data() {
		return {};
	},
	computed: {
		polls() {
			return this.$store.getters.polls;
		},
		isLoading() {
			return this.polls.length == 0;
		}
	},
	methods: {
		getDate(millis) {
			let date = new Date(millis);
			return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
		},
		showDetail(index) {
			this.$router.push({ name: 'poll-detail', params: { id: index } });
		},
		newPoll() {
			this.$router.push('new-poll');
		}
	}
};
</script>

<style>
.banner {
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.poll-item {
	margin: 0;
	border: 2px solid transparent;
	border-bottom-color: rgba(110, 110, 110, 0.54);
	list-style: none;
	color: var(--primaryText);
	margin-bottom: 16px;
}

.poll-item:hover {
	background-color: rgba(121, 121, 121, 0.1);
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
</style>
