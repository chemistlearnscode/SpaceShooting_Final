// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const EventEmitter = require('events')

class mEmitter {
    constructor() {
        this._emitter = new EventEmitter();
        this._emitter.setMaxListeners(100);
    }

    emit(...args) {
        this._emitter.emit(...args);
    }

    registerEvent(event,listener) {
        this._emitter.on(event,listener)
    }

    registerOnce(event,listener) {
        this._emitter.once(event,listener);
    }

    removeEvent(event,listener) {
        this._emitter.removeListener(event,listener)
    }

    destroy() {
        this._emitter.removeAllListeners();
        this._emitter = null;
        mEmitter.instance = null;
    }
}
mEmitter.instance = null;
module.exports = mEmitter;