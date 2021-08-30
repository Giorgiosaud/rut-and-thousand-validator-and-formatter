export const thousandsFormat = {
  clean(value) {
    if (typeof value !== "string") {
      value = value.toString();
    }
    return value
      .replace(/^0+|[^0-9]+/g, "")
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
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};

const handler = (el) => {
  if (el.selectionStart !== el.selectionEnd) {
    return false;
  }
  const position = el.selectionStart;
  let isEnd = false;
  const dotsBefore = el.value.match(/\./g) || [];
  const countDotsBefore = dotsBefore.length;

  if (position === el.value.length) {
    isEnd = true;
  }

  el.value = thousandsFormat.format(el.value);
  const dotsAfter = el.value.match(/\./g) || [];
  const countDotsAfter = dotsAfter.length;
  if (isEnd) {
    el.selectionEnd = el.value.length;
  } else {
    el.selectionEnd =
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
