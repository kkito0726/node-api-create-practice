const express = require("express");
const app = express();
const port = 4000;
const bookLogs = [];

app.use(express.json());
app.listen(port, () => {
  console.log("sever started");
});

app.get("/", (req, res) => {
  res.send("sever");
});

app.get("/booklog", (req, res) => {
  res.json(bookLogs);
});

app.post("/booklog", (req, res) => {
  const bookLog = {
    id: bookLogs.length + 1,
    title: req.body.title,
    comment: req.body.comment,
  };
  // 例外処理
  if (!(bookLog.title && bookLog.comment)) {
    return res.json({
      ok: false,
      error: "invalid parameter",
    });
  }

  //   レスポンス
  bookLogs.push(bookLog);
  res.json(bookLog);
});

app.put("/booklog/:id", (req, res) => {
  const bookLog = bookLogs.find((c) => c.id === parseInt(req.params.id));
  console.log(req.params);
  if (!bookLog) {
    res.status(404).send("Not Found");
  }
  // 例外処理
  if (!(req.body.title && req.body.comment)) {
    return res.json({
      ok: false,
      error: "invalid parameter",
    });
  }

  bookLog.title = req.body.title;
  bookLog.comment = req.body.comment;
  res.send(bookLog);
});

app.delete("/booklog/:id", (req, res) => {
  const bookLog = bookLogs.find((c) => c.id === parseInt(req.params.id));
  if (!bookLog) {
    res.status(404).send("Not Found");
  }

  const index = bookLogs.indexOf(bookLog);
  bookLogs.splice(index, 1);

  // idに抜け落ちがないようにつけ直す
  bookLogs.map((bookLog, idx) => {
    bookLog.id = idx + 1;
  });
  res.json(bookLog);
});
