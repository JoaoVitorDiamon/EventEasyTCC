const app = require("./app");
require('dotenv').config();
const PORT = 3333;

app.listen(PORT, () => {console.log("Server open in port " + PORT)});