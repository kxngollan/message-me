import "./Navbar.scss";
import { FaGithub } from "react-icons/fa";

const navbar = () => {
  return (
    <nav>
      <h1>Message Me</h1>
      <a
        href="https://github.com/kxngollan/message-me"
        target="_blank"
        rel="noreferrer"
      >
        <div className="repo">
          <FaGithub className="nav-icon" /> <h2>Github Repo</h2>
        </div>
      </a>
    </nav>
  );
};

export default navbar;
