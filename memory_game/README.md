# Top react memory game

managing state and use effect in a react app

## game logic:

the game logic is reduced into few functions:
1. function to fetch the play cards list via seteffect on page load
2. function to start a new game on new game button click and on mounts alos via use effect
3. function to play a turn, updating state
4. function to shuffle the cards on each turn
5. function to display a message on each turn
6. function to reset the game and display the end message at the end of a game

## the state:
Initial state:
1. state to store the intial fetch
2. state to store the cards deck for re shuffling
3. states to keep track of the score, best score, the diffuculty choice for next game
4. state to update the displayed message
   
Added state for bug fixes:

1. state to keep track of the current game difficulty (because changing the difficulty after a game ends would display a wrong score)
2. state to keep track of whether a game is running or not (to prevent unnecessary function firing on card clicks after game ends)
3. state to keep track of all selected cards (just to display a visual outline of correct and false answers at the end)

## learning points:
useEffect is a useful tool that should be avoided unless it is really need to - better keep it at a minimum. 
