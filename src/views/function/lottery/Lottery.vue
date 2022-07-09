<template>
    <div class="lottery-container">
        <div class="lottery-layout">
            <div class="lottery-main">
                <div class="lottery-user">
                    <div class="lottery-tips">
                        {{ maxAwardTips }}（{{ rollLen }} / {{ maxNum }}）
                    </div>
                    <ul>
                        <li class="lottery-item">
                            <div class="lottery-roll">
                                <div class="roll-item"><span>学号</span></div>
                                <div class="roll-item"><span>姓名</span></div>
                            </div>
                        </li>
                        <li
                            v-for="(list, index) in rollIdArr"
                            :key="index"
                            class="lottery-item"
                        >
                            <div class="lottery-roll">
                                <div class="roll-item">
                                    <span>{{ list.Num }}</span>
                                </div>
                                <div class="roll-item">
                                    <span>{{ list.Name }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="lottery-btn">
                <div class="btn-func">
                    <button @click="beginRoll">开始</button>
                    <button @click="stopRoll">抽取</button>
                </div>
            </div>
            <div class="lottery-options">
                <el-form>
                    <el-form-item label="本轮奖项">
                        <el-select
                            v-model="maxAward"
                            placeholder="请选择抽取奖项"
                            @change="changeAward"
                        >
                            <el-option
                                v-for="item in awardOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                                <span style="float: left">
                                    {{ item.label }}
                                </span>
                                <span
                                    style="
                                        float: right;
                                        color: #8492a6;
                                        font-size: 13px;
                                    "
                                >
                                    {{ item.number }}
                                </span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单次抽取">
                        <el-select
                            v-model="maxTimes"
                            placeholder="请选择单次抽取人数"
                            @change="changeTimes"
                        >
                            <el-option
                                v-for="item in timesOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="js">
    export default {
        name: 'Lottery1',
        data() {
            return {
                timesOptions: [
                    {
                        value: '1',
                        label: '抽1人',
                        disabled: false
                    },
                    {
                        value: '2',
                        label: '抽2人',
                        disabled: false
                    },
                    {
                        value: '3',
                        label: '抽3人',
                        disabled: false
                    },
                    {
                        value: '4',
                        label: '抽4人',
                        disabled: false
                    },
                    {
                        value: '5',
                        label: '抽5人',
                        disabled: false
                    }
                ], // 单次抽取选项
                request: null, // indexDB对象
                awardOptions: [
                    {
                        value: '0',
                        label: '一等奖',
                        number: '5'
                    },
                    {
                        value: '1',
                        label: '二等奖',
                        number: '12'
                    },
                    {
                        value: '2',
                        label: '三等奖',
                        number: '20'
                    },
                    {
                        value: '3',
                        label: '参与奖',
                        number: '28'
                    }
                ], // 奖项
                userData: [
                    {
                        Name: '1', // 姓名
                        Num: '1', // 工号
                        Award: '0' // 奖项，'0'表示未中奖
                    },
                    {
                        Name: '2', // 姓名
                        Num: '2', // 工号
                        Award: '0' // 奖项，'0'表示未中奖
                    },
                    {
                        Name: '3', // 姓名
                        Num: '3', // 工号
                        Award: '0' // 奖项，'0'表示未中奖
                    },
                    {
                        Name: '4', // 姓名
                        Num: '4', // 工号
                        Award: '0' // 奖项，'0'表示未中奖
                    },
                    {
                        Name: '5', // 姓名
                        Num: '5', // 工号
                        Award: '0' // 奖项，'0'表示未中奖
                    },
                    {
                        Name: '6', // 姓名
                        Num: '6', // 工号
                        Award: '0' // 奖项，'0'表示未中奖
                    }
                ], // 总用户集合
                rollIdArr: [], // 当前抽中集合
                maxAwardTips: '请选择抽取奖项', // 本轮奖项名称
                maxAward: '', // 本轮奖项类别
                maxNum: '', // 本轮奖项总人数
                rollLen: 0, // 本轮已抽中用户数
                maxTimes: '5', // 单次最大抽取人数
                total: 0, // 累计所有抽中用户数
                isBegin: false, // 是否开始
                timeInterJS: null // 滚动定时器对象
            }
        },
        methods: {
            // 1.开始滚动
            beginRoll() {
                if (!this.isBegin) {
                    // 1.0选择抽取奖项
                    if (!this.maxAward) {
                        return ElMessage.warning(this.maxAwardTips)
                    }
                    // 1.1本轮抽奖剩余人数
                    const tempLast = this.maxNum - this.rollLen
                    // 1.1.0若小于单次最大抽奖人数
                    if (Boolean(tempLast) && tempLast < this.maxTimes) {
                        this.maxTimes = tempLast.toString()
                    }
                    // 1.1.1若已抽完
                    if (tempLast === 0) {
                        ElMessage.warning('本轮已抽取完毕')
                        return false
                    }
                    // 1.2抽奖池内剩余人数
                    this.total = 0
                    this.userData.map((item) => {
                        if (item.Award !== '0') {
                            this.total++
                        }
                    })
                    const tempRoll = this.userData.length - this.total
                    if (tempRoll <= this.maxTimes) {
                        ElMessage.warning(
                            `剩余人数:${tempRoll}人，不够本次抽取${this.maxTimes}人!`
                        )
                        return false
                    }
                    // 1.3定时器滚动
                    this.isBegin = true
                    this.timeInterJS = setInterval(this.roll, 50)
                }
            },
            // 2.结束抽取
            stopRoll() {
                if (this.isBegin) {
                    clearInterval(this.timeInterJS)
                    // 2.1更新已抽中人数数目
                    this.rollLen += this.rollIdArr.length
                    // 2.2重置开关
                    this.isBegin = false
                    this.rollIdArr.map((item) => {
                        item.Award = this.maxAward
                    })
                }
            },
            // 3.滚动主要函数
            roll() {
                // 3.0先清空抽中集合数组
                this.rollIdArr = []
                // 3.1更新抽中集合
                while (this.rollIdArr.length < this.maxTimes) {
                    const rnd = this.getRand()
                    const obj = this.userData[rnd]
                    if (
                        obj.Award === '0' &&
                            !this.findInArr(this.rollIdArr, obj)
                    ) {
                        this.rollIdArr.push(obj)
                    }
                }
            },
            // 4.去除已抽取观众
            findInArr(arr, obj) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].Num === obj.Num) {
                        return true
                    }
                }
                return false
            },
            // 5.随机比例返回抽取结果
            getRand() {
                return Math.floor(Math.random() * this.userData.length)
            },
            // 6.修改单次抽取个数
            changeTimes(val) {
                const rnd = this.getRand()
                this.rollIdArr = this.userData.slice(rnd, rnd + Number(val))
            },
            // 7.修改奖项及本轮人数
            changeAward(val) {
                if (this.awardOptions[val].number >= this.userData.length) {
                    return ElMessage.warning(
                        `总人数:${this.userData.length}人，不够本次抽取${this.awardOptions[val].number}人!`
                    )
                }
                // 7.0重置本轮已抽取奖项人数
                this.rollLen = 0
                // 7.1本轮奖项总人数
                this.awardOptions.map((item) => {
                    if (item.value === val) {
                        this.maxNum = item.number ? item.number : '99'
                        this.maxAwardTips = item.label
                        // 7.1.1本轮总人数小于单次抽取人数
                        if (Number(this.maxNum) < Number(this.maxTimes)) {
                            this.maxTimes = this.maxNum
                            this.changeTimes(this.maxTimes)
                        }
                    }
                })
                // 7.2单次可供抽取人数
                this.timesOptions.map((item) => {
                    item.disabled = Number(item.value) > Number(this.maxNum);
                })
            }
        }
    }
