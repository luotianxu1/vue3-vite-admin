<template>
	<div class="page">
		<h1>输入框打字特效</h1>
		<div class="input-box">
			<input id="txtMessage" v-model="message" type="text" />
			<label for="txtMessage">
				<span v-for="(m, index) in message2" :key="index" class="input-animate">
					{{ m }}
				</span>
			</label>
		</div>
	</div>
</template>

<script lang="ts" setup>
const message = ref("")
watch(message, (newVal, oldVal) => {
	if (newVal.length !== oldVal.length) {
		setTimeout(() => {
			let inputBox = document.querySelector(".input-box") as HTMLElement
			inputBox.classList.add("shake")
			setTimeout(() => {
				inputBox.classList.remove("shake")
			}, 300)
		}, 200)
	}
})
const message2 = computed(() => {
	return message.value.split("")
})
</script>

<style lang="scss" scoped>
.page {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	overflow: hidden;
	background: linear-gradient(to bottom, #6a85b6, #bac8e0);
}

h1 {
	color: #fff;
	text-align: center;
}

.input-box {
	position: relative;

	input {
		opacity: 0;
	}

	input:focus ~ label {
		box-shadow: 0 5px 20px #6a85b6;
	}

	label {
		min-width: 100%;
		min-height: 40px;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
		padding: 0 10px;
		cursor: text;
		transition: 0.2s;
	}

	span {
		font-size: 16px;
		font-weight: bold;
	}
}

.input-animate {
	animation: print 0.2s ease-in-out;
}

.shake {
	animation: shake 0.2s ease-in-out;
}

@keyframes print {
	0% {
		position: absolute;
		transform: scale(50);
	}
	99% {
		position: absolute;
	}
	100% {
		position: relative;
	}
}

@keyframes shake {
	50% {
		transform: scale(0.95);
	}
}
</style>
