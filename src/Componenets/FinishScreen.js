import React from 'react'

function FinishScreen({dispatch,points,maxPossiblePoints,highscore}) {

    const percentage = (points / maxPossiblePoints) * 100;

    let emoji ; 
    if (percentage === 100) emoji = "🤩";
    else if (percentage > 80) emoji = "😄";
    else if (percentage > 60) emoji = "😐";
    else if (percentage > 40) emoji = "😕";
    else if (percentage > 20) emoji = "😟";
    else emoji = "😢";

  return (
    <div>
      <p className='result'> <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}) %</p>
      <p className='highscore'>Highest points : {highscore} points</p>
      <button class = 'btn btn-ui' onClick={() => dispatch({type:"restart"})}>Restart</button>
    </div>

  )
}

export default FinishScreen