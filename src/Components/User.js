import axios from "axios";
function User(){
    const handleSignOut = async () => {
        try {
          await axios.delete('http://127.0.0.1:3000/logout');
          // Redirect the user to the sign in page after signing out
          window.location.href = '/signin';
        } catch (error) {
          console.error(error);
        }
      };

    return(
        <div>
        wabebee
        <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}
export default User
