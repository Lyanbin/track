import curryN from 'lodash/fp/curryN';
import isFunction from 'lodash/fp/isFunction';
import propSet from 'lodash/fp/set';

export const before = curryN(2, (trackFn, fn) => function (...args) {
    try {
        console.log('before');
        isFunction(trackFn) && trackFn.apply(this, args)
    } catch (e) {
        console.error(e)
    }

    return fn.apply(this, args)
});


export const track = partical => (target, key, descriptor) => {
    if (!isFunction(partical)) {
        throw new Error('trackFn 必须是个函数 ' + partical);
    }
    const value = function (...args) {
        return partical.call(this, descriptor.value).apply(this, args);
    }
    return propSet('value', value, descriptor)
}