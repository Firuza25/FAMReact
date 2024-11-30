import React, {useContext, useMemo} from 'react';
import { useNavigate} from 'react-router-dom';
import './header.css'; 
import { context } from '../../App';
import SearchBar from './SearchingBar/SearchBar';


const Header = () => {

  const { handleLogout } = useContext(context)

  const {isLoggedIn} = useContext(context)
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
      <SearchBar />


      <div className="login-section" >
        {isLoggedIn ? (<div>
          <button  className="account-button">
            My profile
          </button>
          <button onClick={handleLogout}> Logout </button>
        </div>
          
        ) : (
          <div>
            <button onClick={() => navigate("login-page")}  className="login-button">
            Login
          </button>
          <button onClick={() => navigate("signup-page")}  className="login-button">
            Signup
          </button>
          </div>
          
        )}
      </div>
    </header>
  );
};

export default Header;
