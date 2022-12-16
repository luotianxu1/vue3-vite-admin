import devConfig from './dev'
import buildConfig from './build'

export const envResolver = {
    development: () => {
        console.log(' --- development ---')
        return devConfig
    },
    production: () => {
        console.log('--- production ---')
        return buildConfig
    }
}
