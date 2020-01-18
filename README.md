# So Far so Good...
## Branch: develop
1. **Write unit tests**
2. **Fix a bug**
3. **Extend existing functionality**
   1. Commit a93b465: obstacles obliterated (deleted)
   2. Commit bb9f8df: cannot jump over trees (as specified), rocks jumped over catch fire (!)
4. **Build something new**
   1. Rhino chases Skier and collides with him (game over)
   2. Skier speeds up (or rather, Rhino slows down) when jumping or skiing down
   3. SPACE key pauses / resumes game
   4. ESC resumes game after Game Over
   5. Scoring and Status at top-right
   6. Rhino eats (properly cooked) Skier icon

## Branch: feature/states (git flow)
1. Set apart a Global Status for the ~~Game~~ Canvas class

## Live hosted version
http://ski-challenge.pieslinger.net

**Suggested Next Features:**
1. Reset Score (currently resumes game w/o resetting to zero)

## Changelog as of Jan. 18, 2020:
* c950a50 - (HEAD -> feature/states) States: Skiing, Jumping, Crashed, Eaten, Paused (shared Canvas) (4 minutes ago) <Klaus Pieslinger>
* cd5643a - Working draft (3 days ago) <Klaus Pieslinger>
* b6764c5 - (origin/develop, develop) Updated README (3 weeks ago) <Klaus Pieslinger>
* 67961c0 - (tag: v1.1.0) 1.1.0 (3 weeks ago) <Klaus Pieslinger>
* 27f7286 - Score and Game Over messages (3 weeks ago) <Klaus Pieslinger>
* 5f88f3e - calcSkierBounds() upmoved to Entity (4 weeks ago) <Klaus Pieslinger>
* 7e8097b - Game Over / Restart (ESC); also: All Entities belong to the same Canvas (4 weeks ago) <Klaus Pieslinger>
* 0f95b2a - First release to Production, updated README (4 weeks ago) <Klaus Pieslinger>
* 87d38a2 - Rhino (test drive) (4 weeks ago) <Klaus Pieslinger>
* bb9f8df - Obstacles jumped over catch fire! (4 weeks ago) <Klaus Pieslinger>
* 56b67f6 - Keep list of Obstacles skinny (4 weeks ago) <Klaus Pieslinger>
* 0b41e4e - SPACE pauses / resumes Game (4 weeks ago) <Klaus Pieslinger>
* c1755b0 - Interim backup: refactored loading of asset images (5 weeks ago) <Klaus Pieslinger>
* a93b465 - Interim release: Clueless Bumper (5 weeks ago) <Klaus Pieslinger>
* 51d3946 - Skier: fix lower-bound error after crash (5 weeks ago) <Klaus Pieslinger>
* 4c6b9c2 - Added test for Crash-Left error (5 weeks ago) <Klaus Pieslinger>
* 3b1ca59 - (origin/master, origin/HEAD, master) get this party started. (3 months ago) <Lean>
