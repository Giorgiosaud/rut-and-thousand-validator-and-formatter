export const rutFormat = {
  clean(value) {
    let myValue = value;
    if (typeof myValue !== "string") {
      myValue = myValue.toString();
    }
    return myValue
      .replace(/^0+|[^0-9kK]+/g, "")
      .toUpperCase()
      .substring(0, 9);
  },
  format(value) {
    const cleanValue = this.clean(value);

    if (!cleanValue) {
      return "";
    }

    if (cleanValue.length <= 1) {
      return cleanValue;
    }
    return cleanValue
      .replace(/\B(?=([\d|K|k]$))/g, "-")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};

const handler = (el) => {
  const myEl = el;
  if (myEl.selectionStart !== myEl.selectionEnd) {
    return false;
  }
  const position = myEl.selectionStart;
  let isEnd = false;
  const dotsBefore = myEl.value.match(/\./g) || [];
  const countDotsBefore = dotsBefore.length;

  if (position === myEl.value.length) {
    isEnd = true;
  }

  myEl.value = rutFormat.format(myEl.value);
  const dotsAfter = myEl.value.match(/\./g) || [];
  const countDotsAfter = dotsAfter.length;
  if (isEnd) {
    myEl.selectionEnd = myEl.value.length;
  } else {
    myEl.selectionEnd =
      position + (countDotsAfter - countDotsBefore) < 0
        ? 0
        : position + (countDotsAfter - countDotsBefore);
  }
};
export default {
  bind: function (el, binding, vnode) {
    el.addEventListener("blur", () => handler(el));
    el.addEventListener("keyup", () => handler(el));
  }
};
