/*
 Copyright 2017 Bitnami.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

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
