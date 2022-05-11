//----Loading TOOLS----//
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Characters = () => {
  const [data, setData] = useState();
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
      <h1>Page Characters</h1>
      {data.results.map((character) => {
        return (
          <Link to={"/character/" + character._id} key={character._id}>
            <button className="card">{character.name}</button>
          </Link>
        );
      })}
    </div>
  );
};
export default Characters;
