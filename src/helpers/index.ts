export const fetchWrapper: typeof fetch = function (url, options) {
  return fetch.apply(null, arguments as unknown as Parameters<typeof fetch>)
    .then(res => {
      if (res.ok) return res.json()
      else throw new Error(`Fetch error with status: ${res.status}`)
    })
    .catch(err => console.error(err));
}



export function isEqualsArrays(
  a: Array<unknown>,
  b: Array<unknown>
): boolean {

  // Проверка аргументов
  // {
  //   const length = arguments.length;
  //   if (length !== 2) {
  //     throw new Error(`Length of arguments is '${length}', but must be 2.`);
  //   }

  //   for (let index = 0; index < length; ++index) {
  //     const arg = arguments[index];
  //     if (!Array.isArray(arg)) {
  //       throw new Error(`Argument '${arg}' is not array.`);
  //     }
  //   }
  // }

  // Проверка длин массивов
  const length = a.length;
  if (length !== b.length) {
    return false;
  }

  // Сравнение содержимого массивов
  for (let index = 0; index < length; ++index) {
    if (a[index] !== b[index]) {
      return false;
    }
  }

  return true;
}


// This JavaScript function always returns a random number
// between min (included) and max (excluded)
// https://www.w3schools.com/js/js_random.asp
export function getRandomBetween(from: number, to: number) {
  return Math.floor(Math.random() * (to - from)) + from;
}