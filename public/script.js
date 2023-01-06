const url = "http://localhost:4000";
console.log(url);

const getDatabase = async () => {
  const res = await fetch("http://localhost:4000/booklog", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res.status);
  const data = await res.json();
  console.log("hello");
};

const get = async () => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  const data = await res.json();

  console.log(data);
};
const getButton = document.querySelector("#get");
getButton.addEventListener("click", () => {
  console.log("hello");
  getDatabase();
});

get();
