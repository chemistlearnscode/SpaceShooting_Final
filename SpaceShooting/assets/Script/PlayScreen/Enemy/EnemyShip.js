// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import enemyList from "./Config";
const mEmitter = require("EmitterClass");

// const

cc.Class({
  extends: cc.Component,

  properties: {
    enemy1: cc.Prefab,
    enemy2: cc.Prefab,
    enemy3: cc.Prefab,
    enemy4: cc.Prefab,
    enemy5: cc.Prefab,
    enemy: cc.Node,
    objEnemy: cc.Object,
    listEnemy: cc.Node,
    waveID: {
      default: 1,
      serializable: false,
    },
    _target: 0,
    _wave: {
      default: [],
      serializable: false,
    },
    _position: {
      default: new cc.Vec2(),
      serializable: false,
    },
    _objJson: null,
    // listEnemy:cc.Node,
  },

  // getData(){
  //   cc.loader.loadRes('MapEnemy.json',this.getMap.bind(this))
  // },

  // getMap(){

  // },

  createEnemy(type, pos) {
    switch (type) {
      case 1:
        this.enemy = cc.instantiate(this.enemy1);
        this.enemy.parent = this.node;
        this.objEnemy = Object.values(enemyList)[0];
        cc.log("Run");
        cc.tween(this.enemy)
          .to(2, { position: pos }, { easing: "sineOutIn" })
          .start();
        break;
      case 2:
        this.enemy = cc.instantiate(this.enemy2);
        this.enemy.parent = this.node;
        this.objEnemy = Object.values(enemyList)[1];
        cc.tween(this.enemy).to(2, { position: pos }).start();
        break;
      case 3:
        this.enemy = cc.instantiate(this.enemy3);
        this.enemy.parent = this.node;
        this.objEnemy = Object.values(enemyList)[2];
        cc.tween(this.enemy)
          // .bezierTo(3, [cc.v2(0, 0), cc.v2(200, 200), cc.v2(-100, -200)])
          .by(1, { position: cc.v2(pos.x + 100, pos.y + 100) })
          .by(1, { position: cc.v2(pos.x - 200, pos.y - 300) })
          .to(2, { position: pos })
          .start();
        break;
      case 4:
        this.enemy = cc.instantiate(this.enemy4);
        this.enemy.parent = this.node;
        this.objEnemy = Object.values(enemyList)[3];
        cc.tween(this.enemy)
          .to(
            3,
            { position: cc.v2(pos.x + 100, pos.y + 100) },
            { position: cc.v2(pos.x - 200, pos.y - 300) },
            { position: cc.v2(pos.x - 100, pos.y + 300) }
          )
          .to(2, { position: pos })
          // .repeatForever()
          .start();
        break;
      case 5:
        this.enemy = cc.instantiate(this.enemy5);
        this.enemy.parent = this.node;
        this.objEnemy = Object.values(enemyList)[4];
        cc.tween(this.enemy).to(2, { position: pos }).start();
        break;
      default:
        break;
    }
  },

  makeWave(wave) {
    this.valuesObj = Object.values(enemyList);
    let index = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 7; j++) {
        let x = -265 + (640 / 7) * j;
        let y = 500 - (700 / 4) * i;
        this._position = cc.v2(x, y);
        if (this._wave[index] === 1) {
          this.createEnemy(this.valuesObj[0].type, this._position);
        } else if (this._wave[index] === 2) {
          this.createEnemy(this.valuesObj[1].type, this._position);
        } else if (this._wave[index] === 3) {
          this.createEnemy(this.valuesObj[2].type, this._position);
        } else if (this._wave[index] === 4) {
          this.createEnemy(this.valuesObj[3].type, this._position);
        } else if (this._wave[index] === 5) {
          this.createEnemy(this.valuesObj[4].type, this._position);
        }
        index++;
      }
    }
  },

  waveControl(killCount) {
    cc.log(killCount);
    cc.log(this._target);
    if (killCount == this._target) {
      if (this.waveID < 5) {
        this.waveID++;
      }
      this.waveList();
      // killCount = 0;
      mEmitter.instance.emit("setKillCount");
    }
  },

  waveList() {
    cc.log(this.waveID);
    if (this.waveID == 2) {
      cc.log(this.waveID);
      this._wave = this._objJson.json.wave2.map;
      // cc.log(this._wave);
      this._target = this._objJson.json.wave2.numberOfEnemies;
      this.makeWave(this._wave);
    } else if (this.waveID == 3) {
      cc.log(this.waveID);
      this._wave = this._objJson.json.wave3.map;
      this._target = this._objJson.json.wave3.numberOfEnemies;
      this.makeWave(this._wave);
    } else if (this.waveID == 4) {
      this._wave = this._objJson.json.wave4.map;
      this._target = this._objJson.json.wave4.numberOfEnemies;
      this.makeWave(this._wave);
      cc.log(this.waveID);
    } else if (this.waveID >= 5) {
      cc.log(this.waveID);
      mEmitter.instance.emit("callBoss");
    }
  },

  killFly(score) {},
  // LIFE-CYCLE CALLBACKS:

  onLoad() {},

  getMap(err, obj) {
    if (err) {
      return;
    }
    this.waveID = 1;
    this._objJson = obj;
    this._wave = this._objJson.json.wave1.map;
    this._target = this._objJson.json.wave1.numberOfEnemies;
    this.makeWave(this._wave);
  },
  start() {
    cc.loader.loadRes("MapEnemy.json", this.getMap.bind(this));
    mEmitter.instance.registerEvent("waveControl", this.waveControl.bind(this));
    // mEmitter.instance.registerEvent("killFly", this.killFly.bind(this));
  },
  // update (dt) {},
});
