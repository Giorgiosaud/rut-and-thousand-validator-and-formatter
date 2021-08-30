export default {
  validate(value) {
    const myVal = value;
    const fullRut = typeof myVal === "string" ? value : value.toString();
    const rutValidator = fullRut.slice(-1);
    let rutNumber = fullRut.slice(0, -1);
    rutNumber = rutNumber.replace(/\D/g, "");
    var validadorCalculado =
      11 -
      (rutNumber
        .split("")
        .reverse()
        .reduce((sum, el, i) => {
          let newSum = sum;
          newSum += el * ((i % 6) + 2);
          return newSum;
        }, 0) %
        11);

    validadorCalculado =
      typeof validadorCalculado === "string"
        ? validadorCalculado
        : validadorCalculado.toString();
    if (validadorCalculado === "10") {
      validadorCalculado = "K";
    } else if (validadorCalculado === "11") {
      validadorCalculado = "0";
    }
    return validadorCalculado === rutValidator.toUpperCase();
  },
  message: "Rut invalido"
};
