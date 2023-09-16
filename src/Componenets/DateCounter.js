import { useReducer, useState } from "react";
const initialState = {count:0,step:1};

function reducer (state,action){
    console.log(state,action);
    
    // return state + action;
    // return {count : 0, step:1};
    // if (action.type === "inc") return state + 1;
    // if(action.type === "dec") return state - 1;
    // if(action.type === "setCount") return action.payload;
    switch(action.type) {
        case "dec" :
            return {...state,count:state.count - state.step };
        case "inc" :
            return {...state, count:state.count + state.step};
        case "setCount" :
            return {...state,count:action.payload};
        case "setStep" :
            return {...state,step:action.payload}; 
        case "reset" : {
            return initialState;
        }         
        default :
              throw new Error("Unknown action")  
        
    }
}

export default function DateCounter() {
//   const [step, setStep] = useState(1);
//   const [value, setValue] = useState(0);

const [state,dispatch] = useReducer(reducer,initialState);
const {count,step} = state;

  const date = new Date("june 21 2027");
//   date.setDate(date.getDate() + value);
  

  const defineStep = (e) => {
    dispatch ({type: "setStep" , payload:Number(e.target.value)});
    // setStep(Number(e.target.value));
  };

  const defineCount = (e) => {
    dispatch({type:"setCount" , payload : Number(e.target.value)})
    // setValue(Number(e.target.value));
  };

  const dec = () => {
    dispatch({type:"dec"});
    // setValue((value) => value - step);
  };

  const inc = () => {
    dispatch({type:"inc" });
    // setValue((value) => value + step);
  };

  const reset =() => {
    dispatch({type:"reset"});
    // setStep(1);
    // setValue(0);
  }

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />

        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input type="number" value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
