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
    _maxHP: 1000,
    _HP: 1000,
    _atkSpeed: {
      default: 3,
      serializable: false,
    },
    _bulletType: {
      default: 1,
      serializable: false,
    },
    _time: 0,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    mEmitter.instance.registerEvent("moveShip", this.moveShip.bind(this));
    mEmitter.instance.registerEvent("hitShip", this.hitShip.bind(this));
    mEmitter.instance.registerEvent(
      "receiveBlood",
      this.receiveBlood.bind(this)
    );
    mEmitter.instance.registerEvent("receiveIce", this.receiveIce.bind(this));
    mEmitter.instance.registerEvent("receiveFire", this.receiveFire.bind(this));
    mEmitter.instance.registerEvent(
      "receiveThunder",
      this.receiveThunder.bind(this)
    );
    mEmitter.instance.registerEvent("youLose", this.lose.bind(this));
  },

  start() {},

  moveShip(localPoint) {
    let move = cc.moveTo(0.5, localPoint);
    this.node.runAction(move);
  },

  hitShip(damage) {
    this._HP -= damage;
    mEmitter.instance.emit("updateHP", this._HP);
    if (this._HP <= 0) this._HP = this._maxHP;
  },

  receiveBlood() {
    this._HP += 400;
    mEmitter.instance.emit("updateHP", this._HP);
  },

  receiveIce() {
    this._bulletType = 6;
  },

  receiveThunder() {
    this._atkSpeed *= 1.2;
  },

  receiveFire() {
    cc.log("Fire");
    this._bulletType = 2;
  },

  updateAtkSpeed(value) {
    this._atkSpeed += value;
  },

  lose() {
    this.node.destroy();
  },

  update(dt) {
    this._time += dt;
    if (this._time >= 1 / this._atkSpeed) {
      this._time = 0;
      mEmitter.instance.emit(
        "createBullet",
        this.node.x,
        this.node.y,
        this.node.height / 2,
        this.node.parent,
        this._bulletType
      );
      mEmitter.instance.emit("shoot");
      mEmitter.instance.emit("chaseShip", this.node.x, this.node.y);
    }
    //this.createBullet();
  },
});
