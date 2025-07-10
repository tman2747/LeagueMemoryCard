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
function checkChamp() {}

async function getImage() {
  let [champName, champImage] = getChamp();
  let Image = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${LEAGUEVERSION}/img/champion/${champImage}`
  );
  Math.round(Math.random() * Object.keys(ChampionJson.data));
  return { Name: champName, ImageUrl: Image.url };
}

async function getChampList() {
  let champList = [];
  for (let index = 0; index < 10; index++) {
    champList[index] = await getImage();
  }
  console.log(champList);
  return champList;
}

function MemoryCard() {
  const [info, setInfo] = useState({ name: null, image: null, Seen: false });
  useEffect(() => {
    getImage().then((champ) => {
      setInfo(() => ({ name: champ.name, image: champ.ImageUrl }));
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
getChampList();
export default MemoryCard;
