"use client";

interface SquareProps {
    value: string | null;
    isWinning: boolean;
    onSquareClick: () => void;
    disabled: boolean;
}

function Square({ value, isWinning, onSquareClick, disabled }: SquareProps) {
    const classes = [
        "square",
        value ? value.toLowerCase() : "",
        isWinning ? "winning" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button className={classes} onClick={onSquareClick} disabled={disabled}>
            {value}
        </button>
    );
}

export default Square;
