import classes from "./AddPlayerPopup.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UseFetchApi from "../../Custom Hooks/UseFetchApi";

export default function AddPlayerPopup(props) {
  const apiURL = "https://node-certification-backend.herokuapp.com/playerdata";
  const teamApiURL =
    "https://node-certification-backend.herokuapp.com/teamdata";

  const avatarSmallImages = [
    "https://image.flaticon.com/icons/png/512/168/168721.png",

    "https://image.flaticon.com/icons/png/512/168/168724.png",

    "https://image.flaticon.com/icons/png/512/168/168732.png",

    "https://image.flaticon.com/icons/png/512/168/168726.png",

    "https://image.flaticon.com/icons/png/512/168/168733.png",
  ];

  const { apiResult, isLoading } = UseFetchApi(teamApiURL);

  const [playerName, setplayerName] = useState("");
  const [teamName, setteamName] = useState("");
  const [playerRole, setplayerRole] = useState("");
  const [playerPrice, setplayerPrice] = useState("");
  const [sessionId, setsessionId] = useState(0);
  const [isError, setisError] = useState(false);
  const [isPlaying, setisPlaying] = useState(true);
  const [smallImgPos, setsmallImgPos] = useState(0);
  const [playerImage, setplayerImage] = useState(avatarSmallImages[0]);

  const generateSessionID = () => {
    const num = Math.floor(Math.random() * 1000000 + 1);
    setsessionId(num);
  };

  useEffect(() => {
    generateSessionID();
  }, []);

  const handleAddPlayer = () => {
    const dataObj = {
      playerName: playerName,
      from: teamName,
      price: playerPrice,
      isPlaying: isPlaying,
      description: playerRole,
      sessionId: sessionId,
      playerImage: playerImage,
    };

    if (
      playerName.toString().trim().length > 3 &&
      Number(playerPrice) > 0 &&
      playerRole.toString().trim() !== "--select--" &&
      teamName.toString().trim() !== "--select--"
    ) {
      axios
        .post(apiURL, dataObj)
        .then((result) => {
          console.log(result);
          props.setisDataChanged(!props.isDataChanged);
          props.shareDataToComponents(!props.isOpen);
        })
        .catch((error) => {
          console.log(error);
        });
      setisError(false);
    } else {
      //error
      setisError(true);
    }
  };

  const handleSmallImgChange = (pos) => {
    setsmallImgPos(pos);
    setplayerImage(avatarSmallImages[pos]);
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.addplayerWrapper}>
        <div
          className={classes.closeWrapper}
          onClick={() => {
            props.shareDataToComponents(!props.isOpen);
          }}
        >
          <i class="fas fa-times-circle"></i>
        </div>
        <h2>Add Player Here</h2>
        <p>Player Name</p>
        <input
          value={playerName}
          onChange={(e) => setplayerName(e.target.value)}
          type="text"
        />
        <p>Team Name</p>
        <select
          type="text"
          list="teamname"
          value={teamName}
          onChange={(e) => setteamName(e.target.value)}
        >
          <option value="--select--">--select--</option>
          {isLoading
            ? ""
            : apiResult.data.map((item, pos) => {
                const { key } = item;
                return (
                  <option key={pos} value={key}>
                    {key}
                  </option>
                );
              })}
          {/* <option value="MI">MI</option>
          <option value="DC">DC</option>
          <option value="RCB">RCB</option> */}
        </select>
        <p>Player Role</p>
        <select
          name=""
          id=""
          value={playerRole}
          onChange={(e) => setplayerRole(e.target.value)}
        >
          <option value="--select--">--select--</option>
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="Umpire">Umpire</option>
          <option value="Other">Other</option>
        </select>
        <p>Player Status</p>

        <input type="radio" name="playingStatus" value="Playing" checked />
        <label className={classes.playingradioBTN} htmlFor="Playing">
          Playing
        </label>

        <input type="radio" name="playingStatus" value="Not-Playing" />
        <label htmlFor="Not-Playing">Not-Playing</label>
        <p>Player Price(in Crores)</p>
        <input
          type="number"
          name=""
          id=""
          value={playerPrice}
          onChange={(e) => setplayerPrice(e.target.value)}
        />

        <p>Select Player Avatar</p>
        <div className={classes.avatarImageWrapper}>
          {avatarSmallImages.map((item, pos) => {
            const className = [classes.avatarImageDiv];
            if (pos === smallImgPos) {
              className.length = 0;
              className.push(classes.avatarImageDivSelected);
            }
            return (
              <div
                key={pos}
                className={className}
                onClick={() => handleSmallImgChange(pos)}
              >
                <img src={item} alt={"avatar" + pos} />
              </div>
            );
          })}
        </div>

        <p>Session ID: {sessionId} </p>

        {isError ? (
          <p className={classes.errorText}>Please enter valid details.</p>
        ) : (
          ""
        )}
        <button onClick={handleAddPlayer}>Add Player</button>
      </div>
    </div>
  );
}
