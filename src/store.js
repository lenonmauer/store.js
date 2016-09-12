((w) => {
    'use strict';

    const configs = {
        method: localStorage
    };

    const set = (key, value) => {
        const json = JSON.stringify(value);
        configs.method.setItem(key, json);
    };

    const get = (key) => {
        const item = configs.method.getItem(key);
        if(typeof item !== "string"){
            return undefined;
        } else {
            return parseJSONSafe(item);
        }
    };

    const use = (method) => {
        if(typeof method == 'string') {
            method = window[method];
        }
        if(!method || !method.setItem){
            throw 'This storage method is not valid.';
        } else {
            configs.method = method; 
        }
    };

    const remove = (key) => {
        configs.method.removeItem(key);
    };

    const clear = () => {
        configs.method.clear();
    };

    const has = (key) => {
        return get(key) !== undefined;
    };

    const getAll = () => {
        const keys = Object.keys(configs.method);
        return keys.map((key) => {
            const item = {};
            item[key] = get(key);
            return item;
        });
    };

    const parseJSONSafe = (string) => {
        let val;
        try{
            val = JSON.parse(string);
        }catch(err){
            val = null;
        }
        return val;
    };

    w.store = {
        set, get, use, remove, clear, has, getAll
    };

})(window);