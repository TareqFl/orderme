export async function getStoreProduct() {
  const local = window.localStorage.getItem("token");
  const session = window.sessionStorage.getItem("token");
  const url = process.env.REACT_APP_DOMAIN_NAME;

  const response = await fetch(`${url}/get_product`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${local === null ? session : local}`,
    },
  });

  const data = await response.json();
  return data;
}
