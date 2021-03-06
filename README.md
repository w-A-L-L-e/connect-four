# connect-four
A Pure JavaScript grid-based game

![image](screens/screenshot1.jpg?raw=true)

Connect Four (also known as Four Up, Plot Four, Find Four, Four in a Row, Four in a Line, Drop Four, and Gravitrips (in Soviet Union)) is a two-player board game in which the players first choose a color and then take turns dropping one colored disc from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the lowest available space within the column. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs.


## Rules of Connect Four
* You will start as Player One (red) or Player Two (yellow). This is shown in the status.
* You will take your turn by clicking a column and thereby placing a disk in that column that drops down. It is placed automatically above any existing disks.
* Once your turn is taken and you did not win and the grid is not full yet, the other player can place a disk.
* The game will continue until a winning combination of four connected disks is reached by Player One or Player Two, or until the grid is full (then it's a tie game and this is also shown).

## Why it was created.
Did some random browsing and saw a video from Ania Kubow about creating connect four in javascript because my son asked to play connect four but we couldn't find our physical board. 
Unfortunately her static array gamechecking routine (basically a lookup table containing all possible win scenarios) felt like the wrong approach to implement this simple game. Also the gui was not friendly enough for kids to actually play (it only worked if you clicked the exact spot to insert not above or below it).

Wrote my own version completely from scratch in a couple of hours and then played it with my son Noah Schreppers and further improved gameplay.
In my version you can click anywhere on a column to insert a disc and it auto drops to where it should be placed like the real game. If a column is full
the click is rejected and you can safely click another free column.
The algorithm to check for win and tie games is done with just some if's and forloops without a giant static lookup table. 

Noah also suggested adding specials and animations etc. Added some of them like animating a win and a tie nicely. 
Might add some more of those in the near future as he's now hooked on the game ;).

## Play it online
Deployed it here: https://walter.schreppers.com/connect-four/index.html
