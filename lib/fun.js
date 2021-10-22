

const { Configuration, FunctionsApi } = require('@plus/fun-client-axios-js');

// const Auth = require('@plus/auth-client-axios-js')

// var ac = new Auth.Configuration({
//     basePath: process.env.AUTH_ENDPOINT || "http://api.wgv.ink",
// })

var c = new Configuration({
    basePath: process.env.FUN_ENDPOINT || "http://fun.flow.wgv.ink",
    accessToken: () => process.env.FUN_TOKEN
})

console.log()

var fapi = new FunctionsApi(c)
module.exports = fapi