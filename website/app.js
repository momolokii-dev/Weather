// URL and API
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const Key = "&appid=32b13941086b8fdc1d000a435a407bea";

//get the date
let d = new Date();

//  adding function to existing html dom element
document.getElementById("generate").addEventListener("click", makeAction);

function makeAction(e) {
  e.preventDefault();

  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getTemp(baseUrl, zip, Key).then(function (userData) {
    console.log(userData);
    postData("/add", {
      date: d,
      temp: userData.main.temp,
      content: feelings,
    });
    updateUI();
  });
}

// Function => GET
const getTemp = async (baseUrl, zip, Key) => {
  const res = await fetch(baseUrl + zip + Key);
  try {
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error 1", error);
  }
};

// Function => Post
const postData = async (url = "", d = {}) => {
  console.log(d);
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(d),
  });

  try {
    const newD = await req.json();
    console.log(newD);
    return newD;
  } catch (error) {
    console.log("error 2", error);
  }
};

// Update user interface
const updateUI = async () => {
  const request = await fetch("/all");

  try {
    const Data = await request.json();

    entryIcon.forEach((i) => (i.style.opacity = "1"));

    document.getElementById("dates").innerHTML = `Date:${Data[0].date}`;
    document.getElementById("temps").innerHTML = `Temp:${Data[0].temp}`;
    document.getElementById("contents").innerHTML = `I feel:${Data[0].content}`;
  } catch (error) {
    console.log("error 3", error);
  }
};
