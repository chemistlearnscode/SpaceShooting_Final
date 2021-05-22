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
      default: 15000,
      serializable: false,
    },
    _damage: 400,
    explosion: cc.SpriteFrame,
    _isDead: {
      default: false,
      serializable: false,
    },
    _dir: 1,
    rocket: cc.Prefab,
  },

  onLoad() {
    mEmitter.instance.registerEvent("hitEnemy", this.loseHP.bind(this));
  },

  start() {},

  onCollisionEnter: function (other, self) {
    if (other.node.group === "Ship")
      mEmitter.instance.emit("hitShip", this._damage);
  },

  loseHP(damage) {
    this._HP -= damage;
    this.HPBar.progress = this._HP / 15000;
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
    mEmitter.instance.emit("updateScore", 300);
    mEmitter.instance.emit("youWin"); //Game over, player win
    this.node.destroy();
  },

  _dropRocket() {
    let rock = cc.instantiate(this.rocket);
    rock.parent = this.node.parent;
    rock.x = this.node.x;
  },

  update(dt) {
    this.node.x += 200 * dt * this._dir;
    if (this.node.x >= 300) this._dir = -1;
    else if (this.node.x <= -300) this._dir = 1;

    this._time += dt;
    if (this._time >= 1 / 2) {
      this._dropRocket();
      this._time = 0;
    }
  },
});
