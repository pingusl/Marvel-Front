import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

//----Loading CSS----//
import "../components/character.scss";

//----Loading img----//
import heartOff from "../img/heart-off.png";
import heartOn from "../img/heart-on.png";

//----Setting Cookies----//
//Cookies.set("favorisCharacters", "");

const Character = () => {
  const [data, setData] = useState();
  const [dataComics, setDataComics] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [fav, setFav] = useState(false);

  const { id } = useParams(); //Id character

  //const serverUrl = "http://localhost:3000";
  const serverUrl = "https://marvel-sl.herokuapp.com";
  //console.log(id);

  useEffect(() => {
    const fetchDataCharacter = async () => {
      try {
        // Je fais une requête à mon serveur en donnent l'id du personnage en params
        const response = await axios.get(`${serverUrl}/character/${id}`);
        //  console.log(response.data.comics);
        setImgUrl(
          response.data.thumbnail.path + "." + response.data.thumbnail.extension
        );
        setData(response.data);

        const responseComics = await axios.get(`${serverUrl}/comics/${id}`);
        // console.log(responseComics.data.comics); //.comics[0].title
        setDataComics(responseComics.data.comics);
        setIsLoading(false);
        //----Check if this characters is a favoris----//

        if (
          Cookies.get("favorisCharacters").indexOf(id) === -1 ||
          Cookies.get("favorisCharacters").indexOf(id) === undefined
        ) {
          setFav(false);
        } else {
          setFav(true);
        }

        console.log(`status favoris = ${fav}`);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDataCharacter();
  }, [id, fav]);

  //----Test toogle fav----//

  const favHandleClick = (event) => {
    event.preventDefault();
    const listFavorisCharacters = Cookies.get("favorisCharacters");
    let newList = "";

    if (Cookies.get("favorisCharacters")) {
      //--Console.log----//
      // console.log("Avant action sur coeur");
      // console.log(`Liste id in cookie : ${listFavorisCharacters}`);
      // console.log(`Id value : ${id}`);
      // console.log(
      //   `indexOf(id) value : ${Cookies.get("favorisCharacters").indexOf(id)}`
      // );

      if (Cookies.get("favorisCharacters").indexOf(id) !== -1) {
        // //L'utilisateur a cliqué alors que l'id existe dans le cookie//
        // //Il faut donc retirer l'id du cookie//
        setFav(false);
        newList = listFavorisCharacters.replace(id + ",", "");
        // //Puis mettre a jour le cookie qui ne doit plus mémoriser l'id//
        Cookies.set("favorisCharacters", newList);
      } else {
        setFav(true);

        if (listFavorisCharacters.indexOf(id) === -1) {
          newList = id + "," + listFavorisCharacters;
          Cookies.set("favorisCharacters", newList);
        }
      }
    } else {
      Cookies.set("favorisCharacters", id + ",");
      setFav(true);
    }
    console.log(`Valeur fav= ${fav}`);
  };

  return isLoading ? (
    <p>Veuillez patienter ...pour ce personnage</p>
  ) : (
    <div className="character-container">
      <h1>{data.name}</h1>
      <div className="character-filmography">
        <div className="col-1">
          <img
            className="fav-on"
            src={fav ? heartOn : heartOff}
            alt="heart-off"
            onClick={
              (event) => {
                favHandleClick(event);
              }

              //setFav(true);
            }
          />
          <img className="img-character" src={imgUrl} alt={data.name} />
        </div>
        <div className="col-2">
          {dataComics.map((comics, key) => {
            return (
              <p className="card" key={key}>
                {comics.title}
              </p>
            );
          })}
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default Character;
