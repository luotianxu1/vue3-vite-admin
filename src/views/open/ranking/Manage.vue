<template>
    <div class="main">
        <el-button @click="clear">清空排名</el-button>
        <el-select v-model="num" class="m-2" placeholder="Select" size="large">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value"
            />
        </el-select>
        <el-table :data="tableList" border stripe height="500" style="width: 100%; height: 100%">
            <el-table-column type="index" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="num" label="轮" />
            <el-table-column prop="song" label="歌曲名称" />
            <el-table-column prop="value" label="得分">
                <template #default="scope">
                    <el-input-number
                        v-model="scope.row.value"
                        :precision="2"
                        :step="0.1"
                        :min="0"
                        :max="100"
                    />
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button :disabled="scope.row.click" @click="addItem(scope.row)">
                        添加
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
    import { ElMessage } from 'element-plus'

    const addItem = (item) => {
        if (!item.value) {
            return ElMessage.error('请输入成绩！')
        }
        item.click = true
        localStorage.setItem('newItem', JSON.stringify(item))
        ElMessage.success('添加成功！')
    }

    const num = ref(1)

    let tableList = computed(() => {
        return tableData.value.filter((item) => item.num === num.value)
    })

    const clear = () => {
        localStorage.setItem('flag', '0')
        localStorage.removeItem('newItem')
        setTimeout(() => {
            localStorage.setItem('flag', '1')
        }, 1000)
    }

    const options = [
        {
            value: 1,
            name: '第一轮'
        },
        {
            value: 2,
            name: '第二轮'
        },
        {
            value: 3,
            name: '第三轮'
        }
    ]

    const tableData: any = ref([
        {
            index: 1,
            name: '薛健',
            num: '1',
            song: '我和我的祖国',
            click: false,
            value: null
        },
        {
            index: 2,
            name: '王浩瑜',
            num: '1',
            song: '理想',
            click: false,
            value: null
        },
        {
            index: 3,
            name: '梅士虎',
            num: '1',
            song: '五星红旗',
            click: false,
            value: null
        },
        {
            index: 4,
            name: '于明鹤',
            num: '1',
            song: '奔跑',
            click: false,
            value: null
        },
        {
            index: 5,
            name: '吕明明',
            num: '1',
            song: '不忘初心',
            click: false,
            value: null
        },
        {
            index: 6,
            name: '蒋佳明',
            num: '1',
            song: '你的答案',
            click: false,
            value: null
        },
        {
            index: 7,
            name: '杜竞',
            num: '1',
            song: '有我',
            click: false,
            value: null
        },
        {
            index: 8,
            name: '马野',
            num: '1',
            song: '在那桃花盛开的地方',
            click: false,
            value: null
        },
        {
            index: 9,
            name: '万莉莉',
            num: '1',
            song: '映山红',
            click: false,
            value: null
        },
        {
            index: 10,
            name: '叶宏博',
            num: '1',
            song: '我的中国心',
            click: false,
            value: null
        },
        {
            index: 11,
            name: '郝义昌',
            num: '1',
            song: '追梦赤子心',
            click: false,
            value: null
        },
        {
            index: 12,
            name: '童琦',
            num: '1',
            song: '如愿',
            click: false,
            value: null
        },

        {
            index: 13,
            name: '薛健',
            num: '2',
            song: '慢慢喜欢你',
            click: false,
            value: null
        },
        {
            index: 14,
            name: '王浩瑜',
            num: '2',
            song: '东北民谣',
            click: false,
            value: null
        },
        {
            index: 15,
            name: '梅士虎',
            num: '2',
            song: '你的答案',
            click: false,
            value: null
        },
        {
            index: 16,
            name: '于明鹤',
            num: '2',
            song: '说谎',
            click: false,
            value: null
        },
        {
            index: 17,
            name: '吕明明',
            num: '2',
            song: '日不落',
            click: false,
            value: null
        },
        {
            index: 18,
            name: '蒋佳明',
            num: '2',
            song: '修炼爱情',
            click: false,
            value: null
        },
        {
            index: 19,
            name: '杜竞',
            num: '2',
            song: '我的未来式',
            click: false,
            value: null
        },
        {
            index: 20,
            name: '马野',
            num: '2',
            song: '找个好人就嫁了吧',
            click: false,
            value: null
        },
        {
            index: 21,
            name: '万莉莉',
            num: '2',
            song: '这世界这么多人',
            click: false,
            value: null
        },
        {
            index: 22,
            name: '叶宏博',
            num: '2',
            song: '海阔天空',
            click: false,
            value: null
        },
        {
            index: 23,
            name: '郝义昌',
            num: '2',
            song: '江山无限',
            click: false,
            value: null
        },
        {
            index: 24,
            name: '童琦',
            num: '2',
            song: '没那么简单',
            click: false,
            value: null
        },

        {
            index: 25,
            name: '薛健',
            num: '3',
            song: '奇妙能力歌',
            click: false,
            value: null
        },
        {
            index: 26,
            name: '王浩瑜',
            num: '3',
            song: '游',
            click: false,
            value: null
        },
        {
            index: 27,
            name: '梅士虎',
            num: '3',
            song: '世间美好与你环环相扣',
            click: false,
            value: null
        },
        {
            index: 28,
            name: '于明鹤',
            num: '3',
            song: '流浪记',
            click: false,
            value: null
        },
        {
            index: 29,
            name: '吕明明',
            num: '3',
            song: '你曾是少年',
            click: false,
            value: null
        },
        {
            index: 30,
            name: '蒋佳明',
            num: '3',
            song: '爱与希望',
            click: false,
            value: null
        },
        {
            index: 31,
            name: '杜竞',
            num: '3',
            song: '如愿',
            click: false,
            value: null
        },
        {
            index: 32,
            name: '马野',
            num: '3',
            song: '西海情歌',
            click: false,
            value: null
        },
        {
            index: 33,
            name: '万莉莉',
            num: '3',
            song: '你的微笑',
            click: false,
            value: null
        },
        {
            index: 34,
            name: '叶宏博',
            num: '3',
            song: '翅膀',
            click: false,
            value: null
        },
        {
            index: 35,
            name: '郝义昌',
            num: '3',
            song: '鸿雁',
            click: false,
            value: null
        },
        {
            index: 36,
            name: '童琦',
            num: '3',
            song: '遇见',
            click: false,
            value: null
        }
    ])
</script>

<style scoped lang="scss">
    .main {
        padding: 20px;
        overflow: auto;
        height: 100%;
    }
</style>
