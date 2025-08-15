import { useState } from "react";
import "./App.css";

const SIZE = 24; //Size should always be an even number
function Card() {
  return (
    <div className="card size-50 bg-gray-700 rounded-3xl m-3 shadow-2xl hover: cursor-pointer transform hover:scale-105 transition-transform duration-200 ease-in-out">
      <img src="" alt="" />
    </div>
  );
}

const IMAGES = [
  "https://www.flaticon.com/free-stickers/emoticon",
  "https://www.flaticon.com/free-stickers/bear",
  "https://www.flaticon.com/free-stickers/funny",
  "https://www.flaticon.com/free-stickers/duck",
  "https://www.flaticon.com/free-stickers/bird",
  "https://www.flaticon.com/free-stickers/bear",
  "https://www.flaticon.com/free-stickers/duck",
  "https://www.flaticon.com/free-stickers/love",
  "https://www.flaticon.com/free-stickers/death",
  "https://www.flaticon.com/free-stickers/bear",
  "https://www.flaticon.com/free-stickers/bear",
  "https://www.flaticon.com/free-stickers/bunny",
  "https://www.flaticon.com/free-stickers/lion",
];

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

function generateCardImages(SIZE) {
  let selectedImages = [];

  for (let i = 0; i < SIZE / 2; i++) {
    let img = IMAGES[i % IMAGES.length];
    selectedImages.push(img, img); // Push each image twice for pairs
  }

  //Fisher-Yates shuffle algorithm
  for (let i = selectedImages.length - 1; i > 0; i--) {
    //loop from the end to beginning
    const j = Math.floor(Math.random() * (i + 1)); //Pick a random index
    [selectedImages[i], selectedImages[j]] = [
      selectedImages[j],
      selectedImages[i],
    ]; //swap the elements
  }
  return selectedImages;
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
