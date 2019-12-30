# So Far so Good...
**Done (in branch: develop)**
1. **Write unit tests**
1. **Fix a bug**
1. **Extend existing functionality**
   1. Commit a93b465: obstacles obliterated (deleted)
   2. Commit bb9f8df: cannot jump over trees (as specified), rocks jumped over catch fire (!)
2. **Build something new**
   1. Rhino chases Skier and collides with him (game over)
   2. Skier speeds up (or rather, Rhino slows down) when jumping or skiing down
   3. SPACE key pauses / resumes game
   4. ESC resumes game after Game Over
   5. Scoring and Status at top-right
3. **Live hosted version**
   * http://ski-challenge.pieslinger.net
 
**Next Features (WIP):**
1. Rhino eats Skier icons
2. Reset Score (currently resumes game w/o resetting to zero)

**Suggested Features and Chores**
1. Set apart a Global Status for the Game class

**Changelog as of Dec. 30, 2019:**
* 67961c0 - (HEAD -> develop, tag: v1.1.0, origin/develop) 1.1.0 (2 days ago) <Klaus Pieslinger>
* 27f7286 - Score and Game Over messages (2 days ago) <Klaus Pieslinger>
* 5f88f3e - calcSkierBounds() upmoved to Entity (8 days ago) <Klaus Pieslinger>
* 7e8097b - Game Over / Restart (ESC); also: All Entities belong to the same Canvas (8 days ago) <Klaus Pieslinger>
* 0f95b2a - First release to Production, updated README (11 days ago) <Klaus Pieslinger>
* 87d38a2 - Rhino (test drive) (12 days ago) <Klaus Pieslinger>
* bb9f8df - Obstacles jumped over catch fire! (12 days ago) <Klaus Pieslinger>
* 56b67f6 - Keep list of Obstacles skinny (12 days ago) <Klaus Pieslinger>
* 0b41e4e - SPACE pauses / resumes Game (12 days ago) <Klaus Pieslinger>
* c1755b0 - Interim backup: refactored loading of asset images (2 weeks ago) <Klaus Pieslinger>
* a93b465 - Interim release: Clueless Bumper (2 weeks ago) <Klaus Pieslinger>
* 51d3946 - Skier: fix lower-bound error after crash (3 weeks ago) <Klaus Pieslinger>
* 4c6b9c2 - Added test for Crash-Left error (3 weeks ago) <Klaus Pieslinger>
* 3b1ca59 - (origin/master, origin/HEAD, master) get this party started. (10 weeks ago) <Lean>

# Southteams Ski Code Challenge

Welcome to the Southteams Code Challenge - Ski Edition!

For this challenge, we have included some base code for Southteams Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here:
http://southteams-ski.herokuapp.com/ 

Or deploy it locally by running:
```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please
look through the requirements below and let us know when you will have something for us to look at. If anything is
unclear, don't hesitate to reach out.

**Requirements**

* **Fix a bug:**

  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)

* **Write unit tests:**

  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.

* **Extend existing functionality:**

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump
  trick assets if you wanted to get really fancy!
  * Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.
  * The skier should be able to jump over some obstacles while in the air.
    * Rocks can be jumped over
    * Trees can NOT be jumped over
  * Anything else you'd like to add to the skier's jumping ability, go for it!

* **Build something new:**

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long,
  a yeti would chase you down and eat you. In Southteams Ski, we've provided assets for a Rhino to run after the skier,
  catch him and eat him.
  * The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  * If the rhino catches the skier, it's game over and the rhino should eat the skier.

* **Documentation:**

  * Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  * Provide a way for us to view the completed code and run it, either locally or through a cloud provider

* **Be original:**  
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading**

Your challenge will be graded based upon the following:

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock,
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing
how creative candidates get with this.

* Provide a way to reset the game once it's over
* Provide a way to pause and resume the game
* Add a score that increments as the skier skis further
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
* Deploy the game to a server so that we can play it without having to install it locally
* Write more unit tests for your code

We are looking forward to see what you come up with!
