<template>
    <div class="app-container">
		<loader :isLoading="isLoading"></loader>
		<div class="container">
			<div class="form-group ">
				<label for="emailTb ">Email address</label>
				<input v-model="formData.email" id="emailTb" type="email" class="form-control " placeholder="Enter email ">
        	</div>
			<div class="form-group ">
				<label for="passwordTb">Password</label>
				<input v-model="formData.password" type="password" class="form-control " id="passwordTb" placeholder="Password ">
			</div>
			<button @click="loginUser" class="app-btn" :disabled="this.$store.getters.isLoading">Login</button>
		</div>
    </div>
</template>

<script>
import eventbus from '../eventbus';
import Loader from './Loader';

export default {
	data() {
		return {
			formData: {
				email: '',
				password: ''
			}
		};
	},
	components: { loader: Loader },
	computed: {
		isLoading() {
			return this.$store.getters.isLoading;
		}
	},
	methods: {
		loginUser() {
			if (this.formData.email.length > 0 && this.formData.password.length > 0) {
				this.$store.dispatch('login', this.formData);
			} else {
				eventbus.showToast('One or more required fields is empty.', 'error');
				this.$store.dispatch('setLoading', false);
			}
		}
	},
	activated() {
		eventbus.$on('login-success', message => {
			eventbus.showToast(message, 'success');
			this.$router.go(-1);
		});

		eventbus.$on('login-failure', message => {
			eventbus.showToast(message, 'error');
		});
	}
};
</script>

<style scoped>
label {
	color: var(--primaryText);
	font-family: 'Roboto', sans-serif;
}

.form-control {
	border: solid 0px transparent;
	border-radius: 2px;
	height: 40px;
	font-weight: normal;
}

.form-control:focus {
	box-shadow: 0px 0px 0px transparent;
}

#loadingCircle {
	position: initial;
	margin-left: 20px;
}
</style>

