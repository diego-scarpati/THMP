// const { PythonShell } = require("python-shell");
// const path = require("path");
import { PythonShell } from "python-shell";
import path from "path";

let options = {
  mode: "text",
  pythonOptions: ["-u"],
  scriptPath: path.join(__dirname, "open_ai"),
  args: ["cats and dogs", 1],
};

PythonShell.run("test.py", options, (err, results) => {
  if (err) throw err;
  return results;
})
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.error(err);
  });
