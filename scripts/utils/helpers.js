/**
 * File used to store all helpers functions of the application
 */
import { TIMEOUT_SEC } from './config.js';

/**
 * Function returning a rejected promise after a certain amount of time
 * @param {number} seconds Number of seconds that is necessary before the Promise is rejected
 * @returns {Promise} A Promise that will automatically be rejected after the number of seconds passed as an argument
 * @author Werner Schmid
 */
export const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} second`)
      );
    }, seconds * 1000);
  });
};

/**
 * Asynchronous function used to get data from an URL
 * @param {string} url url from which we will retrieve the data API
 * @returns {Promise} A Promise that will resolve if the data is retrieved from the url in less that the TIMEOUT_SEC variable and reject otherwise
 * @author Werner Schmid
 */
export const AJAX_GET = async url => {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${res.status}: ${data.message}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
