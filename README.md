# Blue Lock Game

Play as **Isagi Yoichi** and dribble past **Nagi** and **Bachira** using your skills and spatial awareness. Outsmart the final wall, **Gagamaru**, and take the perfect shot. Surpass them all and score to win! Can you prove your ego and become the ultimate striker? ⚽🔥

---

## How It Works

### Objective
Score a goal by navigating the grid while avoiding the defenders and the goalkeeper.

### Gameplay
- **Start:**  
  Choose one of the highlighted starting tiles (tiles 25-30) to place Isagi.
- **Shooting:**  
  Press the shoot button (or spacebar) when in the goal area to attempt a shot.
- **Timer:**  
  You have 30 seconds to score before time runs out.
- **Audio:**  
  Enjoy sound effects for dialogue, catches, and goal celebrations.
- **Stats:**  
  Your wins and total games played are saved in your browser using local storage.

---

## File Structure

- **index.html**  
  Sets up the game layout and elements.
- **style.css**  
  Contains the styling for the grid, buttons, and overall game look.
- **game.js**  
  Handles the game logic including:
  - Movement and collision detection.
  - Scoring and timer functionality.
  - Local storage for saving game stats.
- **Audio Files:**  
  - `isagi.mp3` – Audio for Isagi's dialogue.
  - `nagi.mp3` – Sound effect when Nagi catches you.
  - `bachira.mp3` – Sound effect when Bachira catches you.
  - `goal.mp3` – Audio played when a goal is scored.
- **Images:**  
  External image URLs for the characters:
  - **Isagi:** Sourced from Reddit.
  - **Bachira:** Sourced from Pinterest.
  - **Nagi:** Sourced from Pinterest.
  - **Gagamaru:** Sourced from Pinterest.

---

## Controls

### Keyboard Controls
- **W:** Move Up
- **S:** Move Down
- **A:** Move Left
- **D:** Move Right
- **Spacebar:** Shoot

### On-Screen Buttons
- **Directional Buttons:** Up, Down, Left, Right for movement.
- **Shoot Button:** To attempt a goal.

---

## How to Play

1. Open the `index.html` file in your web browser.
2. Choose a starting tile (tiles 25-30) to place Isagi.
3. Use the controls (keyboard WASD or on-screen buttons) to move.
4. Press the shoot button (or spacebar) to try scoring a goal.
5. Enjoy the game and watch your stats update!

---

## Goal Shoot Mechanics

- **When You Shoot:**  
  Isagi can only shoot when positioned in the goal area (tiles 2-5).
- **How It Works:**  
  The game checks if the goalkeeper (Gagamaru) is in a blocking position relative to Isagi.  
  For instance, if Isagi is in tile 1 and Gagamaru is in the adjacent blocking spot, the shot is blocked. Similar checks apply for other goal tiles.
- **Outcome:**  
  - **Blocked Shot:** A "Game Over" message is displayed.
  - **Successful Shot:** A goal sound is played and you win the round.

---

## Defender Movement

- **Defenders:**  
  **Bachira** and **Nagi** actively chase Isagi.
- **Movement Pattern:**  
  - After each move by Isagi, each defender has a 50% chance to move closer.
  - They calculate the distance (both rows and columns) to Isagi and move one step in that direction.
  - If both defenders try to move into the same tile, one adjusts its path to avoid overlapping.
- **Collision:**  
  If a defender lands on the same tile as Isagi, a catch sound plays and the game ends.

---

Enjoy the game and become the ultimate striker!
