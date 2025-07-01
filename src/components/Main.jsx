import "./Main.css";
import { useState, useEffect, useRef } from "react";

export default function Main() {
  const randomResponses = [
    "Мудрость не в знании ответа, а в умении ждать рассвета.",
    "И в бурю сердца — покой мой ответ.",
    "Ты спрашиваешь — но ветер знает лучше.",
    "Вопрос твой звучен, но молчание — благородней.",
    "Всё пройдёт, и это — тоже откровение.",
  ];

  // Add States and Refs
  const [msgStream, setMsgStream] = useState([]);
  const [modelSel, setModelSel] = useState("RNN");
  const [authorSel, setAuthorSel] = useState("Pushkin");
  const [charCounter, setCharCounter] = useState("");
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [effectTrigger, setEffectTrigger] = useState(false);
  const bottomRef = useRef(null);

  // Handle localMem
  useEffect(() => {
    const storedModel = localStorage.getItem("model");
    if (storedModel) setModelSel(storedModel);
    const storedAuthor = localStorage.getItem("author");
    if (storedAuthor) setAuthorSel(storedAuthor);
  }, []);

  // Handle scrolling into view
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [msgStream]);

  // Handle Form Submission
  function simulateMLCall() {
    let bot_response =
      randomResponses[Math.floor(Math.random() * randomResponses.length)];
    bot_response = (
      <p>
        <strong>
          Bot {modelSel} {authorSel}:
        </strong>{" "}
        {bot_response}
        <span className="timestamp">{new Date().toLocaleTimeString()}</span>
      </p>
    );

    setMsgStream((prev) => [...prev, bot_response]);
    setLoadingMsg((prev) => !prev);
  }

  useEffect(() => {
    if (msgStream.length > 0) {
      setTimeout(() => simulateMLCall(), 1000);
    }
  }, [effectTrigger]);

  function handleFormSubmit(formdata) {
    let user_input = formdata.get("user_input");
    user_input = (
      <p>
        <strong>You:</strong> {user_input}
        <span className="timestamp">{new Date().toLocaleTimeString()}</span>
      </p>
    );

    setMsgStream((prev) => [...prev, user_input]);
    setLoadingMsg((prev) => !prev);
    setEffectTrigger((prev) => !prev);
    setCharCounter("");
  }

  // Handle Model Change
  function handleModelChange(event) {
    const model = event.target.value;
    localStorage.setItem("model", model);
    setModelSel((prev) => model);
  }

  // Handle Author Change
  function handleAuthorChange(event) {
    const author = event.target.value;
    localStorage.setItem("author", author);
    setAuthorSel((prev) => author);
  }

  // Handle "Clear" Event
  function handleOnClick() {
    setMsgStream([]);
  }

  // Map message stream to proper form
  const renderedMsgStream = msgStream.map((element, index) => {
    if (index % 2 === 0) {
      return <div className="msg-box user"> {element}</div>;
    } else {
      return <div className="msg-box bot">{element}</div>;
    }
  });

  return (
    <>
      <div className="generate">
        <div className="all_selectors">
          <select
            onChange={handleModelChange}
            name="model"
            className="selectors"
            value={modelSel}
          >
            <option value="RNN">RNN</option>
            <option value="GPT-2">GPT-2</option>
            <option value="GPT-3.5">GPT-3.5</option>
          </select>
          <select
            onChange={handleAuthorChange}
            name="author"
            className="selectors"
            value={authorSel}
          >
            <option value="Pushkin">Pushkin</option>
            <option value="Lermontov">Lermontov</option>
            <option value="Tolstoy">Tolstoy</option>
          </select>
        </div>
        <div className="response_area">
          {renderedMsgStream}
          {loadingMsg && <p className="msg-box bot">Loading...</p>}
          <div ref={bottomRef}></div>
        </div>
        <form action={handleFormSubmit} className="my_form">
          <input
            onChange={(prev) => setCharCounter(prev.target.value)}
            value={charCounter}
            className="user_input"
            name="user_input"
            type="text"
            placeholder="Enter query..."
            required
          ></input>
          <button className="submit_button" type="submit">
            Submit query!
          </button>
        </form>
        <button onClick={handleOnClick} className="clear_button">
          Clear it!
        </button>
        <span className="char_counter">{charCounter.length} characters</span>
      </div>
    </>
  );
}
