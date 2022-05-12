//----Loading TOOLS----//
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//----Loading CSS----//
import "../components/characters.scss";

const Characters = () => {
  const [data, setData] = useState();
  //const [imgUrl, setImgUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/characters");
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>En cours de chargement</p>
  ) : (
    <div className="characters-container">
      <h1>Characters</h1>
      <div className="carrousel">
        {data.results.map((character, key) => {
          const imgUrl =
            character.thumbnail.path + "." + character.thumbnail.extension;
          return (
            <Link
              className="card-container"
              to={"/character/" + character._id}
              key={character._id}
            >
              <div className="character-card">
                <img className="img-character" src={imgUrl} alt="" />

                <div className="name-card" key={character.name}>
                  {character.name}
                </div>
                <div className="name-description" key={key}>
                  {character.description}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Characters;
