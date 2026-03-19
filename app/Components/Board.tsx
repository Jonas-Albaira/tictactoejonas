"use client";

import Square from "@/app/Components/Square";
import { useState, useEffect, useRef } from "react";
import { getBestMove, calculateWinner } from "@/app/utils/minimax";

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
    const [vsAI, setVsAI] = useState(false);

    // Guard against double-firing in React StrictMode
    const aiThinking = useRef(false);

    // ── AI move effect ──────────────────────────────────────────────────────
    useEffect(() => {
        // Only act when it is O's turn, AI mode is on, and the game is still going
        if (!vsAI) return;
        if (xIsNext) return; // it's X's (human's) turn

        const result = calculateWinner(squares);
        if (result || squares.every(Boolean)) return; // game already over

        if (aiThinking.current) return;
        aiThinking.current = true;

        // Small delay so the human can see their move before the AI responds
        const timer = setTimeout(() => {
            const move = getBestMove(squares.slice());
            if (move !== -1) {
                const nextSquares = squares.slice();
                nextSquares[move] = "O";
                setSquares(nextSquares);
                setXIsNext(true);
            }
            aiThinking.current = false;
        }, 350);

        return () => {
            clearTimeout(timer);
            aiThinking.current = false;
        };
    }, [squares, xIsNext, vsAI]);

    // ── Human click handler ─────────────────────────────────────────────────
    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares)) return;
        // In AI mode, only allow X (human) to click
        if (vsAI && !xIsNext) return;

        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    function handleReset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        aiThinking.current = false;
    }

    function handleModeToggle() {
        setVsAI((prev) => !prev);
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        aiThinking.current = false;
    }

    // ── Derived state ───────────────────────────────────────────────────────
    const result = calculateWinner(squares);
    const winner = result?.winner ?? null;
    const winningSquares = result?.line ?? [];
    const isDraw = !winner && squares.every(Boolean);

    // Is the AI currently "thinking" (O's turn, AI mode, game ongoing)?
    const isAITurn = vsAI && !xIsNext && !winner && !isDraw;

    let statusText: string;
    let statusClass: string;
    if (winner) {
        statusText = vsAI
            ? winner === "X"
                ? "You win!"
                : "AI wins!"
            : `Player ${winner} wins!`;
        statusClass = "status winner";
    } else if (isDraw) {
        statusText = "It's a draw!";
        statusClass = "status draw";
    } else if (isAITurn) {
        statusText = "AI is thinking...";
        statusClass = "status ai-thinking";
    } else {
        statusText = vsAI
            ? "Your turn (X)"
            : `Player ${xIsNext ? "X" : "O"}'s turn`;
        statusClass = "status";
    }

    // Squares are disabled when: already filled, game over, or AI is moving
    const squareDisabled = (val: string | null) =>
        !!val || !!winner || isDraw || isAITurn;

    return (
        <div className="game-container">
            <h1 className="game-title">Tic-Tac-Toe</h1>

            {/* Mode toggle */}
            <div className="mode-toggle">
                <button
                    className={`mode-btn${!vsAI ? " active" : ""}`}
                    onClick={() => vsAI && handleModeToggle()}
                >
                    2 Players
                </button>
                <button
                    className={`mode-btn${vsAI ? " active" : ""}`}
                    onClick={() => !vsAI && handleModeToggle()}
                >
                    vs AI
                </button>
            </div>

            <div className={statusClass}>{statusText}</div>

            <div className="board">
                {squares.map((val, i) => (
                    <Square
                        key={i}
                        value={val}
                        isWinning={winningSquares.includes(i)}
                        onSquareClick={() => handleClick(i)}
                        disabled={squareDisabled(val)}
                    />
                ))}
            </div>

            <button className="reset-btn" onClick={handleReset}>
                New Game
            </button>
        </div>
    );
}
