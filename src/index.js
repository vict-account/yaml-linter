#!/usr/bin/env node
// Minimal YAML sanity checks: flags tab characters and trailing whitespace.
const fs = require("fs");

const file = process.argv[2];
if (!file) {
  console.error("usage: yaml-linter <file.yaml>");
  process.exit(2);
}

const lines = fs.readFileSync(file, "utf8").split("\n");
let issues = 0;
lines.forEach((line, i) => {
  if (line.includes("\t")) {
    console.log(`${file}:${i + 1}: tab character`);
    issues++;
  }
  if (/\s+$/.test(line)) {
    console.log(`${file}:${i + 1}: trailing whitespace`);
    issues++;
  }
});
console.log(issues ? `${issues} issue(s) found` : "ok");
process.exit(issues ? 1 : 0);
