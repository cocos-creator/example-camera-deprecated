// game art from : https://openpixelproject.itch.io/opp2017sprites
const CameraControl = require('CameraControl');

const MOVE_LEFT = 1;
const MOVE_RIGHT = 2;

cc.macro.ENABLE_TILEDMAP_CULLING = false;

cc.Class({
    extends: cc.Component,

    properties: {
        camera: CameraControl,
        maxSpeed: 500,
        jumps: 2,
        acceleration: 1500,
        jumpSpeed: 200,
        drag: 600
    },

    // use this for initialization
    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this._moveFlags = 0;

        this._up = false;
        
        this.body = this.getComponent(cc.RigidBody);
        this.speed = cc.p(0, 0);
    },

    onKeyDown (event) {
        switch(event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this._moveFlags |= MOVE_LEFT;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this._moveFlags |= MOVE_RIGHT;
                break;
            case cc.KEY.up:
            case cc.KEY.w:
                if (!this._upPressed) {
                    this._up = true;
                }
                this._upPressed = true;
                break;
        }
    },

    onKeyUp (event) {
        switch(event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this._moveFlags &= ~MOVE_LEFT;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this._moveFlags &= ~MOVE_RIGHT;
                break;
            case cc.KEY.up:
            case cc.KEY.w:
                this._upPressed = false;
                break;
        }
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (selfCollider.node.y > otherCollider.node.y) {
            this.jumps = 2;
        }

        if (otherCollider.tag === 100) {
            this.camera.shakeCamera();
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.speed = this.body.linearVelocity;

        if(this._moveFlags === MOVE_LEFT) {
            // this.anim.play('walk');

            if(this.node.scaleX > 0) {
                this.node.scaleX *= -1;
            }

            this.speed.x -= this.acceleration * dt;
            if(this.speed.x < -this.maxSpeed) {
                this.speed.x = -this.maxSpeed;
            }
        } 
        else if (this._moveFlags === MOVE_RIGHT) {
            // this.anim.play('walk');

            if(this.node.scaleX < 0) {
                this.node.scaleX *= -1;
            }

            this.speed.x += this.acceleration * dt;
            if(this.speed.x > this.maxSpeed) {
                this.speed.x = this.maxSpeed;
            }
        }  
        else {
            if(this.speed.x !== 0) {
                var d = this.drag * dt;
                if(Math.abs(this.speed.x) <= d) {
                    this.speed.x = 0;
                    // this.anim.play('idle');
                } else {
                    this.speed.x -= this.speed.x > 0 ? d : -d;
                }
            }
        }
        
        if (this.jumps > 0 && this._up) {
            this.speed.y = this.jumpSpeed;
            this.jumps--;
        }

        this._up = false;
        this.body.linearVelocity = this.speed;
    },
});
