# 2024 LACTF Pogn Challenge Solution
## Main Idea
The exploit comes from the client having control over the direction of the ball.

To exploit this, we set the direction to exactly towards the wall, and wait for the ball to come towards us at the very other end of the game board.  After that, once the ball gets near us, we change our position to be exactly the position of the ball. It then gets launched to the other side of the game board, skipping over the enemy and winning the game.
