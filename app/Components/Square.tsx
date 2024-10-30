"use client";

// @ts-expect-error: The props are implicitly typed, leading to TypeScript errors.
function Square({value, onSquareClick }) {

    return (
            <button
                className="square"
                onClick={onSquareClick}
            >{value}
            </button>
    );
}
export default Square;
