import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import classes from "./TeamDetails.module.css";
import { Link } from "react-router-dom";

export default function TeamDetails(props) {
  const id = useParams().id;
  const tName = useParams().team;
  const fetchURL = `https://node-certification-backend.herokuapp.com/teamdata/${id}`;

  const [teamName, setteamName] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const fetchPlayerURL = `https://node-certification-backend.herokuapp.com/playerdata/team/${tName}`;

  const [teamData, setteamData] = useState([]);
  const [playerData, setplayerData] = useState([]);

  const fetchTeamData = () => {
    axios
      .get(fetchURL)
      .then((result) => {
        setteamData(result.data);
        setteamName(result.data.key);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchPlayerData = () => {
    axios
      .get(fetchPlayerURL)
      .then((result) => {
        console.log(result);
        setplayerData(result.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTeamData();
  }, [fetchURL]);

  useEffect(() => {
    fetchPlayerData();
  }, []);

  return (
    <div className={classes.teamDetailsPage}>
      <h1 className={classes.detailsHeading}>Team Details Page</h1>
      <div className={classes.playerCardsWrapper}>
        {teamData.length != 0 && (
          <div className={classes.playerCards}>
            <div className={classes.teamLeftDiv}>
              <img src={teamData.data.teamIcon} alt={teamData.data.fullName} />
            </div>
            <div className={classes.playerRightDiv}>
              <h2>{teamData.data.fullName}</h2>
              <h3>
                Team: <span>{teamData.data.key}</span>
              </h3>
              <h3>
                Playercount: <span>{teamData.data.playerCount}</span>
              </h3>
              <h3>
                Championship Won: <span> {teamData.data.championshipsWon}</span>
              </h3>
              <h3>
                Topbatsman: <span>{teamData.data.topBatsMan}</span>
              </h3>
              <h3>
                Topbowler: <span>{teamData.data.topBowler}</span>
              </h3>
            </div>
          </div>
        )}
      </div>
      <div className={classes.playerDetails}>
        <h2 className={classes.availableTeamsText}>Available Players</h2>
        <div className={classes.playerCardsWrapper}>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            playerData.length != 0 &&
            playerData.data.map((item, pos) => {
              const {
                description,
                from,
                isPlaying,
                playerName,
                price,
                _id,
                playerImage,
              } = item;
              return (
                <Link to={`/player/${_id}`} className={classes.playerCardsIN}>
                  <div className={classes.playerLeftDiv}>
                    <img src={playerImage} alt={playerName} />
                  </div>
                  <div className={classes.playerRightDivIN}>
                    <h2>{playerName}</h2>
                    <h3>
                      Team: <span>{from}</span>
                    </h3>
                    <h3>
                      Price: <span>{price} Cr.</span>
                    </h3>
                    <h3>
                      Status:{" "}
                      <span> {isPlaying ? "Playing" : "Not Playing"}</span>
                    </h3>
                    <h3>
                      Role: <span>{description}</span>{" "}
                    </h3>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
