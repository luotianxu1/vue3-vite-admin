<template>
    <div id="list-demo">
        <div class="list-item">
            <div>排名</div>
            <div>姓名</div>
            <div>得分</div>
        </div>
        <transition-group name="list" tag="p">
            <div v-for="(item, index) in list" :key="item" class="list-item">
                <div>
                    {{ index + 1 }}
                </div>
                <div>
                    {{ item.name }}
                </div>
                <div>
                    {{ item.value }}
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script lang="ts" setup>
    const list: any = ref([])

    let oldValue
    setInterval(() => {
				const res = localStorage.getItem('newItem')
		    const data = JSON.parse(res as string)
		    if (data && (!oldValue || data.value !== oldValue.value)) {
						oldValue = data
				    const num = findIndex(data)
				    console.log(num)
				    list.value.splice(num, 0, data)
		    }
    },1000)

		const findIndex = (data) => {
				const newList = JSON.parse(JSON.stringify(list.value))
				newList.push(data)
				newList.sort((a, b) => {
						return b.value - a.value
				})
				for (let i = 0; i < newList.length; i++) {
						if (data.value === newList[i].value) {
								return i
						}
				}
		}


    var state = false
    const play = () => {
		    state = !state
		    // console.log(state);

		    var width = window.innerWidth - 30;
		    var height = window.innerHeight - 30;

		    var timer = setInterval(function() {
				    if(state) {
						    div()
				    }else{
						    clearInterval(timer)
				    }
		    },500)
    }

    // play()


    const show = (w,h) => {    //烟花绽放
		    var color = ['#fc893c','#fc3c3c','#f1ee20','#20f17e','#20c7f1','#ffffff','#d58bf7','#f78bc7','#8b9bf7']
		    var index = Math.floor(Math.random() * 9 )

		    let i = 0
		    while(i<100) {    //一个烟花由100个烟花碎片组成
				    minbox(w,h,color[index])
				    i++
		    }
    }


    const div = () => {     //烟花上升
		    var width = window.innerWidth - 30;
		    var height = window.innerHeight - 30;
		    var h = Math.random()*500 + 50;
		    var w = Math.random()*width

		    var div = document.createElement("div")
		    div.style.height = '10px'
		    div.style.width = '10px'
		    div.style.borderRadius = '50%'
		    div.style.position = 'absolute'
		    div.style.top = height + 'px'
		    div.style.left = w + 'px'
		    div.style.background = '#ffffff'

		    document.querySelector('#app')?.appendChild(div);

		    var timer = setInterval(function() {
				    div.style.top = parseInt(div.style.top) - 30 + 'px';
				    if(parseInt(div.style.top) <= h) {
						    clearInterval(timer);
						    div.parentNode?.removeChild(div)
						    show(w,h)
				    }
		    },50)
    }

    const minbox = (i,j,color) => {    //烟花碎片定义
		    var minbox = document.createElement("div")
		    minbox.style.width = '5px'
		    minbox.style.height = '5px'
		    minbox.style.background = color
		    minbox.style.borderRadius = '50%'
		    minbox.style.position = 'absolute'
		    minbox.style.top = j + 'px'
		    minbox.style.left = i + 'px'
		    minbox.style.opacity = 1
		    document.querySelector('#app')?.appendChild(minbox);

		    var h = Math.random()*30 - 15;
		    var l = Math.random()*30 - 15;
		    var o = parseInt(Math.random()*10 + 5)/100;
		    var timer = setInterval(function() {
				    minbox.style.left = parseInt(minbox.style.left) + l + 'px';
				    minbox.style.top = parseInt(minbox.style.top) + h + 'px';
				    minbox.style.opacity = minbox.style.opacity - o
				    if(minbox.style.opacity <= 0) {
						    clearInterval(timer);
						    minbox.parentNode.removeChild(minbox)
				    }
		    },50)
    }
</script>

<style scoped lang="scss">
    .list-item {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-right: 10px;
        height: 60px;
        width: 100%;

        &:nth-child(odd) {
            background-color: pink;
        }

        &:nth-child(even) {
            background-color: blue;
        }
    }

    .list-enter-active,
    .list-leave-active {
        transition: all 1s ease;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateY(600px);
    }
</style>
