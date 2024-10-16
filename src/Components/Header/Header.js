import React, {useMemo} from 'react';
import { useNavigate} from 'react-router-dom';
import './header.css'; 


const Header = ({ isLoggedIn, showLoginModal, openAccount }) => {
  const navigate = useNavigate();

  const navigationButtons = useMemo(() => {
    return (
      <>
        <button onClick={() => navigate('/cinema')}>Cinema</button>
        <button onClick={() => navigate('/theaters')}>Theaters</button>
        <button onClick={() => navigate('/sports')}>Sports</button>
        <button onClick={() => navigate('/home')}>Home</button>
      </>
    );
  }, [navigate]); 

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/home')}>  
        <img src="https://icons.veryicon.com/png/o/miscellaneous/face-monochrome-icon/calendar-249.png" alt="Logo" className="logo-img" /> {}
        <h1>NextEvent</h1>
      </div>


      <nav className="navigation">
      {navigationButtons}
      </nav>




      <div className="login-section" onClick={() => navigate('/myAccount')}>
        {isLoggedIn ? (
          <button onClick={openAccount} className="account-button">
            My profile
          </button>
        ) : (
          <button onClick={showLoginModal}  className="login-button">
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
