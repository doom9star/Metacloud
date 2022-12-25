const inputs = document.getElementsByTagName("input");
const btnRegister = document.querySelector("button");

const main = () => {
  btnRegister.addEventListener("click", () => {
    const [name, password, _] = Array.from(inputs).map((i) => i.value);
    requester("/register", "POST", { name, password }).then((data) => {
      if (data.status === "SUCCESS") redirect("/home");
    });
  });
};

main();
