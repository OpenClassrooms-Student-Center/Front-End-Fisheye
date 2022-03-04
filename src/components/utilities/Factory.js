import { Link } from "react-router-dom";

export default function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/photographers_ID/${portrait}`;

  function getUserCardDOM() {
    return (
      <Link to="/photographer" state={{ data: data }}>
        <article>
          <img src={picture} alt="photographer ID" />
          <h2>{name}</h2>
          <h5>{`${city}, ${country}`}</h5>
          <h6>{tagline}</h6>
          <span>{`${price}€/jour`}</span>
        </article>
      </Link>
    );
  }
  return { getUserCardDOM };
}
