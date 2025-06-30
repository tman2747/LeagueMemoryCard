import { useEffect, useState } from "react";

async function getImage() {
  let aatroxImage = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg"
  );

  console.log(aatroxImage.url);
  return aatroxImage.url;
}

function MemoryCard() {
  const [aatroxImage, setimage] = useState(null);
  useEffect(() => {
    getImage().then(setimage);
  });
  return (
    <>
      <div>hello</div>
      <div>Picture Area</div>
      <div className="pictureContainer">
        <div className="picture">
          <img src={aatroxImage} alt="" />
        </div>
      </div>
    </>
  );
}

export default MemoryCard;
