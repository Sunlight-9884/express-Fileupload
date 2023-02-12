const apiUrl = localStorage.getItem("apiUrl");
if (apiUrl) {

  console.log(apiUrl);
} else {
  window.location.href = "/api/html";
}



const btn = document.getElementById("btn");
const fileUpload = document.getElementById("uploadFile");

btn.addEventListener("click", async () => {
  const files = [...fileUpload.files];

  const formData = new FormData();

  files.forEach((file) => {
    formData.append("uploadFiles", file);
  });

  const res = await fetch(`${apiUrl}/uploadFile`, {
    method: "POST",

    body: formData,
  });

  const data = await res.json();
  console.log(data);

});
