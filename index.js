"use strict";
const inp = document.querySelector(".search");
inp.focus();
const btn = document.querySelector("#btn");
const clear = document.querySelector(".clear");

const container = document.querySelector(".container_img");
let url = `https://api.unsplash.com/search/photos?query=cat}&orientation=landscape&per_page=28&client_id=jBAmCQBhCnzz4eaM8Wjt9jbmJl9CqLoz4p9jTd6DE2Q`;
let arr;
btn.addEventListener("click", getDat);
inp.addEventListener("keypress", validation);
clear.addEventListener("click", clearInput);

function clearInput(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  inp.value = "";
}

function validation(event) {
  if (event.keyCode == 13) {
    sessionStorage.setItem("inp.value", inp.value);
    event.stopPropagation();
    getDat();
  }
}

function getDat() {
  url = `https://api.unsplash.com/search/photos?query=${inp.value}&orientation=landscape&per_page=28&client_id=jBAmCQBhCnzz4eaM8Wjt9jbmJl9CqLoz4p9jTd6DE2Q`;
  sessionStorage.setItem("inp.value", inp.value);
  getData();
}

async function getData() {
  const res = await fetch(url);
  let data = await res.json();
  arr = data;
  console.log(data);
  showData(arr);
}
function showData(arr) {
  inp.value = sessionStorage.getItem("inp.value");
  container.innerHTML = "";
  for (let a of arr.results) {
    let img = `<img class="gallery-img" src= "${a.urls.regular}" alt="image">`;
    container.insertAdjacentHTML("beforeend", img);
  }
}

getData();
window.onload = sessionStorage.removeItem("inp.value");
