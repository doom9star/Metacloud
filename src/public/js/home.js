const savePasswordBtn = document.getElementById("savePasswordBtn");
const uploadInput = document.getElementById("uploadInput");
const logoutBtn = document.getElementById("logoutBtn");
const uploadBtn = document.getElementById("uploadBtn");
const filesDiv = document.getElementById("filesDiv");
const copyBtn = document.getElementById("copyBtn");
const optionBtn = document.getElementById("optionBtn");
const optionDiv = document.getElementById("optionDiv");
const protectedCheckBox = document.getElementById("protectedCheckBox");
const optionPasswordInput = document.getElementById("optionPasswordInput");

const main = () => {
  initiateFiles(filesDiv.children);

  logoutBtn.addEventListener("click", () => {
    requester("/logout", "POST").then((data) => {
      if (data.status === "SUCCESS") redirect("/login");
    });
  });

  uploadBtn.addEventListener("click", () => {
    uploadInput.click();
  });

  uploadInput.addEventListener("change", (e) => {
    const file = uploadInput.files[0];
    readFile(file, (result) => {
      const sizeinmb = parseFloat((file.size / 1024 / 1024).toFixed(2));
      if (sizeinmb <= 15) {
        requester("/upload", "POST", {
          file: result,
          filename: file.name,
          filetype: file.type,
          filesize: sizeinmb,
        }).then((data) => {
          if (data.status === "SUCCESS") {
            const file = data.data;
            const div = document.createElement("div");
            div.style.width = "200px";
            div.style.height = "200px";
            div.style.cursor = "pointer";
            div.setAttribute(
              "class",
              "d-flex flex-column align-items-center border m-4"
            );
            div.onclick = () => getFile(file._id);
            div.innerHTML = `
            <img
              src="${
                file.type.includes("image")
                  ? "/images/imageFile.jpg"
                  : "/images/textFile.png"
              }"
              alt="File-Image"
              class="w-75 h-75"
            />
            <div
              class="w-100 px-3 py-2 d-flex justify-content-between align-items-center"
            >
              <span style="font-size: 0.7rem">${file.name}</span>
              <span>&equiv;</span>
            </div>
            `;
            filesDiv.insertBefore(div, filesDiv.firstChild);
            computeMB(file.size, true);
          }
        });
      }
    });
  });

  deleteFileBtn.addEventListener("click", () => {
    requester(`/file/delete/${deleteFileBtn.dataset.id}`).then((data) => {
      if (data.status === "SUCCESS") {
        const filesize = data.data.filesize;
        for (const f of Array.from(filesDiv.children)) {
          if (f.dataset.id === deleteFileBtn.dataset.id) {
            f.remove();
            break;
          }
        }
        computeMB(filesize, false);
        showModal(false);
      }
    });
  });

  copyBtn.addEventListener("click", () => copy(copyBtn.dataset.link));

  optionBtn.addEventListener("click", () => {
    if (optionBtn.dataset.state === "close") {
      optionBtn.dataset.state = "open";
      optionDiv.style.display = "flex";
      optionBtn.innerHTML = "&Uarr;";
    } else {
      optionBtn.dataset.state = "close";
      optionDiv.style.display = "none";
      optionBtn.innerHTML = "&Darr;";
    }
  });

  protectedCheckBox.addEventListener("change", () => {
    if (protectedCheckBox.checked)
      optionPasswordInput.style.visibility = "visible";
    else optionPasswordInput.style.visibility = "hidden";
  });

  savePasswordBtn.addEventListener("click", () => {
    requester("/share/save", "POST", {
      secure: protectedCB.checked,
      password: optionPasswordInput.value,
    });
  });
};

main();