</script>

<style lang="scss">
    .lottery-options {
        .el-form-item__label {
            color: rgba(227, 183, 27, 0.9);
        }

        .el-input__inner {
            background-color: rgba(138, 9, 0, 0.6);
            color: rgba(227, 183, 27, 0.9);
            border: none;
        }
    }
</style>

<style lang="scss" scoped>
    $baseColor: rgba(227, 183, 27, 0.9);
    @keyframes rotateMusic {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .lottery-container {
        height: 100%;
        overflow: hidden;
        position: relative;
        background-image: url('../../../assets/img/function/lottery/background.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;

        .lottery-layout {
            position: relative;
            width: 100%;
            height: 100%;

            .lottery-main {
                width: 66%;
                position: absolute;
                left: 50%;
                top: 20%;
                transform: translate3d(-50%, 0, 0);
                z-index: 2;

                .lottery-item {
                    height: 7.6vh;
                    line-height: 7.6vh;
                    margin-top: 1%;
                    text-align: center;
                    background-image: url('../../../assets/img/function/lottery/roll.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    overflow: hidden;
                    position: relative;

                    .lottery-roll {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .roll-item {
                            width: 20%;
                            font-size: 3.6vh;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            &:last-child {
                                width: 40%;
                            }

                            span {
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                            }

                            img {
                                border-radius: 50%;
                                height: 5.6vh;
                                border: 1px solid #ccc;
                            }
                        }
                    }
                }

                .lottery-tips {
                    font-size: 3vh;
                    color: $baseColor;
                    text-align: center;
                    margin-bottom: 2%;
                }
            }

            .lottery-btn {
                position: absolute;
                width: 66%;
                left: 50%;
                bottom: 12%;
                transform: translate3d(-50%, 0, 0);
                z-index: 2;

                .btn-func {
                    padding: 0 15%;
                    display: flex;
                    justify-content: space-around;

                    button {
                        background-image: url('../../../assets/img/function/lottery/button.png');
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position-x: -4px;
                        color: #fff;
                        padding: 1vh 3.6vh;
                        margin: 0 1%;
                        font-size: 2.6vh;
                        border-radius: 7px;
                        outline: none;
                        cursor: pointer;

                        &:hover {
                            color: rgba(227, 183, 27, 0.9);
                        }
                    }
                }
            }

            .lottery-options {
                position: absolute;
                width: 20%;
                left: 1%;
                bottom: 5%;
                color: $baseColor;
                font-size: 1.8vh;
                z-index: 1;
            }
        }
    }
</style>
