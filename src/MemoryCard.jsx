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
function checkChampSeen() {}

async function getImage() {
  let [champName, champImage] = getChamp();
  let Image = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${LEAGUEVERSION}/img/champion/${champImage}`
  );
  Math.round(Math.random() * Object.keys(ChampionJson.data)); // currently this can give me a out of bound index
  return { Name: champName, ImageUrl: Image.url };
}

async function getChampList() {
  console.log("function called");
  let champList = [];
  for (let index = 0; index < 10; index++) {
    champList[index] = await getImage();
  }
  return champList;
}

function MemoryCard() {
  const [info, setInfo] = useState([
    { name: null, ImageUrl: null, Seen: false },
  ]);
  useEffect((prev) => {
    getChampList().then((champ) => {
      setInfo((i) => {
        return champ;
      });
    });
  }, []);

  return (
    <>
      <div>hello</div>
      <div>Picture Area</div>
      <div className="pictureContainer">
        <div className="picture">
          {info.map((item, index) => (
            <div key={index}>
              <img src={item.ImageUrl} alt="" />
            </div> // need to change key this probably doesnt work. add key to the object probably in get champlist
          ))}
        </div>
      </div>
    </>
  );
}
export default MemoryCard;
