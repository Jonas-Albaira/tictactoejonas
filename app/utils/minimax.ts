/**
 * Minimax algorithm for Tic-Tac-Toe AI.
 * The AI always plays as "O" (the second player / maximising player).
 * "X" is the minimising player (human).
 *
 * Score convention:
 *   +10  => O wins
 *   -10  => X wins
 *    0   => draw
 */

export type Board = (string | null)[];

// ─── Win detection ────────────────────────────────────────────────────────────

const LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
] as const;

export interface WinResult {
    winner: string;
    line: number[];
}

export function calculateWinner(squares: Board): WinResult | null {
    for (const [a, b, c] of LINES) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a]!, line: [a, b, c] };
        }
    }
    return null;
}

// ─── Minimax ──────────────────────────────────────────────────────────────────

function score(squares: Board): number {
    const result = calculateWinner(squares);
    if (result?.winner === "O") return 10;
    if (result?.winner === "X") return -10;
    return 0;
}

function isTerminal(squares: Board): boolean {
    return !!calculateWinner(squares) || squares.every(Boolean);
}

/**
 * Minimax with alpha-beta pruning.
 *
 * @param squares  Current board state
 * @param depth    Depth remaining (used to prefer faster wins)
 * @param isMaximising  true when it's O's turn to move
 * @param alpha    Best score the maximising player can guarantee
 * @param beta     Best score the minimising player can guarantee
 */
function minimax(
    squares: Board,
    depth: number,
    isMaximising: boolean,
    alpha: number,
    beta: number,
): number {
    if (isTerminal(squares)) {
        // Prefer wins that arrive sooner (higher depth remaining = fewer moves taken)
        const s = score(squares);
        return s === 0 ? 0 : s > 0 ? s + depth : s - depth;
    }

    if (isMaximising) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (squares[i]) continue;
            squares[i] = "O";
            best = Math.max(best, minimax(squares, depth - 1, false, alpha, beta));
            squares[i] = null;
            alpha = Math.max(alpha, best);
            if (beta <= alpha) break; // β cut-off
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (squares[i]) continue;
            squares[i] = "X";
            best = Math.min(best, minimax(squares, depth - 1, true, alpha, beta));
            squares[i] = null;
            beta = Math.min(beta, best);
            if (beta <= alpha) break; // α cut-off
        }
        return best;
    }
}

/**
 * Returns the index of the best move for the AI (playing as "O").
 * Returns -1 when no move is available.
 */
export function getBestMove(squares: Board): number {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
        if (squares[i]) continue;
        squares[i] = "O";
        const s = minimax(squares, 9, false, -Infinity, Infinity);
        squares[i] = null;
        if (s > bestScore) {
            bestScore = s;
            bestMove = i;
        }
    }

    return bestMove;
}
