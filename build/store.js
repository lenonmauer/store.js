(function (w) {
    'use strict';

    var configs = {
        method: localStorage
    };

    var set = function set(key, value) {
        var json = JSON.stringify(value);
        configs.method.setItem(key, json);
    };

    var get = function get(key) {
        var item = configs.method.getItem(key);
        if (typeof item !== "string") {
            return undefined;
        } else {
            return parseJSONSafe(item);
        }
    };

    var use = function use(method) {
        if (typeof method == 'string') {
            method = window[method];
        }
        if (!method || !method.setItem) {
            throw 'This storage method is not valid.';
        } else {
            configs.method = method;
        }
    };

    var remove = function remove(key) {
        configs.method.removeItem(key);
    };

    var clear = function clear() {
        configs.method.clear();
    };

    var has = function has(key) {
        return get(key) !== undefined;
    };

    var getAll = function getAll() {
        var keys = Object.keys(configs.method);
        return keys.map(function (key) {
            var item = {};
            item[key] = get(key);
            return item;
        });
    };

    var parseJSONSafe = function parseJSONSafe(string) {
        var val = void 0;
        try {
            val = JSON.parse(string);
        } catch (err) {
            val = null;
        }
        return val;
    };

    w.store = {
        set: set, get: get, use: use, remove: remove, clear: clear, has: has, getAll: getAll
    };
})(window);