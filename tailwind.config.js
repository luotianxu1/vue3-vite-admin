/** @type {import('tailwindcss').Config} */
module.exports = {
    // 使用文件  https://github.com/aniftyco/awesome-tailwindcss  ui
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    corePlugins: {
        preflight: false // 这个预设很烦人建议抽出来自己定义使用
    },
    theme: {
        extend: {
            boxShadow: {
                'el-base': 'var(--el-box-shadow)',
                'el-light': 'var(--el-box-shadow-light)',
                'el-lighter': 'var(--el-box-shadow-lighter)',
                'el-dark': 'var(--el-box-shadow-dark)'
            },
            fontSize: {
                'el-size-h1': '1.96rem',
                'el-size-h2': '1.56rem',
                'el-size-h3': '1.16rem',
                'el-size-base': 'var(--el-font-size-base)',
                'el-size-large': 'var(--el-font-size--large)',
                'el-size-xLarge': 'var(--el-font-size-extra-large)',
                'el-size-small': 'var(--el-font-size-small)',
                'el-size-extra-xSmall': 'var(--el-font-size-extra-small)'
            },
            colors: {
                // 设置主题颜色
                theme: {
                    primary: {
                        'default': 'var(--el-color-primary)',
                        'light': {
                            3: 'var(--el-color-primary-light-3)',
                            5: 'var(--el-color-primary-light-5)',
                            7: 'var(--el-color-primary-light-7)',
                            9: 'var(--el-color-primary-light-9)'
                        },
                        'dark-2': 'var(--el-color-primary-dark-2)'
                    },
                    text: {
                        primary: 'var(--el-text-color-primary)',
                        regular: 'var(--el-text-color-regular)',
                        secondary: 'var(--el-text-color-secondary)',
                        placeholder: 'var(--el-text-color-placeholder)',
                        disabled: 'var(--el-text-color-disabled)'
                    }, //
                    border: {
                        'darker': 'var(--el-border-color-darker)',
                        'dark': 'var(--el-border-color-dark)',
                        'base': 'var(--el-border-color-base)',
                        'light': 'var(--el-border-color-light)',
                        'lighter': 'var(--el-border-color-lighter)',
                        'extra-light': 'var(--el-border-color-extra-light)'
                    },
                    fill: {
                        'darker': 'var(--el-fill-color-darker)',
                        'dark': 'var(--el-fill-color-dark)',
                        'base': 'var(--el-fill-color-base)',
                        'light': 'var(--el-fill-color-light)',
                        'lighter': 'var(--el-fill-color-lighter)',
                        'extra-light': 'var(--el-fill-color-extra-light)',
                        'blank': 'var(--el-fill-color-blank)'
                    },
                    background: {
                        base: 'var(--el-bg-color)',
                        page: 'var(--el-bg-color-page)',
                        overlay: 'var(--el-bg-color-overlay)'
                    }
                }
            },
            minWidth: {
                '0': '0',
                '1/5': '20%',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                'small': '6rem',
                'normal': '12rem',
                'large': '24rem',
                'full': '100%'
            },
            maxWidth: {
                '20': '10rem',
                '40': '20rem',
                '3/10': '30%',
                '7/10': '70%',
                '8/10': '80%',
                '9/10': '90%',
                '9-6/10': '96%',
                '9-8/10': '98%'
            },
            transitionDuration: {
                2000: '2000ms',
                3000: '3000ms'
            },
            scale: {
                15: '.15',
                20: '.20',
                25: '.25',
                35: '.35'
            }
        }
    },
    plugins: [
        require('@tailwindcss/line-clamp') // 超出省略
    ]
}
