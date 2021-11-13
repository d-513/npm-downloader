// run on https://spdx.org/licenses/
let str = "";

document
  .querySelector("#page > table.sortable > tbody")
  .querySelectorAll("tr")
  .forEach((tr) => {
    const code = tr.querySelector("code");
    str += `'${code.textContent}' | `;
  });

console.log(str);
