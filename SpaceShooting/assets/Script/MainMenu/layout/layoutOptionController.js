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
    toggleSound: cc.Toggle,
    btnReturn: cc.Button,
    sliderVolume: cc.Slider,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.btnReturn.node.on("mousedown", this.clickReturn.bind(this));
    this.btnReturn.node.on("mouseenter", this.hoverReturn.bind(this));
    this.btnReturn.node.on("mouseleave", this.leaveReturn.bind(this));
    this.toggleSound.node.on("toggle", this.muteSound.bind(this));
    this.sliderVolume.node.on("slide", this.changeVolume.bind(this));
  },

  start() {},

  clickReturn() {
    mEmitter.instance.emit("saveSound");
    mEmitter.instance.emit("hidePopup", "Option");
    let seq = cc.sequence(
      cc.delayTime(1),
      cc.callFunc(() => {
        mEmitter.instance.emit("enableButton");
      })
    );
    this.node.runAction(seq);
  },

  hoverReturn() {
    cc.tween(this.btnReturn.node).to(0.2, { scale: 1.2 }).start();
  },

  leaveReturn() {
    cc.tween(this.btnReturn.node).to(0.2, { scale: 1 }).start();
  },

  muteSound() {
    let sound = this.toggleSound.isChecked;
    this.sliderVolume.node.active = sound;
    mEmitter.instance.emit("muteSound", sound);
  },

  changeVolume() {
    mEmitter.instance.emit("setVolume", this.sliderVolume.progress);
  },

  // update (dt) {},
});
