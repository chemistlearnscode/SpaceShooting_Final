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
    btnYes: cc.Button,
    btnNo: cc.Button,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.btnNo.node.on("mousedown", this.clickNo.bind(this));
    this.btnYes.node.on("mousedown", this.clickYes.bind(this));
  },

  start() {},

  clickNo() {
    mEmitter.instance.emit("hidePopup", "Quit");
    let seq = cc.sequence(cc.delayTime(1), cc.callFunc(this.call.bind(this)));
    this.node.runAction(seq);
  },

  call() {
    mEmitter.instance.emit("enableButton");
  },

  clickYes() {
    cc.game.end();
  },

  // update (dt) {},
});
