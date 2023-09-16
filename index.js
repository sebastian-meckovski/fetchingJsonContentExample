if (!window.localStorage.getItem("language")) {
  window.localStorage.setItem("language", "en");
}
let language = window.localStorage.getItem("language");
let content; // Declare content in the global scope

const item = document.getElementById("textItem");
const myButton = document.getElementById("myButton");
const header = document.getElementById("header");
const loadingOverlay = document.getElementById("loadingOverlay");

async function fetchData(language) {
  try {
    var response = await fetch(`./content/content-${language}.json`);
    content = await response.json(); // Assign the global content variable
    return content; // Return the data if needed
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error; // Handle or re-throw the error as needed
  } finally {
    loadingOverlay.style.display = "none";
  }
}

const updateData = (data) => {
  header.textContent = data.title;
  item.textContent = data.greeting;
  myButton.textContent = data.changeLanguageButton;
};

fetchData(language).then((data) => {
  updateData(data);
});

header.textContent = myButton.addEventListener("click", () => {
  loadingOverlay.style.display = "flex";
  if (language === "en") {
    window.localStorage.setItem("language", "hu");
    language = "hu";
    fetchData(language).then((data) => {
      updateData(data);
    });
  } else {
    window.localStorage.setItem("language", "en");
    language = "en";
    fetchData(language).then((data) => {
      updateData(data);
    });
  }
});
