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
    _time: 0,
    _isChase: 0,
    HPBar: cc.ProgressBar,
    _HP: {
      default: 5000,
      serializable: false,
    },
    _damage: 200,
    explosion: cc.SpriteFrame,
    _isDead: {
      default: false,
      serializable: false,
    },
    eventHit: null,
  },

  onLoad() {
    mEmitter.instance.registerEvent("chaseShip", this.chaseShip.bind(this));
    this.eventHit = this.loseHP.bind(this);
    mEmitter.instance.registerEvent("hitEnemy", this.eventHit);
    this.randomlyMove();
  },

  start() {},

  onCollisionEnter: function (other, self) {
    if (other.node.group === "Ship")
      mEmitter.instance.emit("hitShip", this._damage);
  },

  randomlyMove() {
    let randomX = this.getRandomIntInclusive(-340, 340);
    let randomY = this.getRandomIntInclusive(350, 500);
    let move = cc.moveTo(2, cc.v2(randomX, randomY));
    this.node.runAction(move);
  },

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  chaseShip(x, y) {
    if (this._isChase === 10) {
      this.node.stopAllActions();
      this._time = -2;

      let oldX = this.node.x;
      let oldY = this.node.y;

      cc.tween(this.node)
        .to(3, { scale: 1.5, x: x, y: y })
        .to(1, { scale: 1, x: oldX, y: oldY })
        .call((this._isChase = 0))
        .start();
    } else this._isChase++;
  },

  loseHP(damage) {
    this._HP -= damage;
    this.HPBar.progress = this._HP / 5000;
    if (this._HP <= 0) {
      this.explode();
      this._HP = 9999999;
    }
  },

  explode() {
    this.node.getComponent(cc.Sprite).spriteFrame = this.explosion;
    this.HPBar.node.active = false;
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
    mEmitter.instance.emit("updateScore", 100);
    mEmitter.instance.removeEvent("hitEnemy", this.eventHit);
    mEmitter.instance.emit("summonBoss", 2, this.node.parent);
    this.node.destroy();
  },

  update(dt) {
    this._time += dt;
    if (this._time >= 2 && this._isChase !== 10) {
      this.randomlyMove();
      this._time = 0;
    }
  },
});
