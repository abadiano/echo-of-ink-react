import logo from "../assets/pushkin.png";
import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="logo_name">
        <img src={logo} alt="pushkin" className="logo"></img>
        <h1>Echo of Ink</h1>
      </div>
    </>
  );
}
