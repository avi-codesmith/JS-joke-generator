"use strict";

const container = document.querySelector(".container");
const btn = document.querySelector("button");
const jokeH3 = document.querySelector("h3");
const sound = new Audio("errorSound.mp3");
const img = document.querySelector("img");
const loader = document.createElement("div");
const url =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,political,racist,sexist,explicit";

loader.classList.add("loader");

const getJoke = () => {
  jokeH3.appendChild(loader);
  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      jokeH3.textContent = `${item.joke}`;
      loader.style.display = "flex";

      if (item.joke === undefined) {
        loader.style.display = "none";
        // img.src = "warning.png";
        img.style.display = "none";
        jokeH3.textContent = "⚠️ Can't generate joke pls try again";
        jokeH3.style.color = "orangered";
        jokeH3.classList.add("move");
        sound.play();
        setTimeout(() => {
          jokeH3.classList.remove("move");
        }, 200);
      } else {
        jokeH3.style.color = "#333";
        img.style.display = "block";
      }
      if (img.src.includes("smile.png")) {
        img.classList.add("rotate");
      } else if (img.src.includes("warning.png")) {
        img.classList.remove("rotate");
      }
    });

  getJoke.onload(() => {
    loader.style.display = "none";
  });
};

btn.addEventListener("click", getJoke);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getJoke();
    btn.classList.add("active");
    setTimeout(() => {
      btn.classList.remove("active");
    }, 150);
  }
});
