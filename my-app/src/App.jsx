import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <h1 className="text-center">Flip Your Cards!!</h1>

      <div className="h-screen bg-gray-900 flex items-center justify-center">

        <div className="container bg-gray-800  flex m-auto h-[90vh] rounded-lg items-center justify-start p-10 gap-5">

        <div className="card size-50 bg-gray-700 rounded-3xl sh"></div>
        <div className="card size-50 bg-gray-700 rounded-3xl sh"></div>
        <div className="card size-50 bg-gray-700 rounded-3xl sh"></div>
      </div>
      </div>
    </>
  );
}

export default App;
