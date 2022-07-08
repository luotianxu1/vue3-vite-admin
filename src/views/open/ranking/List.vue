<template>
    <div id="list-demo" class='main'>
        <div class="list-item title">
            <div>排名</div>
            <div>姓名</div>
            <div>歌曲名称</div>
            <div>得分</div>
        </div>
        <transition-group name="list" tag="p">
            <div v-for="(item, index) in list" :key="item" class="list-item font">
                <div>
                    {{ index + 1 }}
                </div>
                <div>
                    {{ item.name }}
                </div>
                <div>
                    {{ item.song }}
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

    onMounted(() => {
        const data = localStorage.getItem('list')
        if (data) {
            list.value = JSON.parse(data).sort((a, b) => {
                return b.value - a.value
            })
            oldValue = JSON.parse(localStorage.getItem('newItem') as string)
        }
    })

    let oldValue
    setInterval(() => {
        const res = localStorage.getItem('newItem')
        const data = JSON.parse(res as string)
        if (data && (!oldValue || data.index !== oldValue.index)) {
            oldValue = data
            const num = findIndex(data)
            list.value.splice(num, 0, data)
        }
    }, 1000)

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
</script>

<style scoped lang="scss">

    .main {
        width: 100%;
        height: 100%;
        background: url("src/assets/img/open/background.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        padding: 0 20%;
        padding-top: 1%;
        font-size: 3rem;
        overflow: auto;
    }

    .title {
       background-color: rgba(0,0,0,0)!important;
        font-family: XBS;
        font-size: 4rem;
    }

    .font {
        //font-family: FZCYJ;
    }

    .list-item {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 6rem;
        width: 100%;

        &:nth-child(odd) {
            background-color: rgba(34,194,220,0.5);
        }

        &:nth-child(even) {
            background-color: rgba(96,172,252,0.5);
        }

        >div {
            width: 20%;
            display: flex;
            align-items: center;
            justify-content: center;

            &:nth-child(3) {
                width: 40% !important;
            }
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
