<template>
  <div>
      <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button class="navbar-toggle" @click="collapse = !collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Voting app</a>
                </div>

                <div class="navbar-collapse" :class="{ 'collapse': collapse}">
                    <ul id="links" class="nav navbar-nav navbar-right">
                        <li v-if="userLoggedIn">
                            <a href="#">Welcome {{email}}!</a>
                        </li>
                        <li v-if="!userLoggedIn">
                            <router-link to="/login">Login</router-link>
                        </li>
                        <li v-if="!userLoggedIn">
                            <router-link to="/register">Signup</router-link>
                        </li>
                        <li v-if="userLoggedIn">
                            <a href="#" @click="logout">Log out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  </div>
</template>

<script>
export default {
	data() {
		return {
			collapse: true
		};
	},
	methods: {
		logout() {}
	},
	computed: {
		userLoggedIn() {
			return this.$store.getters.userLoggedIn;
		},
		email() {
			return this.$store.getters.email;
		}
	}
};
</script>

<style>

</style>
