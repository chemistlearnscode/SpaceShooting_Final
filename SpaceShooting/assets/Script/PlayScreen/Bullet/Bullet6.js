const bullet = require('Bullet')
cc.Class({
    extends: bullet,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speed = 1;
        this.damage = 500;
        this.move();
    },

    start () {

    },

    // update (dt) {},
});