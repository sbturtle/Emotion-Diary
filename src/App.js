import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useRef } from "react";

import Home from "./Pages/Home";
import New from "./Pages/New";
import Edit from "./Pages/Edit";
import Diary from "./Pages/Diary";
import { useReducer } from "react";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      newState = [action.data, ...state];
      break;
    case "REMOVE":
      newState = state.filer((it) => it.id !== action.targetId);
      break;
    case "EDIT":
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const dummyData = [
    { id: 1, emotion: 1, content: "오늘의 일기 1", date: 1705388837639 },
    { id: 2, emotion: 4, content: "오늘의 일기 2", date: 1705389550885 },
    { id: 3, emotion: 5, content: "오늘의 일기 3", date: 1705389550886 },
    { id: 4, emotion: 2, content: "오늘의 일기 4", date: 1705389550887 },
    { id: 5, emotion: 5, content: "오늘의 일기 5", date: 1705389550888 },
  ];
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CRAETE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
