import { useEffect, useState } from "react";
import "./app.css";
import Card from "./Card";

export default function App() {
  const [allPresidents, setAllPresidents] = useState(null);
  const [active, setActive] = useState(false);
  const [msg, setMsg] = useState("");
  const [mode, setMode] = useState(6);
  const [activeMode, setactiveMode] = useState(6);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [presidents, setPresidents] = useState([]);
  const [ids, SetIds] = useState([]);

  function newGame() {
    if (!allPresidents) return;

    const selected = new Set();
    while (selected.size < mode) {
      const index = Math.floor(Math.random() * allPresidents.length);
      selected.add(allPresidents[index]);
    }
    const selectedPresidents = Array.from(selected);

    setPresidents(() => [...shuffleCards(selectedPresidents)]);
    setScore(0);
    SetIds([]);
    setActive(true);
    setactiveMode(() => mode);
    setMsg("Click a president\n👴");
  }

  function playTurn(id) {
    if (!active) return; // prevents changes when game is finished unitll new game is intialized

    if (ids.includes(id)) return resetGame(false); // lost

    SetIds((prev) => [...prev, id]);
    setScore((prev) => prev + 1);
    score >= best ? setBest((prev) => prev + 1) : null;
    setPresidents((p) => [...shuffleCards(p)]);
    displayedMsg();
    if (score + 1 === mode) return resetGame(true); //won
  }

  function displayedMsg() {
    const precentage = Math.floor(((score + 1) / mode) * 100);
    if (precentage > 0 && precentage <= 25)
      return setMsg("Good effort, keep going\n👍");
    if (precentage > 16 && precentage <= 33) return setMsg("Solid choice!\n👌");
    if (precentage > 33 && precentage <= 50)
      return setMsg("Half way there!\n😎");
    if (precentage > 50 && precentage <= 66)
      return setMsg("That's really good!\n💪");
    if (precentage > 66 && precentage <= 83) return setMsg("Impressive!\n🔥");
    if (precentage > 83) return setMsg("Nearly there!\n🤩");
  }

  function resetGame(winner) {
    setActive(false);
    winner ? setMsg("You won\n💪😎🤳") : setMsg("You lost\n💩💩");
  }

  function shuffleCards(array) {
    // Fisher-Yates algorithm
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  async function fetchPrezis() {
    try {
      const PresidentsJson = await fetch(
        "https://api.sampleapis.com/presidents/presidents"
      );
      const PresidentsList = await PresidentsJson.json();
      setAllPresidents(PresidentsList);
    } catch (error) {
      console.error("Error fetching presidents:", error);
    }
  }

  useEffect(() => {
    fetchPrezis();
  }, []);

  useEffect(() => {
    newGame();
  }, [allPresidents]);

  return (
    <>
      <header>
        <h1>Test your memory</h1>
        <p>Best score: {best}</p>
      </header>
      <main>
        <div className="controller">
          <div>
            <div className="labels">
              <label>
                Easy (6)
                <input
                  type="radio"
                  value={6}
                  checked={mode === 6}
                  onChange={() => setMode(6)}
                />
              </label>
              <label>
                Amateur (9)
                <input
                  type="radio"
                  value={9}
                  checked={mode === 9}
                  onChange={() => setMode(9)}
                />
              </label>
              <label>
                Hard (12)
                <input
                  type="radio"
                  value={12}
                  checked={mode === 12}
                  onChange={() => setMode(12)}
                />
              </label>
            </div>
          </div>
          <button onClick={newGame}>New game</button>
        </div>
        <div className="feedback">
          <p>{msg}</p>
          <p>
            current score: {score} / {activeMode}
          </p>
        </div>
        <div className="cards">
          {presidents?.map((p) => (
            <Card
              key={p.id}
              details={p}
              playTurn={playTurn}
              ids={ids}
              active={active}
            />
          ))}
        </div>
      </main>
      <footer>
        <p>
          made by <a href="https://github.com/kad5"> kad5</a>
        </p>
      </footer>
    </>
  );
}
