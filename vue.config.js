// const { defineConfig } = require('@vue/cli-service')

// const path = require('path');
// module.exports = defineConfig({
// transpileDependencies: true
// })
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                // '@': path.resolve(__dirname, './src'),
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}