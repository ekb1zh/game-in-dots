export const fetchWrapper: typeof fetch = function (url, options) {
  return fetch.apply(null, arguments as unknown as Parameters<typeof fetch>)
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error(`Fetch error with status: ${res.status}`)
    })
    .catch(err => console.error(err));
}

// This JavaScript function always returns a random number
// between min (included) and max (excluded)
// https://www.w3schools.com/js/js_random.asp
export function getRandomBetween(from: number, to: number) {
  return Math.floor(Math.random() * (to - from)) + from;
}