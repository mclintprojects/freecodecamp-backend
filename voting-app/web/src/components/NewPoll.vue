<template>
  <div class="app-container">
      <div class="container">
          <label for="name" class="app-lbl">Poll question</label>
          <input name="question" type="text" class="app-input" placeholder="Poll question" v-model="question" />
            <br><br>
          <label  class="app-lbl">Options</label>
          <p class="text-small">Add atleast 2 options</p>
          <ul class="list-group">
              <li v-for="(placeholder, index) in placeholders" :key="index">
                  <div class="option-tb">
                    <input type="text" class="app-input" placeholder="Poll option" />
                    <button class="app-btn" v-if="isRemovable(index)" @click="removeOption(index)">Remove</button>
                  </div>
              </li>
          </ul>
          <button class="app-btn" @click="addNewOption">Add new option</button>
      </div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			question: '',
			placeholders: [0, 0],
			options: []
		};
	},
	methods: {
		isRemovable(index) {
			if (index == 0 || index == 1) return false;

			return true;
		},
		addNewOption() {
			console.log('pushing option');
			this.placeholders.push(0);
		},
		removeOption(index) {
			this.placeholders.splice(index, 1);
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
