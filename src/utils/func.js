
export function throttle(func, waitTime = 500) {
  let timer = null;
  return function (args) {
    var context = this;
    var args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, waitTime)
    }
  }
}