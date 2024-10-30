"use client";

// @ts-expect-error: props are implicitly typed here
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
