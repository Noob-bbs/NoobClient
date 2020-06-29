module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://ru.better06.xyz:8080',  // target host
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