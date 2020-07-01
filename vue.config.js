module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://185.209.85.213:8080',  // target host
                ws: true,  // proxy websockets
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/api': '/api'  // rewrite path
                }
            }
        }, 
        port: 80
    }
};