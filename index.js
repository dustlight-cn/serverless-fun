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

/*
NOTE: this plugin is used to add all the different provider related plugins at once.
This way only one plugin needs to be added to the service in order to get access to the
whole provider implementation.
*/

const dotenv = require("dotenv")
dotenv.config()

const KubelessProvider = require('./provider/funProvider');
const KubelessDeploy = require('./deploy/funDeploy');
const KubelessRemove = require('./remove/funRemove');
const KubelessInvoke = require('./invoke/funInvoke');
const KubelessInfo = require('./info/funInfo');
const KubelessLogs = require('./logs/funLogs');


class KubelessIndex {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.serverless.pluginManager.addPlugin(KubelessProvider);
    this.serverless.pluginManager.addPlugin(KubelessDeploy);
    this.serverless.pluginManager.addPlugin(KubelessRemove);
    this.serverless.pluginManager.addPlugin(KubelessInvoke);
    this.serverless.pluginManager.addPlugin(KubelessInfo);
    this.serverless.pluginManager.addPlugin(KubelessLogs);
  }
}

module.exports = KubelessIndex;
