export async function callMsGraph(accessToken, endpoint) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(endpoint, options)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
