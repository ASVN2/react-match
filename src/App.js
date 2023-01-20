import { useEffect, useState } from 'react';
import Card from './components/Card';

const cards = [
  { src: '/assest/basketball.png', matched: false },
  { src: '/assest/closed_book.png', matched: false },
  { src: '/assest/comet.png', matched: false },
  { src: '/assest/cookie.png', matched: false },
  { src: '/assest/dizzy_face.png', matched: false },
  { src: '/assest/gear.png', matched: false },
  { src: '/assest/grapes.png', matched: false },
  { src: '/assest/tent.png', matched: false },
  { src: '/assest/tv.png', matched: false },
];

function App() {
  const [datacard, setDatacard] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choseOne, setChoseOne] = useState(null);
  const [choseTwo, setChoseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffled = [...cards, ...cards].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));
    setTurns(0);
    setDatacard(shuffled);
    setChoseOne(null);
    setChoseTwo(null);
    setDisabled(false);
  };

  // put value in states
  const matchHandler = (card) => {
    choseOne ? setChoseTwo(card) : setChoseOne(card);
  };

  // match the cards
  useEffect(() => {
    if (choseOne && choseTwo) {
      setTurns((prevTurn) => prevTurn + 1);
      setDisabled(true);
      setTimeout(() => {
        reset();
      }, 500);
      if (choseOne.src === choseTwo.src) {
        setDatacard((prevcards) => {
          return prevcards.map((card) => {
            if (card.src === choseOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      } else {
        setTimeout(() => {
          reset();
        }, 500);
      }
    }
  }, [choseOne, choseTwo]);

  //reset
  const reset = () => {
    setChoseOne(null);
    setChoseTwo(null);
    setDisabled(false);
  };

  console.log(datacard);

  return (
    <div className="my-6 ">
      <h1 className="text-red-400 text-4xl pb-2 uppercase">Match the cards ✨</h1>

      <div className="flex gap-5 place-items-center justify-center">
        <h2 className="text-gray-400 ">
          You have flipped <span className="text-white text-xl ">{turns}</span> time
        </h2>
        <button onClick={shuffleCards} className="my-2 bg-red-300 p-1 px-2 rounded-md text-gray-900 hover:bg-orange-300 transition-all active:scale-75">
          New Game
        </button>
      </div>
      <div className="grid grid-cols-6 mt-5 p-3 gap-3 bg-gray-900 rounded-2xl container mx-auto max-w-[1000px]">
        {datacard.map((card) => {
          return <Card key={card.id} disabled={disabled} flipped={card === choseOne || card === choseTwo || card.matched} card={card} matchHandler={matchHandler} />;
        })}
      </div>
    </div>
  );
}

export default App;
