<template>
  <div class="app-container">
      <div class="container">
        <loader :isLoading="isLoading"></loader>
        <label for="name" class="app-lbl">Poll question</label>
        <input name="question" type="text" class="app-input" placeholder="Poll question" v-model="question" />
        <br><br>
        <div class="row">
            <div class="col-xs-8">
                <label class="app-lbl">Options</label>
                <p class="text-small">Add atleast 2 options</p>
            </div>
            <div class="col-xs-4">
                <button id="btn-add-option" class="app-btn" @click="addNewOption">Add new option</button>
            </div>
        </div>
        <ul class="list-group">
            <li v-for="(placeholder, index) in placeholders" :key="index">
                <div class="option-tb">
                <input type="text" class="app-input" placeholder="Poll option" v-model="options[index]"/>
                <button class="app-btn" v-if="isRemovable(index)" @click="removeOption(index)">Remove</button>
                </div>
            </li>
        </ul>
        <button class="app-btn" @click="createPoll">Create poll</button>
      </div>
  </div>
</template>

<script>
import Loader from './Loader';

export default {
	data() {
		return {
			question: '',
			placeholders: [0, 0],
			options: ['', '']
		};
	},
	components: { loader: Loader },
	computed: {
		isLoading() {
			return this.$store.getters.isLoading;
		}
	},
	methods: {
		isRemovable(index) {
			if (index == 0 || index == 1) return false;

			return true;
		},
		addNewOption() {
			console.log('pushing option');
			this.options.push('');
			this.placeholders.push(0);
		},
		removeOption(index) {
			this.placeholders.splice(index, 1);
			this.options.splice(index, 1);
		}
	}
};
</script>

<style>
.app-input {
	width: 100%;
	background-color: rgba(255, 255, 255, 0.3);
	border: 0px solid transparent;
	height: 40px;
	padding: 8px;
	border-radius: 5px;
}

label {
	margin: 0;
	padding: 0;
}

#btn-add-option {
	margin: 0 auto;
	float: right;
}

.list-group > li {
	list-style-type: none;
	margin-bottom: 16px;
}

.app-lbl {
	font-size: 16px;
}

.option-tb {
	display: flex;
	flex-direction: row;
}

.option-tb > .app-btn {
	display: none;
}

.option-tb:hover > .app-btn {
	display: initial;
}
</style>
