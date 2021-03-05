/*
 * app.js
 *
 * Copyright (C) 2021 Peter Lau <superpeterlau@outlook.com>
 *
 * Distributed under terms of the MIT license.
 */

const container = document.querySelector(".container");

// array of cards
const coffees = [
  { name: "Perspiciatis", image: "image/coffee1.jpg" },
  { name: "Voluptatem", image: "image/coffee2.jpg" },
  { name: "Explicabo", image: "image/coffee3.jpg" },
  { name: "Rchitecto", image: "image/coffee4.jpg" },
  { name: "Beatae", image: "image/coffee5.jpg" },
  { name: "Vitae", image: "image/coffee6.jpg" },
  { name: "Inventore", image: "image/coffee7.jpg" },
  { name: "Veritatis", image: "image/coffee8.jpg" },
  { name: "Accusantium", image: "image/coffee9.jpg" },
];

const displayCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image }) =>
      (output += `
      <div class="card">
        <img class="card--avatar" src=${image} />
        <h1 class="card--title">${name}</h1>
        <a class="card--link" href="#">Taste</a>
      `)
  );
  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", displayCoffees);
