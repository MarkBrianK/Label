import axios from "axios";
import Home from "./Home";
function User(){
    const handleSignOut = async () => {
        try {
          await axios.delete('http://127.0.0.1:3000/logout');
          // Redirect the user to the sign in page after signing out
          window.location.href = '/';
        } catch (error) {
          console.error(error);
        }
      };

    return(
        <div>
        <Home />
        <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}
export default User
