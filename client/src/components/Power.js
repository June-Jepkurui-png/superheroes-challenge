import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Power() {
  const { id } = useParams();
  const [power, setPower] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchPower = async () => {
      try {
        const response = await fetch(`/powers/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
        const powerData = await response.json();
        setPower(powerData);
        setStatus("resolved");
      } catch (err) {
        setError(err.message);
        setStatus("rejected");
      }
    };

    fetchPower();
  }, [id]);

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "rejected") return <h1>Error: {error}</h1>;

  return (
    <section>
      <h2>{power.name}</h2>
      <p>{power.description}</p>
      <p>
        <Link to="/hero_powers/new">Add Hero Power</Link>
      </p>
      <p>
        <Link to={`/powers/${power.id}/edit`}>Edit Power Description</Link>
      </p>
    </section>
  );
}

export default Power;
