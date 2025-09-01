import "./style.css";
import markdownit from "markdown-it";

// TODO:
// create a post list
// break this script into multiple modules

const md = markdownit();
const motdArray = [
  "Hello",
  "These are some messages of the day",
  "Used as subtitles on the homepage",
  "Add some funny ones here later",
  "This is a homepage",
];
const posts = import.meta.glob("./posts/*.md", {
  as: "raw",
  eager: true,
});
console.log(posts);

const subtitleElement = document.getElementById("subtitle");
const navigationButtons = document.getElementsByClassName("siteNavigation");
const contentDiv = document.getElementById("content");

let activeContent = null;

subtitleElement.textContent = getRandomMotd();

initializeNavigation();

function initializeNavigation() {
  for (let i = 0; i < navigationButtons.length; i++) {
    navigationButtons[i].addEventListener("click", onNavigationClick);
  }
}

function onNavigationClick(event) {
  let buttonId = event.target.id;
  let contentPath = `./posts/${buttonId}.md`;
  console.log(`Navigation button clicked: ${buttonId}`);

  if (buttonId === activeContent) {
    clearActiveContent();
    return;
  }

  contentDiv.innerHTML = md.render(posts[contentPath]);
  activeContent = buttonId;
}

function clearActiveContent() {
  contentDiv.innerHTML = "";
  activeContent = null;
}

function getRandomMotd() {
  let randomIndex = Math.floor(Math.random() * motdArray.length);
  return motdArray[randomIndex];
}
