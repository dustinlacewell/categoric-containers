'use strict';

var categoricDecorators = require('@ldlework/categoric-decorators');
var inversify = require('inversify');

const createCategoricContainer = () => {
  const [_singleton, _locateSingletons] = categoricDecorators.createClassCategoric();
  const [_transient, _locateTransients] = categoricDecorators.createClassCategoric();
  const [_request, _locateRequests] = categoricDecorators.createClassCategoric();
  const singleton = (serviceIdentifier) => {
    return (target) => {
      _singleton({ serviceIdentifier })(target);
      inversify.injectable()(target);
    };
  };
  const installSingletons = (container) => {
    const singletons = _locateSingletons();
    for (const [target, { data }] of singletons) {
      const { serviceIdentifier } = data;
      container.bind(serviceIdentifier || target).to(target).inSingletonScope();
    }
  };
  const transient = (serviceIdentifier) => {
    return (target) => {
      _transient({ serviceIdentifier })(target);
      inversify.injectable()(target);
    };
  };
  const installTransients = (container) => {
    const transients = _locateTransients();
    for (const [target, { data }] of transients) {
      const { serviceIdentifier } = data;
      container.bind(serviceIdentifier || target).to(target).inTransientScope();
    }
  };
  const request = (serviceIdentifier) => {
    return (target) => {
      _request({ serviceIdentifier })(target);
      inversify.injectable()(target);
    };
  };
  const installRequests = (container) => {
    const requests = _locateRequests();
    for (const [target, { data }] of requests) {
      const { serviceIdentifier } = data;
      container.bind(serviceIdentifier || target).to(target).inRequestScope();
    }
  };
  const install = (container) => {
    installSingletons(container);
    installTransients(container);
    installRequests(container);
  };
  const makeChild = (container) => {
    const child = new inversify.Container({ parent: container });
    install(child);
    return child;
  };
  return { install, makeChild, singleton, transient, request };
};

exports.createCategoricContainer = createCategoricContainer;
