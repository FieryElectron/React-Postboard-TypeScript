export async function fetchAuthApis() {
    return await fetch(`http://` + process.env.REACT_APP_ROOT_DOMAIN + `:` + process.env.REACT_APP_AUTH_PORT + `/api/`)
    .then((res) => res.json());
}
