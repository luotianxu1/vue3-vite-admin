<template>
    <div class="main">
        <div class="calender">
            <div class="left">
                <div class="topBar">
                    <el-date-picker
                        v-model="year"
                        type="year"
                        placeholder="年份"
                        size="default"
                        style="width: 96px"
                        value-format="YYYY"
                    ></el-date-picker>
                    <el-select
                        v-model="month"
                        placeholder="月份"
                        size="default"
                        class="one"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-button size="default" class="back" @click="back">
                        返回今天
                    </el-button>
                </div>
                <table class="dateWrap">
                    <thead>
                        <tr>
                            <th>星期一</th>
                            <th>星期二</th>
                            <th>星期三</th>
                            <th>星期四</th>
                            <th>星期五</th>
                            <th>星期六</th>
                            <th>星期日</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dayArray" :key="index">
                            <td v-for="(day, key) in item" :key="key">
                                <div
                                    :class="{
                                        prevMonth: !day.cur,
                                        today: day.fullText === today,
                                        active: day.isSelect
                                    }"
                                    @click="changeDate(day)"
                                >
                                    <span>{{ day.text }}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="right">
                <p class="date">{{ year }}-{{ month }}-{{ day }}</p>
                <div class="day">{{ day }}</div>
                <div class="lunar">
                    <p>{{ dateInfo.lunar }}</p>
                    <p>
                        {{ dateInfo.lunarYear }} &nbsp;
                        {{ dateInfo.animalsYear }}
                    </p>
                </div>
                <ul class="holidayList">
                    <li v-for="(item, index) in dateInfo.history" :key="index">
                        {{ item.title }}
                    </li>
                </ul>
                <div class="suit">
                    <div class="default">
                        <dl>
                            <dt>宜</dt>
                            <dd
                                v-for="(item, index) in dateInfo.suit"
                                :key="index"
                            >
                                {{ item }}
                            </dd>
                        </dl>
                        <dl>
                            <dt>忌</dt>
                            <dd
                                v-for="(item, index) in dateInfo.avoid"
                                :key="index"
                            >
                                {{ item }}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        defineComponent,
        onMounted,
        reactive,
        ref,
        toRefs,
        watch
    } from 'vue'
    import { getDateInfoApi, getHistoryApi } from '@/api/demo/calendarApi'

    export default defineComponent({
        name: 'Calendar2',
        setup() {
            // 月份
            const options = [
                {
                    value: '1',
                    label: '1'
                },
                {
                    value: '2',
                    label: '2'
                },
                {
                    value: '3',
                    label: '3'
                },
                {
                    value: '4',
                    label: '4'
                },
                {
                    value: '5',
                    label: '5'
                },
                {
                    value: '6',
                    label: '6'
                },
                {
                    value: '7',
                    label: '7'
                },
                {
                    value: '8',
                    label: '8'
                },
                {
                    value: '9',
                    label: '9'
                },
                {
                    value: '10',
                    label: '10'
                },
                {
                    value: '11',
                    label: '11'
                },
                {
                    value: '12',
                    label: '12'
                }
            ]
            // 当天
            const date = reactive({
                year: '',
                month: '',
                day: ''
            })
            const today = ref('')
            // 选中的日期
            const chooseDate = ref(0)

            onMounted(() => {
                back()
            })

            watch(date, () => {
                getDate()
                getRenderData()
            })

            // 点击返回今天
            function back() {
                const curDate = new Date() // 当前日期对象
                date.year = curDate.getFullYear().toString()
                date.month = (curDate.getMonth() + 1).toString()
                date.day = curDate.getDate().toString()
                chooseDate.value = curDate.getDate()
                today.value = `${date.year}-${date.month}-${date.day}`
                // 取消选中
                dayArray.value.forEach((item) => {
                    item.forEach((day) => {
                        day.isSelect = false
                    })
                })
            }

            // 获取当天的信息
            const dateInfo = ref({})
            const getDate = async () => {
                const res = await getDateInfoApi({
                    date: date.year + '-' + date.month + '-' + date.day,
                    key: `${process.env.VUE_APP_API_CALENDAR}`
                })
                const res2 = await getHistoryApi({
                    date: date.month + '/' + date.day,
                    key: `${process.env.VUE_APP_API_TODAY}`
                })
                dateInfo.value = res.result.data
                dateInfo.value.suit = dateInfo.value.suit.split('.')
                dateInfo.value.avoid = dateInfo.value.avoid.split('.')
                dateInfo.value.history = res2.result
            }

            // 点击日期
            function changeDate(arr) {
                chooseDate.value = Number(arr.fullText.split('-')[2])
                if (!arr.cur) {
                    date.year = arr.fullText.split('-')[0]
                    date.month = arr.fullText.split('-')[1]
                    date.day = arr.fullText.split('-')[2]
                }
                dayArray.value.forEach((item) => {
                    item.forEach((day) => {
                        day.isSelect = day.fullText === arr.fullText
                    })
                })
            }

            // 生成日历
            const dayArray = ref([])
            function getRenderData() {
                dayArray.value = []
                const [nums, first] = getDayNum()
                let nextMonthDay = 1
                let prevMothDay = getLastMonthDays()
                let n = 1
                for (let i = 0; i < 6; i++) {
                    const temp = []
                    for (let j = 1; j <= 7; j++) {
                        if (i === 0) {
                            if (j < first) {
                                temp.unshift({
                                    isSelect: false,
                                    cur: false,
                                    text: prevMothDay,
                                    fullText: `${getLastDateString(
                                        Number(date.year),
                                        Number(date.month),
                                        Number(prevMothDay)
                                    )}`
                                })
                                prevMothDay = prevMothDay - 1
                            } else {
                                const obj = {
                                    isSelect: n === chooseDate.value,
                                    cur: true,
                                    text: n,
                                    fullText: `${date.year}-${date.month}-${n}`
                                }
                                n++
                                temp.push(obj)
                            }
                        } else {
                            const t = n++
                            if (t > nums) {
                                temp.push({
                                    isSelect: false,
                                    cur: false,
                                    text: nextMonthDay,
                                    fullText: `${getNextDateString(
                                        Number(date.year),
                                        Number(date.month),
                                        Number(nextMonthDay)
                                    )}`
                                })
                                nextMonthDay = nextMonthDay + 1
                            } else {
                                const obj = {
                                    isSelect: t === chooseDate.value,
                                    cur: true,
                                    text: t,
                                    fullText: `${date.year}-${date.month}-${t}`
                                }
                                temp.push(obj)
                            }
                        }
                    }
                    dayArray.value.push(temp)
                }
            }

            // 获取当前月份对应的天数和1号对应的周几
            function getDayNum() {
                const y = date.year
                const m = date.month
                return [
                    new Date(y, m, 0).getDate(),
                    new Date(y, m - 1, 1).getDay()
                ]
            }

            // 获取上个月又多少天
            function getLastMonthDays() {
                const y = date.year
                const m = date.month
                // 获取上个月1号的时间
                const lastDate = new Date(y, m - 1, 1)
                return new Date(
                    lastDate.getFullYear(),
                    lastDate.getMonth(),
                    0
                ).getDate()
            }

            // 上一天
            function getLastDateString(year, month, lastdate) {
                let newYear
                let newMonth
                if (month === 1) {
                    newYear = year - 1
                    newMonth = 12
                } else {
                    newYear = year
                    newMonth = month - 1
                }
                return `${newYear}-${newMonth}-${lastdate}`
            }

            // 下一天
            function getNextDateString(year, month, nextdate) {
                let newYear
                let newMonth
                if (month === 12) {
                    newYear = year + 1
                    newMonth = 1
                } else {
                    newYear = year
                    newMonth = month + 1
                }
                return `${newYear}-${newMonth}-${nextdate}`
            }

            return {
                ...toRefs(date),
                options,
                back,
                dateInfo,
                dayArray,
                today,
                changeDate
            }
        }
    })
