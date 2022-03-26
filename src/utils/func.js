
export function throttle(func, waitTime = 500) {
  let timer = null;
  return function (args) {

    if (!timer) {
      timer = setTimeout(() => {
        func.call(this, args);
        timer = null;
      }, waitTime)
    }
  }
}