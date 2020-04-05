export const fetchWrapper: typeof fetch = function (url, options) {
  return fetch.apply(null, arguments as unknown as Parameters<typeof fetch>)
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error(`Fetch error with status: ${res.status}`)
    })
    .catch(err => console.error(err));
}