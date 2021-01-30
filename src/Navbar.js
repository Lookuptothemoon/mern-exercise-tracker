import {Link} from 'react-router-dom';
import $ from 'jquery';
import './Navbar.css';

function Navbar() {
    // close modal menu on mobile
    const closeModal = () => {
        $(".navbar-mobile-modal")[0].style.display = "none";
    };

    // open modal menu on mobile
    const openModal = () => {
        $(".navbar-mobile-modal")[0].style.display = "flex";
    };

    // hide modal if opened on mobile then switched to desktop view
    $(window).resize(function() {
        if( $(window).width() >= 768 ){
            $(".navbar-mobile-modal")[0].style.display = "none";
        }
    });

    return (
        <div className="navbar">
            <nav>
                <div className="navbar-desktop-nav">
                    <Link to="/" className="navbar-link navbar-logo">Exercise App</Link>
                    <Link to="/create" className="navbar-desktop-nav-item navbar-link">Create Exercise</Link>
                    <Link to="/user" className="navbar-desktop-nav-item navbar-link">Create User</Link>
                </div>

                <div className="navbar-mobile-nav">
                    <Link to="/" className="navbar-link navbar-logo">Exercise App</Link>
                    <button onClick={openModal} className="mobile-trigger">=</button>
                </div>

                <div className="navbar-mobile-modal">
                    <div className="navbar-mobile-modal-left">
                        <button onClick={closeModal} className="mobile-close"> X </button>
                    </div>
                    <div className="navbar-mobile-modal-right">
                        <Link to="/" onClick={closeModal} className="modal-link navbar-mobile-modal-right-link">Exercise App</Link>
                        <Link to="/create" onClick={closeModal} className="modal-link navbar-mobile-modal-right-link">Create Exercise</Link>
                        <Link to="/user" className="modal-link navbar-mobile-modal-right-link">Create User</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
