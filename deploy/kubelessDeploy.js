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
const fs = require('fs');
const JSZip = require('jszip');
const fapi = require('../lib/fun');

class KubelessDeploy {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options || {};
    this.provider = this.serverless.getProvider('fun');

    this.serverless.service.functions = {}
    this.serverless.service.functions[this.serverless.service.service] = {}

    this.hooks = {
      'before:package:createDeploymentArtifacts': () => BbPromise.bind(this)
        .then(this.excludes),
      'deploy:deploy': () => BbPromise.bind(this)
        .then(this.deployFunction),
    };
    // Store the result of loading the Zip file
    this.loadZip = _.memoize(JSZip.loadAsync);
  }

  excludes() {
    const exclude = this.serverless.service.package.exclude || [];
    exclude.push('node_modules/**');
    this.serverless.service.package.exclude = exclude;
  }

  getFileContent(zipFile, relativePath) {
    return this.loadZip(fs.readFileSync(zipFile)).then(
      (zip) => zip.file(relativePath).async('string')
    );
  }

  checkSize(pkg) {
    const stat = fs.statSync(pkg);
    // Maximum size for a etcd entry is 1 MB and right now Kubeless is storing files as
    // etcd entries
    const oneMB = 1024 * 1024;
    if (stat.size > oneMB) {
      this.serverless.cli.log(
        `WARNING! Function zip file is ${Math.round(stat.size / oneMB)}MB. ` +
        'The maximum size allowed is 1MB: please use package.exclude directives to include ' +
        'only the required files'
      );
    }
  }

  getPkg(funcName) {
    const pkg = this.serverless.config.serverless.service.artifact;

    // console.log(this.serverless.config.serverless.service);
    // if using the package option and packaging inidividually
    // then we're expecting a directory where artifacts for all the finctions live
    if (this.options.package && this.serverless.service.package.individually) {
      if (fs.lstatSync(pkg).isDirectory()) {
        return `${pkg + funcName}.zip`;
      }
      const errMsg = 'Expecting the Paramater to be a directory ' +
        'for individualy packaged functions';
      this.serverless.cli.log(errMsg);
      throw new Error(errMsg);
    }
    return pkg;
  }


  deployFunction() {

    const runtime = this.serverless.service.provider.runtime;
    const name = this.serverless.service.service
    const handler = this.serverless.service.provider.handler;

    var pkg = this.getPkg(null, name)
    var x = fs.readFileSync(pkg)

    return fapi.getFunction(name)
      .then(() => {
        this.serverless.cli.log("Redeploying function...")
        return true
      })
      .catch(e => {
        if (e.response.status != 404)
          return Promise.reject(e.response.data.message ?
            new Error(e.response.data.message + ", " + e.response.data.details + " [" + e.response.data.code + "]") :
            e)
        this.serverless.cli.log("Deploying function...")
        return false
      })
      .then((flag) => {
        if (flag)
          return fapi.deleteFunction(name)
      })
      .then(() => fapi.createFunction(name, x, runtime, handler))
      .then(() => this.serverless.cli.log("Function deployed."))
      .catch(e => Promise.reject(e.response.data.message ?
        new Error(e.response.data.message + ", " + e.response.data.details + " [" + e.response.data.code + "]") :
        e)
      )
  }
}

module.exports = KubelessDeploy;
