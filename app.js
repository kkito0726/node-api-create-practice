const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 4000;
const bookLogs = [];

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Example_db01",
  database: "booklog",
});

connection.connect((err) => {
  if (err) {
    console.log("error connecting: " + err.stack);
    return;
  }
  console.log("success");
});

const getDataBase = () => {
  connection.query(
    "SELECT * FROM booklog WHERE deleted_at IS NULL",
    (err, response) => {
      if (err) throw err;
      console.log(response);
    }
  );
};

app.use(express.json());
app.listen(port, () => {
  console.log("sever started");
});

app.get("/", (req, res) => {
  res.send("sever");
});

// データベースの情報を取得
app.get("/booklog", (req, res) => {
  // res.json(bookLogs);
  getDataBase();
  res.send("Get DB Table");
});

// レコードを追加
app.post("/booklog", (req, res) => {
  const bookLog = {
    title: req.body.title,
    comment: req.body.comment,
  };

  const q = "insert into booklog SET ?";
  connection.query(q, bookLog, (err) => {
    if (err) throw err;
    getDataBase();
  });

  // 例外処理
  if (!(bookLog.title && bookLog.comment)) {
    return res.json({
      ok: false,
      error: "invalid parameter",
    });
  }

  //   レスポンス
  // bookLogs.push(bookLog);
  // res.json(bookLog);
  res.send("Add record to Table");
});

// 既存のレコードを更新
app.put("/booklog/:id", (req, res) => {
  // const bookLog = bookLogs.find((c) => c.id === parseInt(req.params.id));
  // console.log(req.params);
  // if (!bookLog) {
  //   res.status(404).send("Not Found");
  // }
  // 例外処理
  if (!(req.body.title && req.body.comment)) {
    return res.json({
      ok: false,
      error: "invalid parameter",
    });
  }
  const bookLog = {
    title: req.body.title,
    comment: req.body.comment,
  };

  const q = `UPDATE booklog SET ? WHERE id=?`;
  connection.query(q, [bookLog, String(req.params.id)], (err) => {
    if (err) throw err;
    getDataBase();
  });
  // bookLog.title = req.body.title;
  // bookLog.comment = req.body.comment;
  res.send(`updated id = ${req.body.comment}`);
});

//レコードの削除
app.delete("/booklog/:id", (req, res) => {
  // const bookLog = bookLogs.find((c) => c.id === parseInt(req.params.id));
  // if (!bookLog) {
  //   res.status(404).send("Not Found");
  // }

  // const index = bookLogs.indexOf(bookLog);
  const str_idx = String(req.params.id);
  // bookLogs.splice(index, 1);

  const q = "UPDATE booklog SET deleted_at=? WHERE id=?";
  console.log(q);
  connection.query(q, [new Date(), str_idx], (err) => {
    if (err) throw err;
    getDataBase();
  });

  // idに抜け落ちがないようにつけ直す
  // bookLogs.map((bookLog, idx) => {
  //   bookLog.id = idx + 1;
  // });
  // res.json(bookLog);
  res.send(`Deleted id = ${str_idx}`);
});
