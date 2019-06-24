initial setup:
  1. Get the npm install, though that may be way too much
  2. Run the python cmd: "python -m http.server"
    you need the webserver so that the JS can access stuff
  3. put some code in index.html and there you go

Notes:
Why 400 and 300? It's because in Phaser 3 all Game Objects are positioned based on their center by default. The background image is 800 x 600 pixels in size, so if we were to display it centered at 0 x 0 you'd only see the bottom-right corner of it. If we display it at 400 x 300 you see the whole thing.
important to remember, different from regular JS

part 4
http://phaser.io/tutorials/making-your-first-phaser-3-game/part4

that was easy... too easy almost....

new tutorial: https://www.youtube.com/watch?v=ECE1Al-M4DM&list=PLitFP8FdScfHcJQ-kDmm0i6aOhinVO7ND&index=2
part1 setup, done
part2 scenes
  
