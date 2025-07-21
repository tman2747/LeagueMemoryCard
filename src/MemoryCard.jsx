import { useEffect, useState } from "react";
import ChampionJson from "./assets/champion.json";
const key = import.meta.env.VITE_API_KEY;
const LEAGUEVERSION = "15.13.1";
const numberOfChamps = 15;

function getChamp() {
  let champName = Object.keys(ChampionJson.data)[
    Math.floor(Math.random() * Object.keys(ChampionJson.data).length)
  ];
  let champImage = ChampionJson.data[champName].image.full; // can currently get dupes of the same champ
  return [champName, champImage];
}

async function getImage() {
  let [champName, champImage] = getChamp();
  let Image = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${LEAGUEVERSION}/img/champion/${champImage}`
  );
  Math.floor(Math.random() * Object.keys(ChampionJson.data)); // currently this can give me a out of bound index
  return { Name: champName, ImageUrl: Image.url, Seen: false };
}

async function getChampList() {
  let champList = [];
  let index = 0;
  while (champList.length < numberOfChamps) {
    let champ = await getImage();
    if (!champList.some((newchamp) => newchamp.Name === champ.Name)) {
      champList.push(champ);
      champ.id = index;
      index++;
    }
  }
  //await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate lag // currently 1 second
  return champList;
}

function MemoryCard() {
  const [info, setInfo] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [triggerReset, setResetTrigger] = useState(0);
  useEffect(() => {
    getChampList().then((champ) => {
      setInfo(() => {
        return champ;
      });
    });
  }, [triggerReset]);

  function shuffleChamps() {
    let arr = info.slice(); // create a copy to avoid mutating the original
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // pick a random index
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap elements
    }
    return arr;
  }

  function onClickChamp(target) {
    if (target.Seen == true) {
      console.log("you've already seen this champ");
      setScore(0);
      return;
    }
    setScore((score) => score + 1);

    if (score >= highScore) {
      setHighScore(highScore + 1);
    }
    setInfo(() => {
      let arr = shuffleChamps();
      console.log(arr);
      const returnValue = arr.map((element) => {
        if (element.id == target.id) {
          return { ...element, Seen: true };
        } else return element;
      });
      return returnValue;
    });
  }
  return (
    <>
      <div className="app">
        <div className="scoreWrapper">
          <div className="highScore score">High Score: {highScore}</div>
          <div className="score">Score: {score}</div>
          <div> </div>
        </div>
        <div className="pictureContainer">
          <div className="picture">
            {info.map((item) => (
              <div key={item.id} className="champPicture">
                <img
                  onClick={() => onClickChamp(item)}
                  src={item.ImageUrl}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => setResetTrigger((prev) => prev + 1)}>
          Reset Board
        </button>
      </div>
    </>
  );
}
export default MemoryCard;
