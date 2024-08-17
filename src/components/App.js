import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import { createUser, markNumber, checkWin, clearUserData } from '../API/userApi';

const App1 = () => {
    const [grid1, setGrid1] = useState(Array(3).fill(Array(3).fill(null)));
    const [grid2, setGrid2] = useState(Array(3).fill(Array(3).fill(null)));
    const [crossedNumbers, setCrossedNumbers] = useState([]);
    const [winner, setWinner] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [lastGeneratedNumber, setLastGeneratedNumber] = useState(null);
    
    const generateRandomNumber = () => {
        const number = Math.floor(Math.random() * 9) + 1;
        handleNumberGenerated(number);
        return number;
    };

    const startGame = async () => {
        clearUserData();
        await createUser('User 1', grid1);
        await createUser('User 2', grid2);
        setCrossedNumbers([]);
        setWinner(null);
        setLastGeneratedNumber(null);
        setIsGameRunning(true);

        const id = setInterval(async () => {
            const number = generateRandomNumber();
            if (number !== undefined) {
                handleNumberGenerated(number);
            }
        }, 2000); 
        
        setIntervalId(id);
        console.log(intervalId);
    };

    const stopGame = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIsGameRunning(false);
        }
    };

    const handleNumberGenerated = async (number) => {
        setCrossedNumbers((prev) => [...prev, number]);
        setLastGeneratedNumber(number);
    
        await markNumber('User 1', number);
        await markNumber('User 2', number);

        const res1 = await checkWin('User 1');
        const res2 = await checkWin('User 2');
        
        // console.log(res1.data);
        // console.log(res2.data);
        
        if (res1.data.message.includes('wins') && res2.data.message.includes('wins')) {
            setWinner('Tie');
            stopGame();
        } 
        else if(res1.data.message.includes('wins')) {
            setWinner('User 1');
            stopGame(); 
        }
        else if (res2.data.message.includes('wins')) {
            setWinner('User 2');
            stopGame();
        }
    };

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
                setIsGameRunning(!isGameRunning);
            }
        };
    }, [intervalId,winner,isGameRunning]);


    return (
        <div className="App">
            <h1>El Lotteria Game</h1>
            <div className="grids">
                <div>
                    <h2>User 1</h2>
                    <Grid grid={grid1} setGrid={setGrid1} crossedNumbers={crossedNumbers}/>
                </div>
                <div>
                    <h2>User 2</h2>
                    <Grid grid={grid2} setGrid={setGrid2} crossedNumbers={crossedNumbers}/>
                </div>
            </div>

            <button onClick={startGame} disabled={isGameRunning}>Start Game</button>
            
            <button onClick={stopGame} disabled={!isGameRunning}>Stop Game</button>

            {lastGeneratedNumber && <h2>Generated Number: {lastGeneratedNumber}</h2>}
            {winner && (winner === 'Tie' ? <h2>Game Tied!</h2> : <h2>{winner} Wins!</h2>)}
        </div>
    );
};

export default App1;











