/*
 * paint00.js
 * Copyright (C) 2021 Peter Lau <superpeterlau@outlook.com>
 *
 * Distributed under terms of the MIT license.
 */

const start = () => {
  let canvas = document.getElementById("stage");
  let ctx = canvas.getContext("2d");

  let paint = document.getElementById("paint");
  let paint_style = getComputedStyle(paint);
  canvas.width = parseInt(paint_style.getPropertyValue("width"));
  canvas.height = parseInt(paint_style.getPropertyValue("height"));

  let mouse = { x: 0, y: 0 };

  canvas.addEventListener(
    "mousemove",
    function (e) {
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
    },
    false
  );

  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "#00cc99";

  canvas.addEventListener(
    "mousedown",
    function () {
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      canvas.addEventListener("mousemove", onPaint, false);
    },
    false
  );

  canvas.addEventListener(
    "mouseup",
    function () {
      canvas.removeEventListener("mousemove", onPaint, false);
    },
    false
  );

  let onPaint = () => {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  };
};

window.onload = () => {
  start();
};
