const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");
const digitalTime = document.getElementById("digital-time");
const digitalDate = document.getElementById("digital-date");
const markingsContainer = document.querySelector(".markings");

function createFace() {
  for (let i = 0; i < 60; i++) {
    const mark = document.createElement("div");
    mark.className = i % 5 === 0 ? "mark major" : "mark";
    mark.style.transform = `rotate(${i * 6}deg)`;
    markingsContainer.appendChild(mark);
  }

  for (let hour = 1; hour <= 12; hour++) {
    const number = document.createElement("span");
    number.className = "number";
    number.textContent = hour;
    const angle = (hour * 30 - 90) * (Math.PI / 180);
    const radius = 38;
    number.style.transform = `translate(${Math.cos(angle) * radius}%, ${Math.sin(angle) * radius}%)`;
    markingsContainer.appendChild(number);
  }
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateClock() {
  const now = new Date();
  const ms = now.getMilliseconds();
  const seconds = now.getSeconds() + ms / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  secondHand.style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hours * 30}deg)`;

  const hours24 = now.getHours();
  const mins = now.getMinutes();
  const secs = now.getSeconds();
  const timeString = `${pad(hours24)}:${pad(mins)}:${pad(secs)}`;

  digitalTime.textContent = timeString;
  digitalTime.setAttribute("datetime", now.toISOString());

  digitalDate.textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

createFace();
updateClock();
setInterval(updateClock, 50);
