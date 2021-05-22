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
    _HP: {
      default: 600,
      serializable: false,
    },
    _damage: 150,
    explosion: cc.SpriteFrame,
    _receiveDmg: 0,
    _time: {
      default: -3,
      serializable: false,
    },
    energyBall: cc.Prefab,
  },

  onLoad() {
    mEmitter.instance.registerEvent("hitEnemy", this.receiveDamage.bind(this));
  },

  start() {},

  onCollisionEnter: function (other, self) {
    if (other.node.group === "Ship") {
      mEmitter.instance.emit("hitShip", this._damage);
      this.explode();
    } else if (other.node.group === "Bullet") this.loseHP();
  },

  receiveDamage(damage) {
    this._receiveDmg = damage;
  },

  loseHP() {
    this._HP -= this._receiveDmg;
    if (this._HP <= 0) {
      this.explode();
      this._HP = 9999999;
    }
  },

  dropBall() {
    let ball = cc.instantiate(this.energyBall);
    ball.x = this.node.x;
    ball.parent = this.node.parent;
  },

  explode() {
    this.node.getComponent(cc.Sprite).spriteFrame = this.explosion;
    this.node.stopAllActions();
    this.node.scale = 0.1;
    this._time = -999;
    this._isChase = -999;
    let explosive = cc.scaleTo(2, 2);
    let disapper = cc.fadeOut(1);
    var seq = cc.sequence(
      explosive,
      disapper,
      cc.callFunc(this.des.bind(this))
    );
    this.node.runAction(seq);
  },

  des() {
    mEmitter.instance.emit("killCount");
    this.node.destroy();
  },

  start() {},

  update(dt) {
    this._time += dt;
    if (this._time >= 10) {
      this._time = 0;
      this.dropBall();
    }
  },
});
