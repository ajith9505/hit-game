import React, { useState, useEffect } from 'react';

const Game = () => {
    const [boxes, setBoxes] = useState(Array(9).fill(false));
    const [score, setScore] = useState(0);
    const [activeBox, setActiveBox] = useState(-1);
    const [remainingSec, setRemainingSec] = useState(0);
    const [boxClicked, setBoxClicked] = useState(false);
    const [gameOn, setGameOn] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const start = () => {
        setRemainingSec(60);

        const interval = setInterval(() => {
            // geting random number 0 to 9
            const newBox = Math.floor(Math.random() * 9);
            //selecting ramdon boxes
            setBoxes((boxes) => boxes.map((ele, index) => index === newBox));
            //getting randomly selected box as active box
            setActiveBox(newBox);
        }, 1000);

        //handling score for missing chance
        const handleScore = setInterval(() => {
            if (!boxClicked) {
                if (score > 0) {
                    setScore(prev => prev - 2.5);
                }
            };
            setBoxClicked(false);
            //decreasing timer
            setRemainingSec(prev => prev - 1);
        }, 1000)

        //clearing the time intervals
        setTimeout(() => {
            clearInterval(interval);
            clearInterval(handleScore);
            setGameOver(true);
        }, 60000);
    }

    //handling clik on boxes
    const handleClick = (index) => {
        setBoxClicked(true);
        setGameOn(true);
        //after clicking right box score will be increased by 5
        if (index === activeBox) {
            setScore(score + 5);
            setActiveBox(-1);
        } else {
            if (score > 0) {
                //otherwise decreases by 2.5
                setScore(score - 2.5);
            }
        }
    };

    return (
        <div className="game">
            <h1>Hit Game</h1>
            {!gameOver ?
                <div>
                    <p>Score: {score}</p>
                    {remainingSec > 0 && <p>{`${remainingSec} seconds remaining`}</p>}
                    <div className="grid">
                        {boxes.map((ele, index) => (
                            <div
                                key={index}
                                className={`box ${ele ? 'active' : ''}`}
                                onClick={() => handleClick(index)}
                            >
                                {ele ? 'hit' : ''}
                            </div>
                        ))}
                    </div>
                    {!gameOn && <button onClick={start}>Start</button>}
                    {gameOn && <button onClick={() => location.reload()}>Re Start</button>}
                </div>
                :
                <div>{`Toatal score ${score}`}</div>
            }
        </div>
    );
};

export default Game;
