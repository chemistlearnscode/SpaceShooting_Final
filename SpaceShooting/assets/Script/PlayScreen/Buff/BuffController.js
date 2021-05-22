// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const mEmitter = require("EmitterClass");

cc.Class({
    extends: cc.Component,

    properties: {
        bloodBuff: cc.Prefab,
        fireBuff: cc.Prefab,
        iceBuff: cc.Prefab,
        thunderBuff : cc.Prefab,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        mEmitter.instance.registerEvent('createBuff', this.createBuff.bind(this));
    },

    start () {

    },

    createBuff: function (x, y, height, parentNode, id) {
        let buff = null;
        if(id == 1) {
            buff = cc.instantiate(this.bloodBuff);
        } else if (id == 2) {
            buff = cc.instantiate(this.fireBuff);
        } else if (id == 3) {
            buff = cc.instantiate(this.iceBuff);
        } else if (id == 4) {
            buff = cc.instantiate(this.thunderBuff);
        }
        buff.x = x;
        buff.y = y;
        buff.parent = parentNode;
    },

    // update (dt) {},
});
