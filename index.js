const express = require('express')
const app = express()
const port = 5000
const cors = require("cors")
const pool = require('./db')
const pug = require('pug');
const compiledFunction = pug.compileFile('template.pug');

app.use(cors())

app.get('/', function (req, res) {
  res.render('index', { title: 'Pastebin', message: 'Hello there!' })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

console.log(compiledFunction ({
    name: 'Ana'
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'pug');
app.set('views', './views');

//ROUTES//
//create a paste

app.post("/pastelocal", async(req, res) => {
    try {
      var data = req.body;
      const pasteTitle = data.pasteTitle;
      const pasteInput = data.pasteInput;
      const newInput = await pool.query("INSERT INTO pastebintable (pasteTitle, pasteInput) VALUES($1, $2) RETURNING *",
      [pasteTitle, pasteInput]);
      res.json(newInput.rows[0]);
    } catch(err) {
      console.error(err.message);
    }
});

  // get all pastes
  
app.get('/pastelocal', async(req, res) => {
    try {
        const allPastes = await pool.query("SELECT * FROM pastebintable");
        res.json(allPastes.rows);
        const userInputs = allPastes.rows.map((obj) => {
          return obj.pasteinput;
        })
        console.log("first input is: " + userInputs[0]);
        console.log(userInputs);

        const userTitles = allPastes.rows.map((obj) => {
          return obj.pastetitle;
        })
    } catch (err) {
        console.error(err.message)
    }
});
  // get a paste
  
app.get("/pastelocal/:id", async(req, res) => {
  try {
    const {id} = req.params;
    const paste = await pool.query("SELECT * FROM pastebintable WHERE id = $1", [id])
    res.json(paste.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

  //delete a paste
  
app.delete("/pastelocal/:id", async(req, res) => {
  try {
    const {id} = req.params;
    const deletePaste = await pool.query("DELETE FROM pastebintable WHERE id = $1", [id]);
    res.json("Paste was deleted!");
  } catch (error) {
    console.log(error.message)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})