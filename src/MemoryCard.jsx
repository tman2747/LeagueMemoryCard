import { useEffect, useState } from "react";
import ChampionJson from "./assets/champion.json";
const key = import.meta.env.VITE_API_KEY;
const LEAGUEVERSION = "15.13.1";

function getChamp() {
  let champName = Object.keys(ChampionJson.data)[
    Math.round(Math.random() * Object.keys(ChampionJson.data).length)
  ];
  let champImage = ChampionJson.data[champName].image.full;
  return [champName, champImage];
}

async function getImage() {
  let [champName, champImage] = getChamp();
  let Image = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${LEAGUEVERSION}/img/champion/${champImage}`
  );
  Math.round(Math.random() * Object.keys(ChampionJson.data)); // currently this can give me a out of bound index
  return { Name: champName, ImageUrl: Image.url, Seen: false };
}

async function getChampList() {
  let champList = [];
  for (let index = 0; index < 10; index++) {
    champList[index] = await getImage();
    champList[index].id = index;
  }
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate lag // currently 1 second
  return champList;
}

function MemoryCard() {
  const [info, setInfo] = useState([]);
  const [score, setScore] = useState(0);
  useEffect(() => {
    getChampList().then((champ) => {
      setInfo(() => {
        return champ;
      });
    });
  }, []);

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
      <div>Score: {score}</div>
      <div>Picture Area</div>
      <div className="pictureContainer">
        <div className="picture">
          {info.map((item) => (
            <div key={item.id} className="champPicture">
              <p>
                {"ID: " + item.id} {"Champ Name: " + item.Name} {item.ImageUrl}{" "}
                {item.Seen ? "true" : "false"}
              </p>
              <img
                onClick={() => onClickChamp(item)}
                src={item.ImageUrl}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default MemoryCard;
