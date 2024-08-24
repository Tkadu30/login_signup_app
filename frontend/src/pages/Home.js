import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState(" ");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);

      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Welcome, {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={index}>
              <p>
                {item.name}: {item.price}
              </p>
            </ul>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
