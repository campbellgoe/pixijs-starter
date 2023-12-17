
// import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
  background: '#1099bb',
  resizeTo: window,
});

document.getElementById('pixi-container').appendChild(app.view)

const bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png')

app.stage.addChild(bunny)

bunny.anchor.set(0.5)

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2
bunny.y = app.screen.height / 2

const sprite = PIXI.Sprite.from('spaceship.png');
app.stage.addChild(sprite);

// Add a variable to count up the seconds our demo has been running
let elapsed = 0.0;
let dir = 0
let vx = 0
let x = bunny.x
// Tell our application's ticker to run a new callback every frame, passing
// in the amount of time that has passed since the last tick
app.ticker.add((delta) => {
  bunny.rotation += 0.1 * delta;

  // Add the time to our total elapsed time
  dir += 1 * 0.1 * delta
  bunny.y += dir
  x += vx

  bunny.x = x
  if (bunny.y >= app.screen.height) {
    dir = -dir
    bunny.y = app.screen.height
  }
  // Update the sprite's X position based on the cosine of our elapsed time.  We divide
  // by 50 to slow the animation down a bit...
});
function makeKeyboard(keyCodes){
  const keys = {}
  let isUp = true
  let isDown = false
  keyCodes.forEach(code => {
    keys[code] = {}
  })
  const downHandler = event => {
    if (keyCodes.includes(event.code)){
      if(isUp) keys[event.code]?.onDown(event)
      isDown = true;
      isUp = false;
    }
  }
  const upHandler = event => {
    if (keyCodes.includes(event.code)){
      if(isDown) keys[event.code]?.onUp(event)
      isDown = false;
      isUp = true;
    }
  }
  window.addEventListener("keydown", downHandler, false);
  window.addEventListener("keyup", upHandler, false);
  return keys
}

const {ArrowLeft, KeyA, ArrowRight, KeyD} = makeKeyboard(['ArrowLeft', 'KeyA', 'ArrowRight', 'KeyD'])


ArrowLeft.onDown = () => {
  vx += 1
  vx = -Math.abs(vx);
};
ArrowLeft.onUp = () => {
  vx = 0
}
KeyA.onDown = ArrowLeft.onDown
KeyA.onUp = ArrowLeft.onUp

ArrowRight.onDown = () => {
  vx += 1
  vx = Math.abs(vx);
};
ArrowRight.onUp = () => {
  vx = 0
}
KeyD.onDown = ArrowRight.onDown
KeyD.onUp = ArrowRight.onUp