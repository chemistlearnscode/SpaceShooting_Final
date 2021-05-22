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
    gameOver: cc.Sprite,
    winGame: cc.Sprite,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    mEmitter.instance.registerEvent("youWin", this.youWin.bind(this));
    mEmitter.instance.registerEvent("youLose", this.youLose.bind(this));
  },

  start() {},

  youWin() {
    this.winGame.node.active = true;
    cc.tween(this.winGame.node)
      .to(0.2, { scale: 0.9, opacity: 255 }, { ease: "bounceInOut" })
      .start();
  },

  youLose() {
    this.gameOver.node.active = true;
    cc.tween(this.gameOver.node)
      .to(0.2, { scale: 0.9, opacity: 255 }, { ease: "bounceInOut" })
      .start();
  },

  // update (dt) {},
});
