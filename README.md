# connect-four
A Pure JavaScript grid-based game

![image](screens/screenshot1.jpg?raw=true)

Connect Four (also known as Four Up, Plot Four, Find Four, Four in a Row, Four in a Line, Drop Four, and Gravitrips (in Soviet Union)) is a two-player board game in which the players first choose a color and then take turns dropping one colored disc from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the lowest available space within the column. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs.


## Rules of Connect Four
* You will start as player One (red) or Player Two (yellow). This is shown in the status.
* You will take your turn by clicking a column and thereby placing a disk in that column that drops down. It is placed automatically above any existing disks.
* Once your go is taken and you did not win, It will be the other players turn.
* The gamer will continue until a winning combination of four is reached by player One or player Two, or until the grid is full (then it's a tie game and this is also shown).

## Why it was created.
Did some random browsing and saw a video from Ania Kubow about creating connect four in javascript.
But her static array gamechecking routine looks like the wrong approach. Also the gui and not being able to click anywhere in a column annoyed me and my son when
we tried to play it.

Wrote my own version from scratch in a couple of hours. And played it with my son Noah Schreppers. He suggested adding specials and animations etc.
Added some of them like animating a win and a tie nicely. Might add some more of those in the near future ;).

