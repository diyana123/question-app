import React from 'react'

function Progress({index,numQuestions,points,maxPossiblePoints,answer}) {
    console.log(points,"points")
  return (
   <header className = "progress">
    <progress max={numQuestions} value={index + Number(answer !== null)}/>
    <p>Question
        <strong>{index}</strong> / {numQuestions}
    </p>
    <p><strong>{points}</strong> / {maxPossiblePoints}</p>
   </header>
  )
}

export default Progress