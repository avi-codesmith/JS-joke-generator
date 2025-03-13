const container = document.querySelector(".container");
const btn = document.querySelector("button");
const jokeH3 = document.querySelector("h3");
const sound = new Audio("errorSound.mp3");
const img = document.querySelector("img");
const url =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

const getJoke = () => {
  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      jokeH3.textContent = `${item.joke}`;
      if (item.joke === undefined) {
        img.src = "warning.png";
        jokeH3.textContent = "Can't generate joke pls try again!";
        jokeH3.style.color = "orangered";
        jokeH3.classList.add("move");
        sound.play();
        setTimeout(() => {
          jokeH3.classList.remove("move");
        }, 200);
      } else {
        jokeH3.style.color = "#333";
        img.src = "smile.png";
      }
    });
};

window.addEventListener("load", getJoke);
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
