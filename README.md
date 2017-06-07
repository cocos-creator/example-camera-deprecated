# Camera Demo for Cocos Creator

In this project we demonstrate how to control cc.Camera in your action/platform game. There're several scripts you want to take a look at:

- `CameraControl.js`: Controls the camera's movement and zoom ratio according to your need.
- `HeroControl.js`: Physics based player control script, borrowed from [Physics Example](https://github.com/2youyou2/physics-example)
- `Global.js`: We enable physics system in this global script.

## Camera Control Pattern

In `CameraControl` component we implemented following method to control camera:

- **Smooth Follow**: follow the target smoothly when the target is too far away from camera.
- **Speed Zoom**: Zoom out the camera when player moves fast. Zoom back in when player slow down.
- **Jump Zoom**: The higher player jumps, the larger view he can see through camera.
- **Overview**: aka multi-targets, the camera will show all listed target and automatically zoom out to fit all of them on screen.
- **Camera Shake**: Use animation clip to move the camera node up and down for camera shake effect.
- **Pointer Pan**: Move your mouse to pan the camera around the player.
- **Boundaries**: Set boundaries for camera so it won't move across border.