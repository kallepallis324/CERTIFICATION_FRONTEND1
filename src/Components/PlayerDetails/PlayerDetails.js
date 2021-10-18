import React, { useEffect, useState } from "react";
import classes from "./PlayerDetails.module.css";
import { useParams } from "react-router";
import axios from "axios";

export default function PlayerDetails() {
  const id = useParams().id;
  const [playerData, setplayerData] = useState([]);

  const fetchPlayerURL = `https://node-certification-backend.herokuapp.com/playerdata/${id}`;
  const fetchPlayerData = () => {
    axios
      .get(fetchPlayerURL)
      .then((result) => {
        setplayerData(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPlayerData();
  }, [fetchPlayerURL]);

  return (
    <div className={classes.playerDetailsWrapper}>
      <h1 className={classes.headingText}>Player Details</h1>

      {playerData.length != 0 && (
        <div className={classes.playerCard}>
          <div className={classes.playerLeftDiv}>
            <img
              src={playerData.data.playerImage}
              alt={playerData.data.playerName}
            />
          </div>
          <div className={classes.playerRightDiv}>
            <h2>{playerData.data.playerName}</h2>
            <h3>
              Team: <span>{playerData.data.from}</span>
            </h3>
            <h3>
              Price: <span>{playerData.data.price} Cr.</span>
            </h3>
            <h3>
              Status:{" "}
              <span>
                {" "}
                {playerData.data.isPlaying ? "Playing" : "Not Playing"}
              </span>
            </h3>
            <h3>
              Role: <span>{playerData.data.description}</span>{" "}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
