<template>
    <div>
        <div id="option-container" @click="voteForOption">
            <div class="option-progress" :style="{width: getPercentage()}"></div>

            <div id="option-details">
                <div class="row">
                    <div class="col-xs-11">
                        <p id="lbl-option-text">{{option.optionText}}</p>
                    </div>
                    <div class="col-xs-1">
                        <p id="lbl-option-votes">{{getPercentage()}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import eventbus from '../eventbus';

export default {
	props: ['option', 'pollId', 'totalVotes', 'index'],
	methods: {
		getPercentage() {
			return `${this.option.votes / this.totalVotes * 100}%`;
		},
		async voteForOption() {
			try {
				eventbus.$emit('optionVotedFor', this.index);
				this.getPercentage();

				let response = await axios.post(
					`/polls/${this.pollId}/options/${this.option._id}/vote`,
					{}
				);

				eventbus.showToast('Vote successful', 'success');
			} catch (error) {
				eventbus.showToast(error.response.data.error, 'error');
				eventbus.$emit('optionVotingFailed', this.index);
			}
		}
	}
};
</script>

<style>
#option-container {
	border: 0px solid transparent;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 5px;
	margin-top: 16px;
}

#option-container:hover {
	border-radius: 0px 5px 5px 0px;
	border-left-width: 10px;
	border-left-color: white;
	cursor: pointer;
}

.option-progress {
	height: 10px;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 5px 5px 5px 0px;
	border-left-width: 10px;
	width: 100%;
}

#option-details {
	padding: 16px;
}

#lbl-option-text {
	margin: 0;
	font-size: 14px;
	font-weight: bold;
}

#lbl-option-votes {
	color: var(--secondaryText);
	font-size: 14px;
	margin: 0;
	margin-top: 4px;
	text-align: right;
}
</style>
