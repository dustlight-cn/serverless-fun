const { Configuration, FunctionsApi } = require('@dustlight/fun-client-axios-js');
const Auth = require('@dustlight/auth-client-axios-js');

const ac = new Auth.Configuration({
    basePath: process.env.FUN_AUTH_ENDPOINT || "https://api.dustlight.cn",
    username: process.env.FUN_CLIENT_ID,
    password: process.env.FUN_CLIENT_SECRET
})

const tokenApi = new Auth.TokenApi(ac)

const c = new Configuration({
    basePath: process.env.FUN_ENDPOINT || "http://fun.dustlight.cn",
    accessToken: () => tokenApi.grantJws(null, "client_credentials")
        .then(res => res.data.access_token)
})

const fapi = new FunctionsApi(c)
module.exports = fapi