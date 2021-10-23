'use strict';

const _ = require('lodash');
const BbPromise = require('bluebird');
const fapi = require('../lib/fun');

class KubelessRemove {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options || {};
    this.provider = this.serverless.getProvider('kubeless');

    this.hooks = {
      'remove:remove': () => BbPromise.bind(this)
        .then(this.removeFunction),
    };
  }

  removeFunction() {
    return fapi.deleteFunction(this.serverless.service.service)
      .then(res => this.serverless.cli.log("Function removed."))
      .catch(e => Promise.reject(e.response.data.message ?
        new Error(e.response.data.message + ", " + e.response.data.details + " [" + e.response.data.code + "]") :
        e))
  }
}

module.exports = KubelessRemove;
