// Tab switching
function showTab(id) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
  const tab = document.getElementById(id);
  if (tab) tab.classList.add("active");
}

// Discord status fetching via Lanyard API
async function fetchDiscordStatus() {
  const userId = "1206017969499414558"; // Your Discord ID
  const statusEl = document.getElementById("discord-status");
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch Discord status");
    const data = await res.json();
    if (data.success) {
      const discordData = data.data;
      const status = discordData.discord_status || "offline";
      const activities = discordData.activities || [];
      let textStatus = `Status: <strong>${status}</strong>`;
      // Show custom status if available
      const customActivity = activities.find(a => a.type === 4 && a.state);
      if (customActivity) {
        textStatus += `<br>Custom status: "${customActivity.state}"`;
      }
      statusEl.innerHTML = textStatus;
    } else {
      statusEl.textContent = "Unable to load Discord status.";
    }
  } catch (err) {
    statusEl.textContent = "Error loading Discord status.";
    console.error(err);
  }
}

fetchDiscordStatus();
setInterval(fetchDiscordStatus, 60000);

// Clipboard copy for Discord tag
const discordTag = "d3c0mp0s1ngc0rps3";  // Replace with your actual Discord tag

const copyBtn = document.getElementById("copy-discord");
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(discordTag).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy Discord Tag";
    }, 1500);
  }).catch(() => {
    copyBtn.textContent = "Failed to copy";
    setTimeout(() => {
      copyBtn.textContent = "Copy Discord Tag";
    }, 1500);
  });
});

// Typing effect for the title "No0ne"
const titleText = "No0ne";
let titleIndex = 0;
let typingForward = true;

function typeTitle() {
  if (typingForward) {
    titleIndex++;
    if (titleIndex >= titleText.length) {
      typingForward = false;
      setTimeout(typeTitle, 1000);
      document.title = titleText;
      return;
    }
  } else {
    titleIndex--;
    if (titleIndex <= 1) {
      typingForward = true;
      setTimeout(typeTitle, 500);
      document.title = titleText.slice(0, 1);
      return;
    }
  }
  document.title = titleText.slice(0, titleIndex);
  setTimeout(typeTitle, 200);
}

typeTitle();
