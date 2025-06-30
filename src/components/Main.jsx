import "./Main.css";
import { useState, useEffect } from "react";

export default function Main() {
  const randomResponses = [
    "Мудрость не в знании ответа, а в умении ждать рассвета.",
    "И в бурю сердца — покой мой ответ.",
    "Ты спрашиваешь — но ветер знает лучше.",
    "Вопрос твой звучен, но молчание — благородней.",
    "Всё пройдёт, и это — тоже откровение.",
  ];
  const [twoMsg, setTwoMsg] = useState([]);
  const [charCounter, setCharCounter] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [isResponse, setIsResponse] = useState(false);

  // Simulate a call pipeline
  function getMLResponse() {
    const bot_response =
      randomResponses[Math.floor(randomResponses.length * Math.random())];
    setTwoMsg((prev) => [...prev, bot_response]);
    setIsResponse(false);
  }

  useEffect(() => {
    if (twoMsg.length > 0) {
      setTimeout(() => getMLResponse(), 1000);
    }
  }, [requestSent]);

  // Handle form submission
  function handleOnSubmit(formData) {
    const user_input = formData.get("user_input");
    setTwoMsg((prev) => [...prev, user_input]);
    setRequestSent((prev) => !prev);
    setIsResponse(true);
    setCharCounter("");
  }

  const twoMsgMapped = twoMsg.map((prev, index) => {
    if (index % 2 === 0) {
      return (
        <div className="chat_bot user">
          <p>
            <strong>You:</strong> {prev}
          </p>
        </div>
      );
    } else {
      return (
        <div className="chat_bot bot">
          <p>
            <strong>Bot:</strong> {prev}
          </p>
        </div>
      );
    }
  });

  return (
    <>
      <div className="generate">
        <div className="selectors">
          <select className="model_selector">
            <option value="RNN">RNN</option>
            <option value="GPT-2">GPT-2</option>
            <option value="GPT-3.5">GPT-3.5</option>
          </select>
          <select className="author_selector">
            <option value="Pushkin">Pushkin</option>
            <option value="Lermontov">Lermontov</option>
            <option value="Tolstoy">Tolstoy</option>
          </select>
        </div>

        <div className="response_area">
          {twoMsgMapped}
          {isResponse && twoMsg.length != 0 && (
            <div className="chat_bot bot">
              <p>
                <strong>Bot is thinking...</strong>
              </p>
            </div>
          )}
        </div>

        <form action={handleOnSubmit} className="my_form">
          <input
            value={charCounter}
            onChange={(prev) => setCharCounter(prev.target.value)}
            className="user_input"
            name="user_input"
            type="text"
            placeholder="Enter here..."
          ></input>
          <button className="submit_button">Submit query!</button>
        </form>

        <button onClick={(prev) => setTwoMsg([])} className="clear_button">
          Clear it!
        </button>
        <span className="char_counter">
          Number of characters: {charCounter.length}
        </span>
      </div>
    </>
  );
}
