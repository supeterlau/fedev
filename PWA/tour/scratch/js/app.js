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
  { name: "Perspiciatis", image: "images/coffee1.jpg" },
  { name: "Voluptatem", image: "images/coffee2.jpg" },
  { name: "Explicabo", image: "images/coffee3.jpg" },
  { name: "Rchitecto", image: "images/coffee4.jpg" },
  { name: "Beatae", image: "images/coffee5.jpg" },
  { name: "Vitae", image: "images/coffee6.jpg" },
  { name: "Inventore", image: "images/coffee7.jpg" },
  { name: "Veritatis", image: "images/coffee8.jpg" },
  // { name: "Accusantium", image: "images/coffee9.jpg" },
  { name: "Accusantium", image: "images/coffee999.jpg" },
];

const loadImg = (that) => {
  // is this event or element?
  console.log(that);
  that.style.display = "block";
};

const displayCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image }) =>
      (output += `
      <div class="card">
        <div class="card--avatar--container">
          <img class="card--avatar" src=${image} onload="loadImg(this)" />
        </div>
        <h1 class="card--title">${name}</h1>
        <a class="card--link" href="#">Taste</a>
      </div>
      `)
  );
  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", displayCoffees);

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered", res))
      .catch((err) => console.error("service worker not registered", err));
  });
}
