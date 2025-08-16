import { useState, useMemo } from "react";
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

const SIZE = 24; // must be even

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

function Card({ img, idx, onFlip, matched }) {
  const [flipped, setFlipped] = useState(false);

  function handleClick() {
    if (flipped || matched) return;
    const allowed = onFlip(idx, img, setFlipped);
    if (allowed) setFlipped(true);
  }

  return (
    <div
      className={`w-50 h-55 m-2 perspective ${
        matched ? "scale-110 opacity-0 transition-all duration-500" : ""
      }`}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform preserve-3d hover:scale-105 cursor-pointer ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front face */}
        <div className="absolute inset-0 backface-hidden flex justify-center items-center bg-gray-700 rounded-3xl shadow-2xl">
          <span className="text-8xl text-white">?</span>
        </div>

        {/* Back face */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl shadow-2xl overflow-hidden">
          <img
            src={img}
            alt={`Card ${idx}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function Container() {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  const images = useMemo(() => generateCardImages(SIZE), []);

  function handleFlip(idx, img, setCardFlipped) {
    if (isBusy || matchedCards.includes(idx)) return false;

    const pending = [...flippedCards, { idx, img, setCardFlipped }];

    if (pending.length === 1) {
      setFlippedCards(pending);
      return true;
    }

    if (pending.length === 2) {
      setIsBusy(true);
      setFlippedCards(pending);
      const [a, b] = pending;

      if (a.img === b.img) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, a.idx, b.idx]);
          setFlippedCards([]);
          setIsBusy(false);
        }, 300);
      } else {
        setTimeout(() => {
          a.setCardFlipped(false);
          b.setCardFlipped(false);
          setFlippedCards([]);
          setIsBusy(false);
        }, 1000);
      }
      return true;
    }

    return false;
  }

  const gameWon = matchedCards.length === SIZE;

  return (
    <>
      <div className="container bg-gray-800 grid grid-cols-6 m-auto rounded-2xl items-center justify-center p-5 w-fit">
        {images.map((img, idx) => (
          <Card
            key={idx}
            img={img}
            idx={idx}
            onFlip={handleFlip}
            matched={matchedCards.includes(idx)}
          />
        ))}
      </div>

      {gameWon && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white bg-gray-800 p-6 rounded-2xl shadow-2xl">
          🎉 You beat the game!
        </div>
      )}
    </>
  );
}

function generateCardImages(size) {
  const selected = [];
  for (let i = 0; i < size / 2; i++) {
    const img = IMAGES[i % IMAGES.length];
    selected.push(img, img);
  }
  // Fisher–Yates shuffle
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }
  return selected;
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
