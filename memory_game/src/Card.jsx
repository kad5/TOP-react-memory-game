export default function Card({ details, playTurn, ids, active }) {
  function isCorrect() {
    const state = ids.includes(details.id) ? "correct" : "false";
    return active ? "" : state;
  }
  return (
    <button
      className={`${isCorrect()} card`}
      onClick={() => playTurn(details.id)}
    >
      <img
        style={{ objectFit: "cover", borderRadius: "12px" }}
        width={"160px"}
        height={"230px"}
        src={details.photo}
        alt={details.name}
      ></img>
      <h3>{details.name}</h3>
      <p>{details.yearsInOffice}</p>
    </button>
  );
}
