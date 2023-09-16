import React, { useEffect, useReducer } from "react";
import "./App.css";
import DateCounter from "./Componenets/DateCounter";
import Header from "./Componenets/Header";
import Main from "./Componenets/Main";
import Loader from "./Componenets/Loader";
import Error from "./Componenets/Error";
import StartScreen from "./Componenets/StartScreen";
import Question from "./Componenets/Question";
import NextButton from "./Componenets/NextButton";
import Progress from "./Componenets/Progress";
import FinishScreen from "./Componenets/FinishScreen";
import Footer from "./Componenets/Footer";
import Timer from "./Componenets/Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore:0,
  secondsRemaining : null
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining : state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions[state.index];
      if (!question) {
        return state;
      }
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

      case "nextQuestion" : 
      return {...state,index:state.index + 1,answer:null};

      case "finish":
        return {...state,status:"finished",highscore:state.points > state.highscore ? state.points : state.highscore}

        case "restart":
          return {...initialState,questions : state.questions,status:"ready"}

          case "tick":
            return{
              ...state,secondsRemaining:state.secondsRemaining - 1,
              status : state.secondsRemaining === 0 ? "finished" : state.status
            }

    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [{ questions, status, index, answer,points,highscore,secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );
  console.log(points,"POINTS")
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev,cur) =>prev + cur.points,0)

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
          <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
            <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
            
          />
          <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
          <NextButton dispatch = {dispatch} answer={answer} index={index} numQuestions={numQuestions} />
          </Footer>
         
          </>
        
        )}

        {status === 'finished' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}

export default App;
