'use strict';

const _ = require('lodash');
const BbPromise = require('bluebird');
const path = require('path');

class KubelessInvoke {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options || {};
    this.provider = this.serverless.getProvider('fun');

    this.hooks = {
      'invoke:invoke': () => BbPromise.bind(this)
        .then(this.invokeFunction)
        .then(this.log),
    };
  }

  invokeFunction(func, data) {
    const f = func || this.options.function;
    this.serverless.cli.log(`Calling function: ${f}...`);
    let dataPath = this.options.path;
    if (dataPath && !path.isAbsolute(dataPath)) {
      dataPath = path.join(this.serverless.config.servicePath, dataPath);
    }
    return new Promise(()=>this.serverless.cli.log("Operation not support yet"),null)
  }

  log(response) {
    if (this.options.log) {
      console.log('--------------------------------------------------------------------');
      console.log(response.body);
    }
    return BbPromise.resolve();
  }
}

module.exports = KubelessInvoke;
