import React from 'react';
import './grid.css'

const Grid = ({ grid, setGrid , crossedNumbers}) => {
    const handleChange = (e, rowIndex, colIndex) => {
        const newValue = parseInt(e.target.value, 10);
        if (newValue < 1 || newValue > 9 || isNaN(newValue)) return;

        const newGrid = grid.map((row, rIndex) => 
            rIndex === rowIndex 
                ? row.map((cell, cIndex) => 
                    cIndex === colIndex 
                        ? newValue 
                        : cell
                ) 
                : row
        );

        setGrid(newGrid);
    };

    return (
        <div className="grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                    {row.map((num, colIndex) => {
                        const isCrossed = crossedNumbers.includes(num);
                        return (
                        <input
                            key={colIndex}
                            type="number"
                            value={num || ''}
                            onChange={(e) => handleChange(e, rowIndex, colIndex)}
                            min="1"
                            max="9"
                            required
                            className={isCrossed ? 'crossed' : ''}
                            // disabled={isCrossed}
                        />
                    )})}
                </div>
            ))}
        </div>
    );
};

export default Grid;
