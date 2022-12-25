const inputs = document.getElementsByTagName("input");
const btnLogin = document.querySelector("button");

const main = () => {
  btnLogin.addEventListener("click", () => {
    const [name, password] = Array.from(inputs).map((i) => i.value);
    requester("/login", "POST", { name, password }).then((data) => {
      if (data.status === "SUCCESS") redirect("/home");
    });
  });
};

main();
