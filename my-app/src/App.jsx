import { useState } from "react";
import "./App.css";
import sticker1 from "../assets/fischl_1.jpg";
import sticker2 from "../assets/furina_1.jpg";
import sticker3 from "../assets/hu_tao_1.jpg";
import sticker4 from "../assets/keqing_1.jpg";
import sticker5 from "../assets/klee_1.jpg";
import sticker6 from "../assets/klee_2.jpg";
import sticker7 from "../assets/nahida_1.jpg";
import sticker8 from "../assets/nahida_2.jpg";
import sticker9 from "../assets/navia_1.jpg";
import sticker10 from "../assets/navia_2.jpg";
import sticker11 from "../assets/yoimiya_1.jpg";
import sticker12 from "../assets/paimon_2.jpg";
import sticker13 from "../assets/yoimiya_2.jpg";
import sticker14 from "../assets/yoimiya_3.jpg";
import sticker15 from "../assets/yae_1.jpg";
import sticker16 from "../assets/shogun_1.jpg";
import sticker17 from "../assets/paimon_1.jpg";

const SIZE = 24; //Size should always be an even number

const IMAGES = [
  sticker1,
  sticker2,
  sticker3,
  sticker4,
  sticker5,
  sticker6,
  sticker7,
  sticker8,
  sticker9,
  sticker10,
  sticker11,
  sticker12,
  sticker13,
  sticker14,
  sticker15,
  sticker16,
  sticker17,
];

function Card({ img, idx }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`relative w-full h-full transition-transform duration-500 transform ${flipped ? "rotate-y-180" : ""}`}
      onClick={handleClick}
    >
      <div
        className="
          card size-50 bg-gray-700 rounded-3xl 
          m-3 shadow-2xl hover: cursor-pointer 
          transform hover:scale-105 transition-transform 
          duration-200 ease-in-out flex justify-center items-center"
      >
        {loadImage({ flipped, img, idx })}
      </div>
    </div>
  );

  function loadImage({ flipped, img, idx }) {
    if (!flipped) {
      return <span className=" text-8xl">?</span>;
    } else {
      <img
        src={img}
        alt={`Card ${idx}`}
        className="w-full h-full object-cover rounded-3xl shadow-2xl"
      />;
    }
  }

  function handleClick() {
    if (!flipped) {
      setFlipped(true);
    }
  }
}

function Container() {
  const cards = [];
  const images = generateCardImages(SIZE);
  for (let i = 0; i < SIZE; i++) {
    cards.push(<Card />);
  }
  return (
    <div className="container bg-gray-800 grid grid-cols-6 m-auto rounded-2xl items-center justify-center p-5 w-fit">
      {images.map((img, idx) => (
        <Card key={idx} img={img} idx={idx} />
      ))}
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
