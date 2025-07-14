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

function checkChampSeen() {}

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
  return champList;
}

function MemoryCard() {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    getChampList().then((champ) => {
      setInfo(() => {
        return champ;
      });
    });
  }, []);

  function addSeenChamp(target) {
    console.log("called");
    setInfo(
      info.map((element) => {
        if (element.id == target.id) {
          return { ...element, Seen: true };
        } else {
          return element;
        }
      })
    );
    console.log(info);
  }
  return (
    <>
      <div>hello</div>
      <div>Picture Area</div>
      <div className="pictureContainer">
        <div className="picture">
          {info.map((item) => (
            <div key={item.id}>
              <p>
                {"ID: " + item.id} {"Champ Name: " + item.Name} {item.ImageUrl}{" "}
                {item.Seen ? "true" : "false"}
              </p>
              <img
                onClick={() => addSeenChamp(item)}
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
