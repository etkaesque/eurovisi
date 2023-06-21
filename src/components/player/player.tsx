
import styles from "./player.module.css";
  // @ts-ignore
export default function Player(props) {
  const songLink = `https://open.spotify.com/embed/track/${props.id}`;
  return (

    <div className={styles.frameWrapper}>
      <div className={styles.frameCountry}>
        <span>{props.country}</span>
        <button onClick={props.toggleFavourite} className={styles.button}>
          { props.isFavourite ? <svg className={styles.svg} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 0L6.12257 3.45492H9.75528L6.81636 5.59017L7.93893 9.04508L5 6.90983L2.06107 9.04508L3.18364 5.59017L0.244718 3.45492H3.87743L5 0Z" fill="#FF0087"/>
</svg>
 : <svg width="10" className={styles.svg} height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 0.809018L5.88481 3.53217L5.94093 3.70492H6.12257H8.98586L6.66941 5.38792L6.52246 5.49468L6.57859 5.66742L7.4634 8.39058L5.14695 6.70758L5 6.60081L4.85305 6.70758L2.5366 8.39058L3.42141 5.66742L3.47754 5.49468L3.33059 5.38792L1.01414 3.70492H3.87743H4.05907L4.11519 3.53217L5 0.809018Z" stroke="#FF0087" stroke-width="0.5"/>
</svg>
}
        </button>
       

      </div>

      <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        src={songLink}
        frameBorder="0"
          // @ts-ignore
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}
