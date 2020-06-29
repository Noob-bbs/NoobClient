module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',  // target host
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