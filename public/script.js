const fetchData = async () => {
  const apiUrl = localStorage.getItem("apiUrl");
  console.log();
  if (apiUrl) {
    const res = await fetch(`${apiUrl}/users`);
    const data = await res.json();
    console.log(data);
  } else {
    window.location.href = "/api";
  }
};

fetchData();
