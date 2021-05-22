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
        backgroundMusic: {
            default: null,
            type: cc.AudioClip
        },
        _isMute: false,
        _volume: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        mEmitter.instance = new mEmitter;
        mEmitter.instance.registerEvent('muteSound', this.muteSound.bind(this));
        mEmitter.instance.registerEvent('setVolume', this.setVolume.bind(this));
        mEmitter.instance.registerEvent('saveSound',this.saveSound.bind(this));
        this.playSound();
        this.saveSound();
    },

    start() {

    },

    playSound() {
        this._soundID = cc.audioEngine.play(this.backgroundMusic, true, 1);
    },

    muteSound(sound) {
        if (!sound) {
            this._isMute = true;
            cc.audioEngine.stop(this._soundID)
        }
        else {
            this.playSound();
            this._isMute = false;
        }
    },

    setVolume(volume) {
        cc.audioEngine.setVolume(this._soundID, volume);
        this._volume = volume;
    },

    saveSound() {
        let config = {
            isMute: this._isMute,
            volume: this._volume,
        }
        cc.sys.localStorage.setItem('sound', JSON.stringify(config));
    },

    // update (dt) {},
});
