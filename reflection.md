**Major Project Reflection**

*Problems I Couldn't Solve*
- The top row of the grid (when y === 0) is not functional with the game. The character cannot move into the top row. I couldn't find the line of code causing the problem so I added a black border around the screen.
- The way flood fill works during the game isn't ideal. It works by allowing whoever last moved their character to use flood fill. This could be a problem when two people are competing during an actual game. Ideally the flood fill would automatically activate when a character hits its land mass.
- The function that keeps track of where it is appropriate to flood for each character is buggy. It keeps track of the farthest x and y values of the character, and if flood fill is within that range then it will flood. The problem with that is that if you have reach a farther x or y value previously and click outside of the area you should be able to flood, it may flood to the farthest x and y values. I couldn't think of a better solution to fix this problem besides autoflood.

*If you were to do this project again what would you do differently?*
- Figure out the most complicated aspects of the project first, before you deal with more basic game functions(ex. flood fill, ai). Would have allowed me more time to figure out the best way to execute these functions.
- Create a more basic needs to have list. Keep anything that you think could be a gamble to complete in your nice to have list. For me I would have switched multiplayer and generative ai.
- Make use of more p5play functions. They may help simplify some more basic parts of your code (buttons, collisions, etc.) so you can focus more on the function of the actual game.


*Is everything done on your needs to have list?*
- Everything is done for the most part besides Other Interactive Characters/AI. This section of my list was very vague and becomes redundant with the Multiplayer option from the Nice to Have list.

*Hardest part of the project?*
- Learning how to complete the flood fill algorithm. It was usually little things in my function that prevented it from working.