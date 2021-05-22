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
    Life: cc.RichText,
    score: {
      default: null,
      type: cc.Label,
    },
    _sc: 0,
    HPBar: cc.ProgressBar,

    _number: 3, //This is your lives, default: 3 lives
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    mEmitter.instance.registerEvent("updateLife", this.updateLife.bind(this));
    mEmitter.instance.registerEvent("updateScore", this.updateScore.bind(this));
    mEmitter.instance.registerEvent("updateHP", this.updateHP.bind(this));
    // mEmitter.instance.registerEvent("killFly", this.killFly.bind(this));
    this.updateLife(this._number);
  },

  start() {},

  updateHP(HP) {
    this.HPBar.progress = HP / 1000;
    if (this.HPBar.progress <= 0) {
      this.HPBar.progress = 1;
      this._number--;
      this.updateLife(this._number);
    }
  },

  updateLife(number) {
    if (this._number < 0) {
      mEmitter.instance.emit("youLose");
    } else {
      cc.log(this._number);
      this.Life.string = "";
      let heart = "heart";
      let str = `<img src='${heart}'/>`;
      for (let i = 0; i < number; i++) {
        this.Life.string += str;
      }
    }
    //Catch this event by registering an event in another node
  },

  updateScore(score) {
    // let sc;
    this._sc += score;
    this.score.string = this._sc;
  },

  // update (dt) {},
});
