const { PythonShell } = require("python-shell");
const path = require("path");

const acceptByFormula = async (job) => {
  // console.log("🚀 ~ acceptByFormula ~ job:", job);
  let options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: path.join(__dirname),
    args: [
      JSON.stringify(job),
      JSON.stringify(["C#", "C++", ".Net", "Goolang"]),
      9,
    ],
  };

  try {
    const results = await PythonShell.run("acceptByFormula.py", options);

    // Check the last result, convert it to lowercase for robustness
    const lastResult = results[results.length - 1].toLowerCase();

    // Determine acceptance based on the Python result
    if (lastResult === "true") {
      console.log("Job accepted by formula");
      return true;
    } else {
      console.log("Job rejected by formula");
      return false;
    }
  } catch (err) {
    console.error("Error in acceptByFormula:", err);
  }
};

module.exports = { acceptByFormula };
