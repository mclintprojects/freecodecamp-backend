<template>
  <div class="app-container">
      <loader :isLoading="isLoading"></loader>
      <br>
      <div class="container" v-if="poll != null">
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
			poll: null,
			options: [],
			totalVotes: 0
		};
	},
	computed: {
		polls() {
			return this.$store.getters.polls;
		}
	},
	watch: {
		polls() {
			this.ready();
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
				this.options = response.data;

				this.totalVotes = this.options.reduce(
					(prev, next) => prev.votes + next.votes
				);
				this.isLoading = false;

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
		}
	},
	activated() {
		this.ready();

		eventbus.$on('optionVotedFor', index => {
			console.log(this.options);
			let option = this.options[index];
			option.votes++;
			this.showChart();
		});

		eventbus.$on('optionVotingFailed', index => {
			let option = this.options[index];
			option.votes--;
			this.showChart();
		});
	},
	components: { loader: Loader, 'poll-option': PollOption }
};
</script>

<style>
#chart-container {
	margin-top: 40px;
	margin-bottom: 40px;
}
</style>
