import axios from "axios";
import React, { useEffect, useState } from "react";
import UseFetchApi from "../../Custom Hooks/UseFetchApi";
import classes from "./HomePage.module.css";
import AddPlayerPopupComponent from "../Popup/AddPlayerPopup";
import { Link } from "react-router-dom";

const apiURL = "https://node-certification-backend.herokuapp.com/playerdata";
const teamApiURL = "https://node-certification-backend.herokuapp.com/teamdata";

export default function HomePage(props) {
  //const { apiResult, isLoading } = UseFetchApi(apiURL);

  const [playerData, setplayerData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isTeamLoading, setisTeamLoading] = useState(true);
  const [isDataChanged, setisDataChanged] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [teamData, setteamData] = useState([]);
  const [duplicateData, setduplicateData] = useState([]);

  //let duplicateTeamData = [];

  const fetchData = () => {
    axios
      .get(apiURL)
      .then((response) => {
        setplayerData(response.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchByText = () => {
    const searchURL = `https://node-certification-backend.herokuapp.com/playerdata/search/${searchText}`;
    searchText.toString().trim().length > 0 &&
      axios
        .get(searchURL)
        .then((result) => {
          setplayerData(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    if (searchText.toString().trim().length !== 0) {
      const newData = teamData.filter((item) =>
        item.key.toString().includes(searchText.toString().trim().toUpperCase())
      );
      setteamData(newData);
    } else {
      setteamData(duplicateData);
    }
  };

  const fetchTeamData = () => {
    axios
      .get(teamApiURL)
      .then((result) => {
        setteamData(result.data.data);
        setisTeamLoading(false);
        setduplicateData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [isDataChanged, searchText.toString().trim().length == 0]);

  useEffect(() => {
    searchByText();
  }, [searchText]);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const [isOpenIn, setisOpenIn] = useState(props.isOpen);
  const shareDataToComponentsIn = (isOpen) => {
    setisOpenIn(isOpen);
    props.shareDataToComponents(isOpen);
  };

  const handleSearchText = (e) => {
    const text = e.target.value;
    setsearchText(text);
  };

  return (
    <div className={classes.homePageWrapper}>
      <h1 className={classes.appHeading}>WELCOME TO CRICKET APP</h1>
      <div>
        {props.isOpen ? (
          <AddPlayerPopupComponent
            setisDataChanged={setisDataChanged}
            isDataChanged={isDataChanged}
            isOpen={isOpenIn}
            shareDataToComponents={shareDataToComponentsIn}
          />
        ) : (
          ""
        )}
      </div>
      {isLoading ? (
        <h1 className={classes.loadingText}>Loading...</h1>
      ) : (
        <div className={classes.landingPageWrapper}>
          <div className={classes.searchBarWrapper}>
            <input
              type="text"
              value={searchText}
              onChange={(e) => {
                handleSearchText(e);
              }}
            />
            <button>Search</button>
          </div>
          <h2 className={classes.availableTeamsText}>Available Teams</h2>
          <div>
            {isTeamLoading ? (
              <h1 className={classes.loadingText}>Loading...</h1>
            ) : (
              <div className={classes.playerCardsWrapper}>
                {teamData.map((item, pos) => {
                  const {
                    fullName,
                    key,
                    championshipsWon,
                    teamIcon,
                    playerCount,
                    _id,
                  } = item;
                  return (
                    <Link
                      key={pos}
                      className={classes.playerCards}
                      to={`/team/${key}/${_id}`}
                    >
                      <div className={classes.teamLeftDiv}>
                        <img src={teamIcon} alt={fullName} />
                      </div>
                      <div className={classes.playerRightDiv}>
                        <h2>{fullName}</h2>
                        <h3>
                          Team: <span>{key}</span>
                        </h3>
                        <h3>
                          Playercount: <span>{playerCount}</span>
                        </h3>
                        <h3>
                          Championship Won: <span> {championshipsWon}</span>
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <h2 className={classes.availableTeamsText}>Available Players</h2>
          <div className={classes.playerCardsWrapper}>
            {playerData.data.map((item, pos) => {
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
                <Link to={`/player/${_id}`} className={classes.playerCards}>
                  <div className={classes.playerLeftDiv}>
                    <img src={playerImage} alt={playerName} />
                  </div>
                  <div className={classes.playerRightDiv}>
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
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// const AddPlayerPopup = (props) => {
//   const avatarSmallImages = [
//     "https://image.flaticon.com/icons/png/512/168/168721.png",

//     "https://image.flaticon.com/icons/png/512/168/168724.png",

//     "https://image.flaticon.com/icons/png/512/168/168732.png",

//     "https://image.flaticon.com/icons/png/512/168/168726.png",

//     "https://image.flaticon.com/icons/png/512/168/168733.png",
//   ];

//   const { apiResult, isLoading } = UseFetchApi(teamApiURL);

//   const [playerName, setplayerName] = useState("");
//   const [teamName, setteamName] = useState("");
//   const [playerRole, setplayerRole] = useState("");
//   const [playerPrice, setplayerPrice] = useState("");
//   const [sessionId, setsessionId] = useState(0);
//   const [isError, setisError] = useState(false);
//   const [isPlaying, setisPlaying] = useState(true);
//   const [smallImgPos, setsmallImgPos] = useState(0);
//   const [playerImage, setplayerImage] = useState(avatarSmallImages[0]);

//   const generateSessionID = () => {
//     const num = Math.floor(Math.random() * 1000000 + 1);
//     setsessionId(num);
//   };

//   useEffect(() => {
//     generateSessionID();
//   }, []);

//   const handleAddPlayer = () => {
//     const dataObj = {
//       playerName: playerName,
//       from: teamName,
//       price: playerPrice,
//       isPlaying: isPlaying,
//       description: playerRole,
//       sessionId: sessionId,
//       playerImage: playerImage,
//     };

//     if (
//       playerName.toString().trim().length > 3 &&
//       Number(playerPrice) > 0 &&
//       playerRole.toString().trim() !== "--select--" &&
//       teamName.toString().trim() !== "--select--"
//     ) {
//       axios
//         .post(apiURL, dataObj)
//         .then((result) => {
//           console.log(result);
//           props.setisDataChanged(!props.isDataChanged);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//       setisError(false);
//     } else {
//       //error
//       setisError(true);
//     }
//   };

//   const handleSmallImgChange = (pos) => {
//     setsmallImgPos(pos);
//     setplayerImage(avatarSmallImages[pos]);
//   };

//   return (
//     <div className={classes.addplayerWrapper}>
//       <p>Player Name</p>
//       <input
//         value={playerName}
//         onChange={(e) => setplayerName(e.target.value)}
//         type="text"
//       />
//       <p>Team Name</p>
//       <select
//         type="text"
//         list="teamname"
//         value={teamName}
//         onChange={(e) => setteamName(e.target.value)}
//       >
//         <option value="--select--">--select--</option>
//         {isLoading
//           ? ""
//           : apiResult.data.map((item, pos) => {
//               const { key } = item;
//               return (
//                 <option key={pos} value={key}>
//                   {key}
//                 </option>
//               );
//             })}
//         {/* <option value="MI">MI</option>
//         <option value="DC">DC</option>
//         <option value="RCB">RCB</option> */}
//       </select>
//       <p>Player Role</p>
//       <select
//         name=""
//         id=""
//         value={playerRole}
//         onChange={(e) => setplayerRole(e.target.value)}
//       >
//         <option value="--select--">--select--</option>
//         <option value="Batsman">Batsman</option>
//         <option value="Bowler">Bowler</option>
//         <option value="Umpire">Umpire</option>
//         <option value="Other">Other</option>
//       </select>
//       <p>Player Status</p>

//       <input type="radio" name="playingStatus" value="Playing" checked />
//       <label htmlFor="Playing">Playing</label>

//       <input type="radio" name="playingStatus" value="Not-Playing" />
//       <label htmlFor="Not-Playing">Not-Playing</label>
//       <p>Player Price(in Crores)</p>
//       <input
//         type="number"
//         name=""
//         id=""
//         value={playerPrice}
//         onChange={(e) => setplayerPrice(e.target.value)}
//       />

//       <p>Select Player Avatar</p>
//       <div className={classes.avatarImageWrapper}>
//         {avatarSmallImages.map((item, pos) => {
//           const className = [classes.avatarImageDiv];
//           if (pos === smallImgPos) {
//             className.length = 0;
//             className.push(classes.avatarImageDivSelected);
//           }
//           return (
//             <div
//               key={pos}
//               className={className}
//               onClick={() => handleSmallImgChange(pos)}
//             >
//               <img src={item} alt={"avatar" + pos} />
//             </div>
//           );
//         })}
//       </div>

//       <p>Session ID: {sessionId} </p>

//       {isError ? <p>Please enter valid details.</p> : ""}
//       <button onClick={handleAddPlayer}>Add Player</button>
//     </div>
//   );
// };
