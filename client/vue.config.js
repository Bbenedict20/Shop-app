const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:3000/api',
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^/api': '' },
                logLevel: 'debug'
            },
            '^/shop/api': {
                target: 'http://localhost:3000/api',
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^/shop/api': '' },
                logLevel: 'debug'
            },
            '^/profile/api': {
                target: 'http://localhost:3000/api',
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^/profile/api': '' },
                logLevel: 'debug'
            },
            '^/checkout/api': {
                target: 'http://localhost:3000/api',
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^/checkout/api': '' },
                logLevel: 'debug'
            },
        }
    }
}