<template>
    <div class="container">
		<loader :isLoading="isLoading"></loader>
        <div class="form-group">
            <label for="emailTb ">Email address</label>
            <input v-model="formData.email" id="emailTb" type="email" class="form-control" placeholder="Enter email">
        </div>
        <div class="form-group">
            <label for="passwordTb ">Password</label>
            <input v-model="formData.password" type="password" class="form-control" id="passwordTb" placeholder="Password">
        </div>
        <button @click="registerUser" class="appBtn" :disabled="this.$store.getters.isLoading">Sign up</button>
    </div>
</template>

<script>
import eventbus from '../eventbus';

export default {
	data() {
		return {
			formData: {
				email: '',
				password: ''
			}
		};
	},
	computed: {
		isLoading() {
			return this.$store.getters.isLoading;
		}
	},
	methods: {
		registerUser() {
			this.$store.dispatch('setLoading', true);
			if (this.formData.email.length > 0 && this.formData.password.length > 0) {
				this.$store.dispatch('register', this.formData);
			} else {
				eventbus.showToast('One or more required fields is empty.', 'error');
			}
		}
	},
	activated() {
		eventbus.$on('registration-success', message => {
			eventbus.showToast(message, 'success');
			this.$router.go(-1);
		});

		eventbus.$on('registration-failure', message => {
			eventbus.showToast(message, 'error');
		});
	}
};
</script>

<style>
.form-control {
	border: solid 0px transparent;
	border-radius: 2px;
	height: 40px;
	font-weight: normal;
}

.form-control:focus {
	box-shadow: 0px 0px 0px transparent;
}
</style>
