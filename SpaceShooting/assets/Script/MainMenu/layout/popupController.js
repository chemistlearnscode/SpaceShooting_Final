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
    optionPopup: cc.Layout,
    quitPopup: cc.Layout,
    tutorialPopup: cc.PageView,
    _clickedPopup: cc.Node,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    mEmitter.instance.registerEvent(
      "showPopup",
      this.classifyShowPopup.bind(this)
    );
    mEmitter.instance.registerEvent(
      "hidePopup",
      this.classifyHidePopup.bind(this)
    );
  },

  start() {},

  classifyShowPopup(str) {
    let popup = null;
    if (str == "Option") popup = this.optionPopup;
    else if (str == "Quit") popup = this.quitPopup;
    else if (str == "Tutorial") popup = this.tutorialPopup;
    this.showPopup(popup);
  },

  classifyHidePopup(str) {
    let popup = null;
    if (str == "Option") popup = this.optionPopup;
    else if (str == "Quit") popup = this.quitPopup;
    else if (str == "Tutorial") popup = this.tutorialPopup;
    this.hidePopup(popup);
  },

  showPopup(popup) {
    //popup.node.scale = 0.2;
    //popup.node.opacity = 0;
    popup.node.active = true;
    cc.tween(popup.node)
      .to(0.2, { scale: 0.9, opacity: 255 }, { ease: "bounceInOut" })
      .start();
  },

  hidePopup(popup) {
    cc.tween(popup.node)
      .to(0.2, { scale: 0.2, opacity: 0 }, { ease: "bounceInOut" })
      .call(() => {
        popup.node.active = false;
      })
      .start();
  },

  // update (dt) {},
});
