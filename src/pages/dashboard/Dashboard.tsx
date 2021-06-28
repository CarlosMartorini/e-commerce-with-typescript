import { Redirect } from "react-router-dom";
import { useAuth } from "../../providers/authentication/Auth";

const Dashboard = () => {
  const { token } = useAuth()
  
  if(token === ''){
      return <Redirect to='/'/>
  }
  
  return (
    <h1>
        Dashboard
        <button
        onClick={() => {
            localStorage.setItem("token", '')
            window.location.reload();
        }}
        >
          Logout
        </button>
    </h1>
  );
};

export default Dashboard;
