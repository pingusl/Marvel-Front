import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/comics");

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
    <div className="comics-container">
      <h1>Page Comics</h1>

      {data.results.map((movie, key) => {
        return (
          <Link to={"/comic/" + movie._id} key={movie._id}>
            <button className="card">{movie.title}</button>
          </Link>
        );
      })}
    </div>
  );
};
export default Comics;
