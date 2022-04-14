import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

// 注册i8n实例并引入语言文件
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh', // 默认显示的语言
  messages: {
    zh: zh, // 引入语言文件
    en: en
  }
})

export default i18n
