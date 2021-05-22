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
        shootingSound: {
            default: null,
            type: cc.AudioClip
        },
        _soundID: null,
        _isMute: false,
        _volume: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        mEmitter.instance.registerEvent('shoot', this.playShootingSound.bind(this));
        this.initSound();  
    },

    start() {

    },

    initSound() {
        let config = cc.sys.localStorage.getItem('sound');
        this._isMute = config.isMute;
        this._volume = config.volume;
        cc.log(config);
    },

    playShootingSound() {
        if(this._isMute)
            this._soundID = cc.audioEngine.play(this.shootingSound, false, this._volume);
    },

    stopSound() {
        cc.audioEngine.stop(this._soundID);
    },

    // update (dt) {},
});
