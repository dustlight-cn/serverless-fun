const { Configuration, FunctionsApi, ConfigsApi } = require('@dustlight/fun-client-axios-js');

const Auth = require('@dustlight/auth-client-axios-js');

const funEndpoint = process.env.FUN_ENDPOINT || "https://fun.dustlight.cn"

const configApi = new ConfigsApi(new Configuration({ basePath: funEndpoint }));

const cfg = configApi.getConfiguration()

const c = new Configuration({
    basePath: funEndpoint,
    accessToken: () => cfg
        .then(res => res.data.authEndpoint)
        .then(endpoint => new Auth.Configuration({
            basePath: process.env.FUN_AUTH_ENDPOINT || endpoint || "https://api.dustlight.cn",
            username: process.env.FUN_CLIENT_ID,
            password: process.env.FUN_CLIENT_SECRET
        }))
        .then(ac => new Auth.TokenApi(ac)
            .grantJws(null, "client_credentials")
            .then(res => res.data.access_token)
        )
})

const fapi = new FunctionsApi(c)
fapi.ext = {
    config: configApi
}
module.exports = fapi