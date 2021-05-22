const bullet = require('Bullet')
cc.Class({
    extends: bullet,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speed = 2;
        this.damage = 200;
        this.move();
    },

    start () {

    },

    // update (dt) {},
});