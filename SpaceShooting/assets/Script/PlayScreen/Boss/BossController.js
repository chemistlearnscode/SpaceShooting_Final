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
    boss1: cc.Prefab,
    boss2: cc.Prefab,
    boss3: cc.Prefab,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    mEmitter.instance.registerEvent("summonBoss", this.summonBoss.bind(this));
  },

  start() {},

  summonBoss(id, parentNode) {
    let boss = null;
    if (id == 1) boss = cc.instantiate(this.boss1);
    else if (id == 2) boss = cc.instantiate(this.boss2);
    else if (id == 3) boss = cc.instantiate(this.boss3);
    boss.parent = parentNode;
  },

  // update (dt) {},
});
