import React, { useState, useEffect } from "react";
import "./App.css";
import Expenses from "./components/losts/Losts";
import NewExpense from "./components/new_expense/NewLosts";
import svg from "./components/img/icon.svg";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [decoded, setDecoded] = useState(null);

  const fetchExpenses = () => {
    fetch("http://localhost:3002/api/v1/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data.expenses))
      .catch((error) => console.error('Error fetching expenses:', error));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);
  
  async function handleGoogleLoginSuccess  (credentialResponse)  {
    const userinfo = jwtDecode(credentialResponse.credential);
    
    setDecoded(userinfo);
      // console.log(decoded);
      // console.log(userinfo);
    setIsLoggedIn(true);
  };
  

  const handleGoogleLoginError = () => {
    console.log('Login Failed');
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };
 
  return (
    <div className="App">
      <img src={svg} alt="Google Authentication" />
      {!isLoggedIn && (
        <div className="login-container">
          <p>Google Authentication</p>
          
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          />
        </div>
      )}

      {isLoggedIn && (decoded!=null) && (
        <>
          <NewExpense onAddNewExpense={handleAddExpense} />
          <Expenses expenses={expenses} userdata={decoded} />
        </>
      )}
    </div>
  );
}

export default App;
 




