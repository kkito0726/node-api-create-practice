const fetch = require("node-fetch");

const url = "http://localhost:4000";

const getDb = async () => {
  const res = await fetch(`${url}/booklog`);
  const data = await res.json();
  console.log(data);

  return data;
};

const postDb = async (data) => {
  await fetch(`${url}/booklog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const putDb = async (id, data) => {
  await fetch(`${url}/booklog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const deleteDb = async (id) => {
  await fetch(`${url}/booklog/${id}`, { method: "DELETE" });
};

const main = async () => {
  await getDb();
  console.log("GET OK!!");
  const data = {
    title: "JavaScript",
    comment: "to create Web App",
  };
  await postDb(data);
  console.log("POST OK!!");

  const update_data = {
    title: "ONE PIECE",
    comment: "熱い",
  };
  await putDb(23, update_data);
  await getDb();
  console.log("PUT OK!!");

  const table = await getDb();
  const tableLastId = table[table.length - 1].id;
  await deleteDb(tableLastId);
  console.log("DELETE OK!!");

  await getDb();
  console.log("ALL OK!!!");
};

main();
