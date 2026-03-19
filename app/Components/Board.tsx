"use client";

import Square from "@/app/Components/Square";
import { useState } from "react";

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares)) return;

        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    function handleReset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    const result = calculateWinner(squares);
    const winner = result?.winner ?? null;
    const winningSquares = result?.line ?? [];
    const isDraw = !winner && squares.every(Boolean);

    let statusText: string;
    let statusClass: string;
    if (winner) {
        statusText = `Player ${winner} wins!`;
        statusClass = "status winner";
    } else if (isDraw) {
        statusText = "It's a draw!";
        statusClass = "status draw";
    } else {
        statusText = `Player ${xIsNext ? "X" : "O"}'s turn`;
        statusClass = "status";
    }

    return (
        <div className="game-container">
            <h1 className="game-title">Tic-Tac-Toe</h1>

            <div className={statusClass}>{statusText}</div>

            <div className="board">
                {squares.map((val, i) => (
                    <Square
                        key={i}
                        value={val}
                        isWinning={winningSquares.includes(i)}
                        onSquareClick={() => handleClick(i)}
                        disabled={!!val || !!winner || isDraw}
                    />
                ))}
            </div>

            <button className="reset-btn" onClick={handleReset}>
                New Game
            </button>
        </div>
    );
}

function calculateWinner(squares: (string | null)[]): { winner: string; line: number[] } | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a]!, line: [a, b, c] };
        }
    }
    return null;
}
