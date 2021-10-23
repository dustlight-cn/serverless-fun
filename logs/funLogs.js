'use strict';

const _ = require('lodash');
const BbPromise = require('bluebird');

class KubelessLogs {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options || {};
    this.provider = this.serverless.getProvider('fun');
    this.commands = {
      logs: {
        usage: 'Output the logs of a deployed function',
        lifecycleEvents: [
          'logs',
        ],
        options: {
          count: {
            usage: 'Number of lines to print',
            shortcut: 'n',
          },
        },
      },
    };
    this.hooks = {
      'logs:logs': () => BbPromise.bind(this)
        .then(this.printLogs),
    };
  }

  printLogs(options) {
    return new Promise(()=>this.serverless.cli.log("Operation not support yet"),null)
  }
}

module.exports = KubelessLogs;
