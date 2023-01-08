const url = "http://localhost:4000";
console.log(url);
const titleRef = document.querySelector("#title");
const commentRef = document.querySelector("#comment");

const getDatabase = async () => {
  const res = await fetch(`${url}/booklog`, {
    method: "GET",
  });
  const data = await res.json();
  console.log(res.status);
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
  // console.log(JSON.stringify({ title, comment }));
  const res = await fetch(`${url}/booklog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, comment }),
  });
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

console.log(
  JSON.stringify({
    title: "title",
    comment: "comment",
  })
);
