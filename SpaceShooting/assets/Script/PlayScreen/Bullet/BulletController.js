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
        bullet1: cc.Prefab,
        bullet2: cc.Prefab,
        bullet6: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        mEmitter.instance.registerEvent('createBullet',this.createBullet.bind(this));
    },

    start () {

    },

    createBullet(x,y,height,parentNode,id) {
        let bullet = null;
        if(id == 1) {
            bullet = cc.instantiate(this.bullet1);
        } else if(id == 2) bullet = cc.instantiate(this.bullet2);
        else if (id == 6) bullet = cc.instantiate(this.bullet6);
        bullet.x = x;
        bullet.y = y + height;
        bullet.parent = parentNode;
    },

    // update (dt) {},
});
