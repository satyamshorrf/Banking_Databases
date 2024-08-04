const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "banking",
  password: "root",
});


  // All In One  Route   
  app.get("/all", (req, res) => {
    let q = `SELECT *
FROM customer_info
LEFT JOIN account_info
ON customer_info.cust_id = account_info.cust_id
UNION ALL
SELECT *
FROM customer_info
RIGHT JOIN account_info
ON customer_info.cust_id = account_info.cust_id
WHERE customer_info.cust_id IS NULL`;
  
    try {
      connection.query(q, (err, users) => {
        if (err) throw err;
        res.render("all.ejs", { users });
      });
    } catch (err) {
      console.log(err);
      res.send("some error in DB");
    }
  });
























// Home Route
app.get("/", (req, res) => {
    let q = `SELECT count(*) AS count FROM customer_info`;
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let count = result[0].count;
        res.render("home.ejs", { count });
      });
    } catch (err) {
      console.log(err);
      res.send("some error in DB");
    }
  });
  


  // Home Route
app.get("/a", (req, res) => {
  let q = `SELECT count(*) AS count FROM account_info`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0].count;
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});


// Home Route
app.get("/t", (req, res) => {
  let q = `SELECT count(*) AS count FROM transaction_info`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0].count;
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

// Home Route
app.get("/r", (req, res) => {
  let q = `SELECT count(*) AS count FROM relationship_manager_info`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0].count;
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

// Home Route
app.get("/p", (req, res) => {
  let q = `SELECT count(*) AS count FROM preferred_customer_info`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0].count;
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});
  // customer_info Route   Customer Information
  app.get("/customer_info", (req, res) => {
    let q = `SELECT * FROM customer_info`;
  
    try {
      connection.query(q, (err, users) => {
        if (err) throw err;
        res.render("show.ejs", { users });
      });
    } catch (err) {
      console.log(err);
      res.send("some error in DB");
    }
  });

    // account_info Route   Account Information
    app.get("/account_info", (req, res) => {
      let q = `SELECT * FROM account_info`;
    
      try {
        connection.query(q, (err, users) => {
          if (err) throw err;
          res.render("acc.ejs", { users });
        });
      } catch (err) {
        console.log(err);
        res.send("some error in DB");
      }
    });

      // transaction_info Route   Transaction Information
  app.get("/transaction_info", (req, res) => {
    let q = `SELECT * FROM transaction_info`;
  
    try {
      connection.query(q, (err, users) => {
        if (err) throw err;
        res.render("tran.ejs", { users });
      });
    } catch (err) {
      console.log(err);
      res.send("some error in DB");
    }
  });

    // relationship_manager_info Route   
    app.get("/relationship_manager_info", (req, res) => {
      let q = `SELECT * FROM relationship_manager_info`;
    
      try {
        connection.query(q, (err, users) => {
          if (err) throw err;
          res.render("rmi.ejs", { users });
        });
      } catch (err) {
        console.log(err);
        res.send("some error in DB");
      }
    });

      // preferred_customer_info Route   
  app.get("/preferred_customer_info", (req, res) => {
    let q = `SELECT * FROM preferred_customer_info`;
  
    try {
      connection.query(q, (err, users) => {
        if (err) throw err;
        res.render("pci.ejs", { users });
      });
    } catch (err) {
      console.log(err);
      res.send("some error in DB");
    }
  });



  //////////////////// CRUD Operation ///////////////

  app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
  
    res.render("show.ejs" , { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    res.render("edit.ejs");
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");

});


















































app.listen(8080, () => {
    console.log("Server is on port 8080");
});