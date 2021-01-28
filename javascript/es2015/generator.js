/*
 * generator.js
 * Copyright (C) 2021 Peter Lau <superpeterlau@outlook.com>
 *
 * Distributed under terms of the MIT license.
 */

function* infinite() {
  let n = 0;
  while (true) {
    yield n++;
  }
}

const generator = infinite();

console.log(generator.next().value);
console.log(generator.next().value);
