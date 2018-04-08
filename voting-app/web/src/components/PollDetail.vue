<template>
  <div class="app-container">
      <loader :isLoading="isLoading"></loader>
      <br>
      <div class="container" v-if="poll != null">
		<button class="app-btn app-btn-delete" style="margin: 0 auto; float: right;" v-if="isAuthor" @click="deletePoll" :disabled="isLoading">Delete poll</button>
        <p id="lbl-question">{{poll.question}}</p>
        <div class="poll-details">
        <p class="text-small text-secondary">by {{poll.author}}</p>
        <div class="line-vertical"></div>
        <p class="text-small text-secondary">created on {{getDate(poll.date)}}</p>
        </div>

        <div id="poll-options-container">
            <ul class="list-group">
                <poll-option v-for="(option, index) in options" :key="index" :index="index" :option="option" :pollId="poll._id" :totalVotes="totalVotes"></poll-option>
            </ul>
        </div>

        <div id="chart-container">
            <canvas id="vote-chart"></canvas>
        </div>
      </div>
  </div>
</template>

<script>
import Loader from './Loader';
import PollOption from './PollOption';
import axios from 'axios';
import Chart from 'chart.js';
import eventbus from '../eventbus';

export default {
	data() {
		return {
			isLoading: true,
			poll: null
		};
	},
	computed: {
		polls() {
			return this.$store.getters.polls;
		},
		isAuthor() {
			return this.$store.getters.email === this.poll.author;
		},
		options() {
			return this.$store.getters.options;
		},
		totalVotes() {
			return this.$store.getters.totalVotes;
		}
	},
	watch: {
		polls() {
			this.ready();
		},
		totalVotes() {
			this.showChart();
		}
	},
	methods: {
		ready() {
			if (this.polls.length > 0) {
				let index = this.$route.params.id;
				this.poll = this.polls[index];
				let pollId = this.poll._id;

				this.getPollOptions(pollId);
			}
		},
		async getPollOptions(pollId) {
			try {
				let response = await axios.get(`/polls/${pollId}/options`);
				this.$store.dispatch('setOptions', response.data);

				const totalVotes = this.options.reduce(
					(prev, next) => prev.votes + next.votes
				);
				console.log('Total votes: ', this.options[1].votes, totalVotes);
				this.$store.dispatch('setTotalVotes', totalVotes);

				this.showChart();
			} catch (error) {
				console.log(error);
			}
		},
		getDate(millis) {
			let date = new Date(millis);
			return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
		},
		showChart() {
			let ctx = document.getElementById('vote-chart');
			new Chart(ctx, {
				type: 'doughnut',
				data: {
					datasets: [
						{
							label: '% of votes',
							data: this.options.map(option => {
								return option.votes;
							}),
							backgroundColor: this.getPollColors()
						}
					],
					labels: this.getPollLabels()
				}
			});

			this.isLoading = false;
		},
		getPollLabels() {
			let result = [];
			for (let i = 0; i < this.options.length; i++) {
				result.push(`${this.options[i].optionText}`);
			}

			return result;
		},
		getPollColors() {
			return ['teal', 'tomato', 'lawngreen', 'indianred', 'darkgreen', 'slate'];
		},
		async deletePoll() {
			this.isLoading = true;
			try {
				let response = await axios.delete(`/polls/${this.poll._id}`);

				eventbus.showToast('Successfully deleted poll.', 'success');
				this.$router.go(-1);
			} catch (error) {
				console.log(error);
				eventbus.showToast('Deleting poll failed. Please retry.', 'error');
			}
			this.isLoading = false;
		}
	},
	activated() {
		this.ready();
		this.isLoading = true;
	},
	deactivated() {
		this.poll = null;
		this.$store.dispatch('setOptions', []);
		this.$store.dispatch('setTotalVotes', 0);
	},
	components: { loader: Loader, 'poll-option': PollOption }
};
</script>

<style>
#chart-container {
	margin-top: 40px;
	margin-bottom: 40px;
}
.app-btn-delete {
	background-color: tomato;
}
</style>
