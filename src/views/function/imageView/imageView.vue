<template>
	<div>
		<input type="file" @change="handleFileChange" />
		<img ref="imgRef" class="image" />
	</div>
</template>
<script lang="ts" setup>
const imgRef = ref()
const handleFileChange = (e: Event) => {
	const currentTarget = e.target as HTMLInputElement
	if (currentTarget.files) {
		let file = currentTarget.files[0]
		let fileRead = new FileReader()
		fileRead.onload = () => {
			if (imgRef.value) {
				imgRef.value.src = fileRead.result
			}
		}
		fileRead.readAsDataURL(file)
	}
}
</script>
<style lang="scss" scoped>
.image {
	width: 100px;
	height: 100px;
}
</style>
