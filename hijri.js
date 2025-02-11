const months = {
  "gio": [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  "hijri": [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhul-Qa'dah", "Dhul-Hijjah"
  ]
};
let hijriDate = new Date();
let currentDay = null;
let currentMonth = null;
let nextOrPrevMobth = null;

function getHijriDate(date) {
  return new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).formatToParts(date);
}
currentDay = getHijriDate(hijriDate).find(d => d.type === 'day')?.value;
currentMonth = months.hijri[getHijriDate(hijriDate).find(d => d.type === 'month')?.value - 1] || "Muharram";
function updateHijriDate() {
  const hijriParts = getHijriDate(hijriDate);

  let hijriDay = hijriParts.find(part => part.type === 'day')?.value || "1";
  let hijriMonthIndex = hijriParts.find(part => part.type === 'month')?.value || 1;
  let hijriYear = hijriParts.find(part => part.type === 'year')?.value || "1446";
  let hijriMonth = months.hijri[hijriMonthIndex - 1] || "Muharram";
  const nextHijriDate = getHijriDate(new Date(hijriDate.getTime() + 24 * 60 * 60 * 1000));
  let nextHijriMonthIndex = nextHijriDate.find(part => part.type === 'month')?.value || hijriMonthIndex;
  nextOrPrevMobth = hijriMonth;
  let is29Days = nextHijriMonthIndex !== hijriMonthIndex;

  document.getElementById("currentTime").innerHTML = `${hijriDay} ${hijriMonth} ${hijriYear}`;
  const button30 = document.querySelector('#calendar button[data-calendar="30"]');
  if (is29Days) {
    button30?.remove();
  } else {
    if (!button30) {
      const newButton = document.createElement('button');
      newButton.setAttribute('data-calendar', '30');
      newButton.textContent = '30';
      document.getElementById('calendar').appendChild(newButton);
    }
  }

  document.querySelectorAll('#calendar button').forEach(btn => {
    btn.classList.remove('currentTime')
    if (btn.getAttribute('data-calendar') === hijriDay) {
      btn.classList.add('currentTime');
    }

    btn.onclick = function () {
      document.querySelectorAll('#calendar button').forEach(b => b.classList.remove('currentTime'));
      this.classList.add('currentTime');
      updateCalendar(this.getAttribute('data-calendar'), hijriMonth, hijriYear);
    };
  });
}
function updateCalendar(selectedDay, month, year) {
  document.getElementById("currentTime").innerHTML = `${selectedDay} ${month} ${year}`;
}

document.getElementById('prev-month').addEventListener('click', function () {
  hijriDate.setMonth(hijriDate.getMonth() - 1);
  updateHijriDate();
  document.querySelectorAll('#calendar button').forEach(b => {
    b.classList.remove('currentTime')
    if(b.getAttribute('data-calendar') === currentDay && nextOrPrevMobth === currentMonth) {
      b.classList.add('currentTime')
    }
  });
});
document.getElementById('next-month').addEventListener('click', function () {
  hijriDate.setMonth(hijriDate.getMonth() + 1);
  updateHijriDate();
  document.querySelectorAll('#calendar button').forEach(b => {
    b.classList.remove('currentTime')
    if(b.getAttribute('data-calendar') === currentDay && nextOrPrevMobth === currentMonth) {
      b.classList.add('currentTime')
    }
  });
});

updateHijriDate();
const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
setInterval(() => {
  const d = new Date();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();
  document.getElementById('gre-time').innerHTML = `<span>${day}/${month}/${year}</span>`;
}, 1000);
function updateTime() {
    const now = new Date();
    const hours = (now.getHours() % 12) || 12; // 12-hour format, 12 remains 12
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    // Waqtiga la muujinayo
    const roundedMinutes = minutes;
    const roundedSeconds = seconds;

    document.querySelectorAll(".hour").forEach((el) => {
        el.style.opacity = el.dataset.hour == hours ? "1" : "0.2";
        if (el.dataset.hour == hours) el.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    document.querySelectorAll(".min").forEach((el) => {
        el.style.opacity = el.dataset.min == roundedMinutes ? "1" : "0.2";
        if (el.dataset.min == roundedMinutes) el.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    document.querySelectorAll(".sec").forEach((el) => {
        el.style.opacity = el.dataset.sec == roundedSeconds ? "1" : "0.2";
        if (el.dataset.sec == roundedSeconds) el.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    document.querySelector("#am-pm .am-pm").innerText = ampm;
}
document.querySelectorAll('#days span').forEach(d => {
  d.classList.remove('current-day');
  if (d.getAttribute('data-day') === days[new Date().getDay()]) {
    d.classList.add('current-day');
  } else {
    d.classList.remove('current-day');
  }
});
document.querySelectorAll('#days-ar span').forEach(d => {
  d.classList.remove('current-day');
  if (d.getAttribute('data-day') === days[new Date().getDay()]) {
    d.classList.add('current-day');
  } else {
    d.classList.remove('current-day');
  }
});
setInterval(updateTime, 1000);
updateTime();