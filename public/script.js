const url = "http://localhost:4000";
console.log(url);
const titleRef = document.querySelector("#title");
const commentRef = document.querySelector("#comment");

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

const postDatabese = async () => {
  const title = titleRef.value;
  const comment = commentRef.value;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("comment", comment);

  const res = await fetch(`${url}/booklog`, {
    method: "POST",
    body: JSON.stringify({ title, comment }),
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
};

const getButton = document.querySelector("#get");
getButton.addEventListener("click", () => {
  getDatabase();
});

const postButton = document.querySelector("#post");
postButton.addEventListener("click", async () => {
  await postDatabese();
  await getDatabase();
});
