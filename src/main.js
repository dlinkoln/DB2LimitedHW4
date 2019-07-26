const fs = require("fs");

fs.open(__filename, "r", (err, fd) => {
  console.log("io operation");
});

setImmediate(() => {
  console.log("setImmediate");
});

process.nextTick(() => {
  console.log("nextTick");
});

new Promise(resolve => {
  resolve("promise");
}).then(console.log);

console.log("start");
