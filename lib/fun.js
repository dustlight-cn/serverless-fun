const { Configuration, FunctionsApi } = require('@plus/fun-client-axios-js');
const Auth = require('@plus/auth-client-axios-js');

const ac = new Auth.Configuration({
    basePath: process.env.FUN_AUTH_ENDPOINT || "http://api.wgv.ink",
    username: process.env.FUN_CLIENT_ID,
    password: process.env.FUN_CLIENT_SECRET
})

const tokenApi = new Auth.TokenApi(ac)

const c = new Configuration({
    basePath: process.env.FUN_ENDPOINT || "http://fun.flow.wgv.ink",
    accessToken: () => tokenApi.grantJws(null, "client_credentials")
        .then(res => res.data.access_token)
})

const fapi = new FunctionsApi(c)
module.exports = fapi