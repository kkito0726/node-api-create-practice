const fetch = require("node-fetch");

const url = "http://localhost:4000";

const getDatabase = async () => {
  const res = await fetch(`${url}/booklog`);
  const data = await res.json();
  console.log(data);
};

getDatabase();
