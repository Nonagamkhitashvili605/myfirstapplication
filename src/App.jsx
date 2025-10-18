import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import Contact from "./views/Contact";

const App = () => {
  const [users, setUsers] = useState([]);
  const [val, setVal] = useState("");
  const [isEditable, setIsEditable] = useState(null);

  useEffect(() => {
    fetch("https://reqres.in/api/users", {
      method: "GET",
      headers: { "x-api-key": "reqres-free-v1" },
    })
      .then((res) => res.json())
      .then((result) => setUsers(result.data));
  }, []);

  const save = () => {
    fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
      body: JSON.stringify({ first_name: val }),
    })
      .then((res) => res.json())
      .then((result) => {
        setUsers((prev) => [
          ...prev,
          {
            ...result,
            avatar: "https://via.placeholder.com/100",
            id: Date.now(),
          },
        ]);
        setVal("");
      });
  };

  const handleEdit = (e, id) => {
    const newName = e.target.value;
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, first_name: newName } : user
      )
    );
  };

  return (
    <div>
      <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <h1>CRUD</h1>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Enter first name"
      />
      <button onClick={save}>Save user</button>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {users.map(({ first_name, id, avatar }) => (
          <div
            style={{ border: "1px solid red", margin: "20px", padding: "10px" }}
            key={id}
          >
            <button
              onClick={() => setIsEditable(isEditable === id ? null : id)}
            >
              {isEditable === id ? "Done" : "Edit"}
            </button>
            <img
              src={avatar}
              alt=""
              style={{ width: "100px", display: "block", margin: "10px 0" }}
            />
            {isEditable === id ? (
              <input value={first_name} onChange={(e) => handleEdit(e, id)} />
            ) : (
              <p>{first_name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
