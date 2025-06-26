"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoricContainer = void 0;
var categoric_decorators_1 = require("@ldlework/categoric-decorators");
var inversify_1 = require("inversify");
var createCategoricContainer = function () {
    var _a = __read((0, categoric_decorators_1.createClassCategoric)(), 2), _singleton = _a[0], _locateSingletons = _a[1];
    var _b = __read((0, categoric_decorators_1.createClassCategoric)(), 2), _transient = _b[0], _locateTransients = _b[1];
    var _c = __read((0, categoric_decorators_1.createClassCategoric)(), 2), _request = _c[0], _locateRequests = _c[1];
    var singleton = function (serviceIdentifier) {
        return function (target) {
            _singleton({ serviceIdentifier: serviceIdentifier })(target);
            (0, inversify_1.injectable)()(target);
        };
    };
    var installSingletons = function (container) {
        var e_1, _a;
        var singletons = _locateSingletons();
        try {
            for (var singletons_1 = __values(singletons), singletons_1_1 = singletons_1.next(); !singletons_1_1.done; singletons_1_1 = singletons_1.next()) {
                var _b = __read(singletons_1_1.value, 2), target = _b[0], data = _b[1].data;
                var serviceIdentifier = data.serviceIdentifier;
                container
                    .bind(serviceIdentifier || target)
                    .to(target)
                    .inSingletonScope();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (singletons_1_1 && !singletons_1_1.done && (_a = singletons_1.return)) _a.call(singletons_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    var transient = function (serviceIdentifier) {
        return function (target) {
            _transient({ serviceIdentifier: serviceIdentifier })(target);
            (0, inversify_1.injectable)()(target);
        };
    };
    var installTransients = function (container) {
        var e_2, _a;
        var transients = _locateTransients();
        try {
            for (var transients_1 = __values(transients), transients_1_1 = transients_1.next(); !transients_1_1.done; transients_1_1 = transients_1.next()) {
                var _b = __read(transients_1_1.value, 2), target = _b[0], data = _b[1].data;
                var serviceIdentifier = data.serviceIdentifier;
                container
                    .bind(serviceIdentifier || target)
                    .to(target)
                    .inTransientScope();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (transients_1_1 && !transients_1_1.done && (_a = transients_1.return)) _a.call(transients_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    var request = function (serviceIdentifier) {
        return function (target) {
            _request({ serviceIdentifier: serviceIdentifier })(target);
            (0, inversify_1.injectable)()(target);
        };
    };
    var installRequests = function (container) {
        var e_3, _a;
        var requests = _locateRequests();
        try {
            for (var requests_1 = __values(requests), requests_1_1 = requests_1.next(); !requests_1_1.done; requests_1_1 = requests_1.next()) {
                var _b = __read(requests_1_1.value, 2), target = _b[0], data = _b[1].data;
                var serviceIdentifier = data.serviceIdentifier;
                container
                    .bind(serviceIdentifier || target)
                    .to(target)
                    .inRequestScope();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (requests_1_1 && !requests_1_1.done && (_a = requests_1.return)) _a.call(requests_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    var install = function (container) {
        installSingletons(container);
        installTransients(container);
        installRequests(container);
    };
    var makeChild = function (container) {
        var child = new inversify_1.Container({ parent: container });
        install(child);
        return child;
    };
    return { install: install, makeChild: makeChild, singleton: singleton, transient: transient, request: request };
};
exports.createCategoricContainer = createCategoricContainer;
