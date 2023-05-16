import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Home from "./Home"

function User({ session, user }) {
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await axios.delete('http://localhost:3000/users/sign_out', {
        headers: {
          Authorization: `Bearer ${user}` // Set the authorization header with the session ID
        },
        withCredentials: true
      });

      // Clear the session
      sessionStorage.removeItem('session_id');

      // Redirect the user to the sign-in page after signing out
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Home sessionCookie={user} />
      <p>Session: {session}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default User;
