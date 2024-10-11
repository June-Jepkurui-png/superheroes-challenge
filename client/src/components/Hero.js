import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Hero() {
  const { id } = useParams();
  const [{ data: hero, error, status }, setHero] = useState({
    data: null,
    error: null,
    status: "pending",
  });

  useEffect(() => {
    // Corrected the URL to point to the Flask server on port 5555
    fetch(`http://localhost:5555/heroes/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw new Error(error.error);
          });
        }
      })
      .then((hero) => setHero({ data: hero, error: null, status: "resolved" }))
      .catch((error) => setHero({ data: null, error: error.message, status: "rejected" }));
  }, [id]);

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "rejected") return <h1>Error: {error}</h1>;

  return (
    <section>
      <h2>{hero.super_name}</h2>
      <h2>AKA {hero.name}</h2>

      <h3>Powers:</h3>
      <ul>
        {hero.hero_powers.map((hero_power) => (
          <li key={hero_power.id}>
            <Link to={`/powers/${hero_power.power.id}`}>
              {hero_power.power.name}
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/hero_powers/new">Add Hero Power</Link>
    </section>
  );
}

export default Hero;
