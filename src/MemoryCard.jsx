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

function addSeenChamp() {}

async function getImage() {
  let [champName, champImage] = getChamp();
  let Image = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${LEAGUEVERSION}/img/champion/${champImage}`
  );
  Math.round(Math.random() * Object.keys(ChampionJson.data));
  return [champName, Image.url];
}

function MemoryCard() {
  const [info, setInfo] = useState({ name: null, image: null });
  console.log(info);
  useEffect(() => {
    getImage().then((champ) => {
      setInfo(() => ({ name: champ[0], image: champ[1] }));
    });
  }, []);

  return (
    <>
      <div>hello</div>
      <div>Picture Area</div>
      <div className="pictureContainer">
        <div className="picture">
          <img src={info.image} alt="" />
        </div>
      </div>
    </>
  );
}

export default MemoryCard;
