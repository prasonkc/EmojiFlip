import { useState } from "react";
import "./App.css";

const SIZE = 24; //Size should always be an even number
function Card() {
  return (
    <div className="card size-50 bg-gray-700 rounded-3xl m-3">
      <img src="" alt="" />
    </div>
  );
}

function Container() {
  const cards = [];
  for (let i = 0; i < SIZE; i++) {
    cards.push(<Card />);
  }
  return (
    <div className="container bg-gray-800 grid grid-cols-6 m-auto rounded-2xl items-center justify-center p-5 w-fit">
      {cards}
    </div>
  );
}

function App() {
  return (
    <>
      <h1 className="text-center">Flip Your Cards!!</h1>

      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <Container />
      </div>
    </> 
  );
}

export default App;
