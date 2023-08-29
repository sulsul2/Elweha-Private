export function formatRp(bilangan: number) {
  var comaSplit = bilangan.toFixed(2).toString().split(".");
  var depan = comaSplit[0];
  var coma = comaSplit[1];
  var reverse = depan.toString().split("").reverse().join("");
  let ribuan = reverse.match(/\d{1,3}/g);
  var hasil = ribuan ? ribuan.join(".").split("").reverse().join("") : "NaN";
  return "Rp " + hasil + `${Number.parseInt(coma) != 0 ? "," + coma : ""}`;
}

export function formatRpReverse(bilangan: string) {
  var comaSplit = bilangan.split(" ")[1].toString().split(",");
  var depan = comaSplit[0];
  var coma = comaSplit[1];
  let ribuan = depan.split(".").join("");
  var hasil = ribuan + `${coma ? "." + coma : ""}`;

  return hasil;
}
