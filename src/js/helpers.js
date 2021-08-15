// Use this file (module) to include functions that we will use multiple times across the project
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // returns a promise
    const data = await res.json(); // returns a promise
    // console.log(res, data);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
    // This way the promise returned by this function will get REJECTED, and not show as fulfilled.
  }
};
