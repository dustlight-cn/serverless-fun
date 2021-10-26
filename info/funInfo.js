'use strict';

const _ = require('lodash');
const BbPromise = require('bluebird');
const fapi = require("../lib/fun")

class KubelessInfo {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options || {};
    this.provider = this.serverless.getProvider('fun');
    this.commands = {
      info: {
        usage: 'Display information about the current functions',
        lifecycleEvents: [
          'info',
        ],
        options: {
          verbose: {
            usage: 'Display metadata',
            shortcut: 'v',
          },
        },
      },
    };
    this.hooks = {
      'info:info': () => BbPromise.bind(this)
        .then(this.infoFunction),
    };
  }

  infoFunction(options) {
    return fapi.getFunction(this.serverless.service.service)
      .then(res => this.serverless.cli.log("Function info: \n" + JSON.stringify(res.data, null, 2)))
      .catch(e => Promise.reject(e.response ?
        new Error(e.response.data.message + ", " + e.response.data.details + " [" + e.response.data.code + "]") :
        e)
      )
  }
}

module.exports = KubelessInfo;
