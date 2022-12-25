const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.querySelector("input");
const filesDiv = document.getElementById("filesDiv");

const main = () => {
  initiateFiles(filesDiv.children, true);
  unlockBtn.addEventListener("click", () => {
    const password = passwordInput.value;
    const lid = window.location.href.split("/").slice(-1)[0];
    requester("/share/unlock", "POST", { password, lid }).then((data) => {
      if (data.status === "SUCCESS") {
        document.getElementById("authDiv").style.display = "none";
        document.getElementById("mainDiv").style.visibility = "visible";
      }
    });
  });
};

main();