</script>

<style scoped lang="scss">
    .main {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .calender {
        color: #333;
        width: 600px;
        height: 480px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        display: flex;

        .left {
            width: 480px;
            padding: 15px 15px 0 15px;
            border: 2px solid #4e6ef2;
            border-right: none;
            border-radius: 16px 0 0 16px;

            .topBar {
                display: flex;
                justify-content: space-between;
                padding: 0 30px;

                .one {
                    height: 30px;
                    width: 96px;
                    box-sizing: border-box;
                    border-radius: 6px;
                }

                .back {
                    height: 30px;
                    border-radius: 6px;
                    color: #333;
                }
            }

            .dateWrap {
                width: 100%;
                margin-top: 14px;
                border-spacing: 4px;

                th {
                    height: 36px;
                    font-weight: normal;
                }

                tr {
                    td:nth-child(n + 6) {
                        span:nth-child(1) {
                            color: #f73131;
                        }
                    }
                }

                td {
                    width: 60px;
                    height: 56px;

                    :nth-child(n + 6) {
                        :nth-child(1) {
                            color: #f73131;
                        }
                    }

                    div {
                        height: 100%;
                        border-radius: 6px;
                        border: 2px solid transparent;
                        cursor: pointer;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        position: relative;

                        &:hover {
                            border-color: #bdbfc8;
                        }

                        span:nth-child(1) {
                            font-size: 18px;
                            color: #000;
                        }

                        span:nth-child(2) {
                            font-size: 12px;
                        }
                    }

                    .active {
                        border-color: #bdbfc8;
                    }

                    .holiday {
                        background: #fde3e4;

                        &:hover {
                            border-color: #f38686;
                        }

                        &.active {
                            border-color: #f38686 !important;
                        }

                        &::before {
                            content: '休';
                            font-size: 12px;
                            line-height: 12px;
                            color: #f73131;
                            position: absolute;
                            left: 4px;
                            top: 4px;
                        }

                        span:nth-child(1) {
                            color: #f73131;
                        }
                    }

                    .weekday {
                        background: #f5f5f6;

                        &::before {
                            content: '班';
                            color: #626675;
                            font-size: 12px;
                            line-height: 12px;
                            position: absolute;
                            left: 4px;
                            top: 4px;
                        }

                        span:nth-child(1) {
                            color: #000 !important;
                        }
                    }

                    .prevMonth {
                        opacity: 0.4;
                    }

                    .nextMonth {
                        opacity: 0.4;
                    }

                    .today {
                        border-color: #4e6ef2 !important;
                    }
                }
            }
        }

        .right {
            width: 120px;
            background: #4e6ef2;
            border-radius: 0 16px 16px 0;
            color: #fff;
            text-align: center;

            .date {
                line-height: 45px;
            }

            .day {
                width: 80px;
                height: 80px;
                margin: 0 auto 6px;
                line-height: 80px;
                font-size: 52px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 12px;
            }

            .lunar {
                line-height: 21px;

                p {
                    margin-top: 5px;
                }
            }

            .holidayList {
                height: 85px;
                overflow: hidden;

                li {
                    width: 112px;
                    margin-top: 13px;
                    padding: 0 10px;
                    font-size: 12px;
                    line-height: 16px;
                    text-align: left;
                    position: relative;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                    &::before {
                        content: '';
                        width: 3px;
                        height: 3px;
                        background: #fff;
                        position: absolute;
                        left: 5px;
                        top: 8px;
                        border-radius: 50%;
                    }
                }
            }

            .suit {
                position: relative;
                background: rgba(255, 255, 255, 0.15);
                margin: 12px 0 -100px 0;
                padding: 12px 0 100px 0;

                &:hover {
                    .hover {
                        display: block;
                    }
                }

                .default {
                    display: flex;
                    justify-content: space-around;

                    dl {
                        max-height: 190px;
                        overflow: hidden;
                    }

                    dt {
                        font-size: 24px;
                    }

                    dd {
                        line-height: 20px;
                        font-size: 12px;
                    }
                }
            }
        }
    }

    .active {
        .left {
            border-color: #eb363b;
        }

        .right {
            background: #eb363b;
        }
    }
</style>
