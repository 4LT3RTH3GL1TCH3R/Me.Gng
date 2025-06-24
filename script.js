function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

// Replace with your Discord user ID
const discordId = "1206017969499414558";
const statusElement = document.getElementById("discord-status");
const titleText = "No0ne";
const minIndex = 1;
let index = minIndex;
let isDeleting = false;

async function fetchDiscordStatus() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
    const data = await res.json();
    if (data.success) {
      const status = data.data.discord_status;
      const activities = data.data.activities;

      let activityStr = activities.length ? `Playing: ${activities[0].name}` : "No activity";
      statusElement.innerHTML = `
        <p>Status: <strong style="color:${getStatusColor(status)}">${status}</strong></p>
        <p>${activityStr}</p>
      `;
    } else {
      statusElement.textContent = "Unable to fetch status.";
    }
  } catch (e) {
    statusElement.textContent = "Error loading Discord status.";
  }
}

async function fetchDiscordStatus() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/1206017969499414558`);
    const data = await res.json();

    if (!data.success) {
      document.getElementById("discord-status").textContent = "Unable to fetch status.";
      return;
    }

    const status = data.data.discord_status;
    const activities = data.data.activities;
    const customStatus = activities.find(act => act.type === 4);

    let statusHTML = `
      <p>Status: <strong style="color:${getStatusColor(status)}">${status}</strong></p>
    `;

    if (customStatus && customStatus.state) {
      statusHTML += `<p>Custom Status: ${customStatus.state}</p>`;
    }

    document.getElementById("discord-status").innerHTML = statusHTML;

  } catch (err) {
    document.getElementById("discord-status").textContent = "Error loading Discord status.";
  }
}

function getStatusColor(status) {
  switch (status) {
    case "online": return "#0f0";
    case "idle": return "#ff0";
    case "dnd": return "#f00";
    case "offline": return "#888";
    default: return "#ccc";
  }
}

function typeTitle() {
  document.title = titleText.substring(0, index);

  if (!isDeleting) {
    if (index < titleText.length) {
      index++;
      setTimeout(typeTitle, 250);
    } else {
      // full word typed, wait 1 sec then start deleting
      isDeleting = true;
      setTimeout(typeTitle, 1000);
    }
  } else {
    if (index > minIndex) {
      index--;
      setTimeout(typeTitle, 250);
    } else {
      // reached 'N', wait 1 sec then start typing again
      isDeleting = false;
      setTimeout(typeTitle, 1000);
    }
  }
}

typeTitle();

fetchDiscordStatus();
setInterval(fetchDiscordStatus, 15000);

// Function to copy Discord tag to clipboard
function copyDiscord() {
  const tag = "d3c0m0s1ngc0rps3";
  navigator.clipboard.writeText(tag).then(() => {
    alert("Discord tag copied to clipboard!");
  }).catch(() => {
    alert("Failed to copy Discord tag.");
  });
}
