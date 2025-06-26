"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoricContainer = exports.Container = void 0;
const categoric_decorators_1 = require("@ldlework/categoric-decorators");
const inversify_1 = require("inversify");
var inversify_2 = require("inversify");
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return inversify_2.Container; } });
const createCategoricContainer = () => {
    const [_singleton, _locateSingletons] = (0, categoric_decorators_1.createClassCategoric)();
    const [_transient, _locateTransients] = (0, categoric_decorators_1.createClassCategoric)();
    const [_request, _locateRequests] = (0, categoric_decorators_1.createClassCategoric)();
    const singleton = (serviceIdentifier) => {
        return (target) => {
            _singleton({ serviceIdentifier })(target);
            (0, inversify_1.injectable)()(target);
        };
    };
    const installSingletons = (container) => {
        const singletons = _locateSingletons();
        for (const [target, { data }] of singletons) {
            const { serviceIdentifier } = data;
            container
                .bind(serviceIdentifier || target)
                .to(target)
                .inSingletonScope();
        }
    };
    const transient = (serviceIdentifier) => {
        return (target) => {
            _transient({ serviceIdentifier })(target);
            (0, inversify_1.injectable)()(target);
        };
    };
    const installTransients = (container) => {
        const transients = _locateTransients();
        for (const [target, { data }] of transients) {
            const { serviceIdentifier } = data;
            container
                .bind(serviceIdentifier || target)
                .to(target)
                .inTransientScope();
        }
    };
    const request = (serviceIdentifier) => {
        return (target) => {
            _request({ serviceIdentifier })(target);
            (0, inversify_1.injectable)()(target);
        };
    };
    const installRequests = (container) => {
        const requests = _locateRequests();
        for (const [target, { data }] of requests) {
            const { serviceIdentifier } = data;
            container
                .bind(serviceIdentifier || target)
                .to(target)
                .inRequestScope();
        }
    };
    const install = (container) => {
        installSingletons(container);
        installTransients(container);
        installRequests(container);
    };
    const makeChild = (container) => {
        const child = new inversify_1.Container({ parent: container });
        install(child);
        return child;
    };
    return { install, makeChild, singleton, transient, request };
};
exports.createCategoricContainer = createCategoricContainer;
//# sourceMappingURL=createCategoricContainer.js.map