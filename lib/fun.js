
const { Configuration, FunctionsApi } = require('@plus/fun-client-axios-js');

var c = new Configuration({
    // basePath: "http://fun.flow.wgv.ink",
    basePath: "http://localhost:8080",
    accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJoYW5zaW4iLCJzY29wZSI6WyJyZWFkOnVzZXIiLCJyZWFkOmNsaWVudCJdLCJtZW1iZXIiOnRydWUsImFjdGl2ZSI6dHJ1ZSwiZXhwIjoxNjM0ODk3MTY4LCJqdGkiOiI3MjdmNjE0NS0wYjUwLTRiYTQtYWIxYy03YjRmN2U5YzA4YzEiLCJjbGllbnRfaWQiOiI4NmMzZTM0ZTIwMzAwMDAiLCJ1c2VybmFtZSI6IjYwNjk3MDM3NjUzODQ4ODgzMiJ9.R3VktKGRwWBy3nQtt3xRoQakyN-hcAnFazQHCjM1x7f-hlskCjdZ5-rezaJOz8_ECutuNAdfgLI4oTamXp8Sg6ru97JXgAjI038ZnaePRj5MjQ_5U01-ORcQzcQhvVJCQ6sdujA_60BLHOzCz74BWDX6UoJbHroGjyfyfGWaHpRcNq3_a8TFwDXhaV9zoI2nN9We7wuVroyLX3tRmJKkZaFBecG3MRza0rdUK0CTO9OB_Ip8mP3f0AC64vrawTI2sEPpOUmI0SLQxzCRxvM5fKFkiY40mM-DMYzTScvbnn-cLVE_Z77dhhmjd7RsF2qxtRAdcpR-rBvTUFsZTeeD6g"
})

var fapi = new FunctionsApi(c)
module.exports = fapi