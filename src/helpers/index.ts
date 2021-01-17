export const fetchWrapper: typeof fetch = function (url, options) {
  return fetch.apply(null, arguments as unknown as Parameters<typeof fetch>)
    .then(res => {
      if (res.ok) return res.json()
    })
    .catch(err => console.error(err));
}

// Returns a random number between min (included) and max (excluded)
export function getRandomBetween(from: number, to: number) {
  return Math.floor(Math.random() * (to - from)) + from;
}