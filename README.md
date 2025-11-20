# 🎮 Tic-Tac-Toe Mini-Game  
### _A simple interactive Tic-Tac-Toe game built with React and TypeScript._

This project implements a **classic Tic-Tac-Toe** game where two players take turns marking "X" or "O" on a 3x3 grid. The game automatically detects a winner or indicates the next player’s turn.

---

## ✨ Features

- Interactive 3x3 board  
- Clickable squares for X or O  
- Automatic win detection for all combinations: rows, columns, diagonals  
- Dynamic status display: shows the next player or the winner  
- Lightweight, client-side React implementation  
- TypeScript support  

---

## 🕹️ How to Play

1. Open the game in the browser.  
2. Click on an empty square to place your mark ("X" or "O").  
3. Players alternate turns.  
4. The game detects a winner as soon as a row, column, or diagonal is filled.  
5. If all squares are filled and there is no winner, the game ends in a draw.  

---

## 🧩 How It Works

### Board Component

- Maintains **game state** using React `useState`:
  - `squares` — array of 9 elements representing the board  
  - `xIsNext` — boolean tracking whose turn it is  
- `handleClick(i)` updates the state when a square is clicked, unless the square is already filled or the game has a winner.  
- `calculateWinner(squares)` checks all possible winning combinations.

```ts
const winner = calculateWinner(squares);
let status = winner ? "Winner: " + winner : "Next player: " + (xIsNext ? "X" : "O");
