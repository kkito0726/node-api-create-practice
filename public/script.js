const url = "http://localhost:4000";
console.log(url);
const titleRef = document.querySelector("#title");
const commentRef = document.querySelector("#comment");
const deleteIdRef = document.querySelector("#deleteId");

const getDatabase = async () => {
  const res = await fetch(`${url}/booklog`);
  const data = await res.json();
  console.log(data);
  data.map((x) => {
    const spanRef = document.createElement("span");
    const liRef = document.createElement("li");
    spanRef.textContent = `tittle: ${x.title}   comment: ${x.comment}`;
    liRef.appendChild(spanRef);
  });
};

const postDatabase = async () => {
  const title = titleRef.value;
  const comment = commentRef.value;

  // const formData = new FormData();
  // formData.append("title", title);
  // formData.append("comment", comment);

  const res = await fetch(`${url}/booklog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, comment: comment }),
  });
  // const res = await fetch(`${url}/booklog`, {
  //   method: "POST",
  //   body: formData,
  // });

  // const res = await fetch(`${url}/booklog`, {
  //   method: "POST",
  //   body: JSON.stringify({ title: title, comment: comment }),
  // });
  console.log(res.status);
  console.log(JSON.stringify({ title, comment }));
};

const deleteDatabase = async (id) => {
  const res = await fetch(`${url}/booklog/${id}`, {
    method: "DELETE",
  });

  console.log(res.status);
};

const getButton = document.querySelector("#get");
getButton.addEventListener("click", () => {
  getDatabase();
});

const postButton = document.querySelector("#post");
postButton.addEventListener("click", () => {
  postDatabase();
  getDatabase();
});

const deleteButton = document.querySelector("#deleteButton");
deleteButton.addEventListener("click", () => {
  const deleteId = deleteIdRef.value;
  console.log(deleteId);
  deleteDatabase(deleteId);
  getDatabase();
});
