export function sparator(bilangan: string) {
  return removeNonNumeric(bilangan).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function sparatorReverse(bilangan: string) {
  return bilangan.split(".").join("");
}

const removeNonNumeric = (num: string) => num.toString().replace(/[^0-9]/g, "");
