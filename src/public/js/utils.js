const downloadFileBtn = document.getElementById("downloadFileBtn");
const deleteFileBtn = document.getElementById("deleteFileBtn");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const MBDiv = document.getElementById("MBDiv");

const showModal = (show) => {
  if (show) {
    document.body.style.overflow = "hidden";
    overlay.style.visibility = "visible";
    modal.style.visibility = "visible";
  } else {
    modal.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
    document.body.style.overflow = "scroll";
  }
};

const requester = async (url, method = "GET", body = {}) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

const getFile = async (id, shared = false) => {
  fetch(`/file/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const file = data.data;
      modal.querySelector(".modal-file-name").innerHTML = file.name;
      if (file.type.includes("image")) {
        modal.querySelector(".modal-file-content").innerHTML = `
            <img src="${file.data}" alt="File-Image" class="h-100 mx-auto d-block" style="object-fit:contain;"/>
          `;
      } else {
        modal.querySelector(".modal-file-content").innerHTML = `
              <div class="w-100 h-100" style="font-size:0.7rem;">${file.data}</div>
          `;
      }
      downloadFileBtn.dataset.id = file._id;
      if (!shared) deleteFileBtn.dataset.id = file._id;
      showModal(true);
    });
};

const redirect = (url) => {
  window.location.href = url;
};

const initiateFiles = (files, shared = false) => {
  Array.from(files).forEach((f) => {
    f.addEventListener("click", () => {
      getFile(f.dataset.id, shared);
    });
  });
};

const downloadFile = () => {
  requester(`/file/download/${downloadFileBtn.dataset.id}`).then((data) => {
    if (data.status === "SUCCESS") {
      const file = data.data;
      if (!file.type.includes("image")) {
        const blob = new Blob([file.data], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = file.data;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
      }
    }
  });
};

const computeMB = (filesize, inc) => {
  spanMB.innerHTML = `${(
    parseFloat(spanMB.innerHTML.split(" ")[0]) + (inc ? filesize : -filesize)
  ).toFixed(1)} / 500 (MB)`;
};

const copy = (text) => {
  navigator.clipboard.writeText(text);
};

const readFile = (file, onComplete) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    onComplete(e.target.result);
  };
  if (file.type.includes("image")) reader.readAsDataURL(file);
  else reader.readAsBinaryString(file);
};
