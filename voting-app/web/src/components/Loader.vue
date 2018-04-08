<template>
  <div>
      <img v-if="isLoading" id="loadingCircle" src="https://samherbert.net/svg-loaders/svg-loaders/oval.svg" />
  </div>
</template>

<script>
export default {
	props: ['isLoading']
};
</script>

<style>
#loadingCircle {
	width: 36px;
	position: absolute;
	left: 50%;
	top: 50%;
}
</style>
