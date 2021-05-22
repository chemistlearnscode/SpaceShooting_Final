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
        speed: {
            get: function() {
                return this._speed
            },
            set: function(val) {
                this._speed = val;
            }
            
        },
        damage: {
            get: function() {
                return this._damage
            },
            set: function(val) {
                this._damage = val;
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },

    onCollisionEnter: function (other, self) {
        mEmitter.instance.emit('hitEnemy',this._damage);
        this.node.destroy();
    },

    move() {
        let move = cc.moveTo(this._speed,cc.v2(this.node.x,640));
        let call = cc.callFunc(() => {
            this.node.destroy();
        });
        let seq = cc.sequence(move,call);
        this.node.runAction(seq);
    }

    // update (dt) {},
});
