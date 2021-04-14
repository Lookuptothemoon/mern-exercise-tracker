import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import $ from "jquery";
import PersonIcon from "@material-ui/icons/Person";
import "./Navbar.scss";

function Navbar() {
  const [state, dispatch] = useStateValue();

  // close modal menu on mobile
  const closeModal = () => {
    $(".navbar-mobile-modal")[0].style.display = "none";
  };

  // open modal menu on mobile
  const openModal = () => {
    $(".navbar-mobile-modal")[0].style.display = "flex";
  };

  // hide modal if opened on mobile then switched to desktop view
  $(window).resize(function () {
    if ($(window).width() >= 768) {
      $(".navbar-mobile-modal")[0].style.display = "none";
    }
  });

  return (
    <div className="navbar">
      <nav>
        <div className="navbar-desktop-nav">
          <Link to="/" className="navbar-link navbar-logo">
            MERN Exercise Tracker
          </Link>
          <Link to="/" className="navbar-desktop-nav-item navbar-link">
            Home
          </Link>

          {state.user ? (
            <div className="navbar-desktop-nav-submenu">
              <PersonIcon className="navbar-desktop-nav-submenu-trigger" />
              <div className="navbar-desktop-nav-submenu-container">
                <Link to={"/" + state.user.username}>My Exercises</Link>
                <Link to={"/accounts/edit"}>My Account</Link>
                <Link style={{ color: "red" }} to={"/"}>
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <Link to="/login" className="navbar-desktop-nav-item navbar-link">
              Login
            </Link>
          )}
        </div>

        <div className="navbar-mobile-nav">
          <Link to="/" className="navbar-link navbar-logo">
            Exercise App
          </Link>
          <button onClick={openModal} className="mobile-trigger">
            =
          </button>
        </div>

        <div className="navbar-mobile-modal">
          <div className="navbar-mobile-modal-left">
            <button onClick={closeModal} className="mobile-close">
              {" "}
              X{" "}
            </button>
          </div>
          <div className="navbar-mobile-modal-right">
            <Link
              to="/"
              onClick={closeModal}
              className="modal-link navbar-mobile-modal-right-link"
            >
              Exercise App
            </Link>
            <Link
              to="/create"
              onClick={closeModal}
              className="modal-link navbar-mobile-modal-right-link"
            >
              Create Exercise
            </Link>
            <Link
              to="/user"
              className="modal-link navbar-mobile-modal-right-link"
            >
              Create User
            </Link>
            <Link
              to="/login"
              className="modal-link navbar-mobile-modal-right-link"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
