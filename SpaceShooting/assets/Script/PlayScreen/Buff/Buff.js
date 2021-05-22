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
        //buff: cc.SpriteAtlas,
        //buffManager: cc.NodePool,
        _time: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.move();
    },

    start () {

    },

    move() {
        let randomX = this.getRandomIntInclusive(-340,340);
        let randomY = this.getRandomIntInclusive(-600,600);
        let move = cc.moveTo(2,cc.v2(randomX,randomY));
        this.node.runAction(move);
    },

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    update (dt) {
        this._time += dt;
        if(this._time >= 2) {
            this.move();
            this._time = 0;
        }
    },
});
