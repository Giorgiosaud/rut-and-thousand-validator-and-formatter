export default {
  params: ["rut"],
  validate(value, params) {
    var validador = typeof value === "string" ? value : value.toString();
    var rut = params.rut.replace(/\./g, "");
    var validadorCalculado =
      11 -
      (rut
        .split("")
        .reverse()
        .reduce(function (sum, el, i) {
          return (sum += el * ((i % 6) + 2));
        }, 0) %
        11);
    validadorCalculado =
      typeof validadorCalculado === "string"
        ? validadorCalculado
        : validadorCalculado.toString();
    if (validadorCalculado === "11") {
      validadorCalculado = "K";
    } else if (validadorCalculado === "10") {
      validadorCalculado = "0";
    }
    return validadorCalculado === validador.toUpperCase();
  },
  message: "Numero Validadaor de Rut invalido"
};
