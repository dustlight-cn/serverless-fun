'use strict';

const providerName = 'fun';

class KubelessProvider {
  static getProviderName() {
    return providerName;
  }

  constructor(serverless) {
    this.serverless = serverless;
    this.provider = this;
    this.serverless.setProvider(providerName, this);
  }

}

module.exports = KubelessProvider;
