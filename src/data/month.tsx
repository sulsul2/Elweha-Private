export const dataMonth = (start: Date, end: Date) => {
  const data: Array<{ value: string; label: string }> = [];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var monthIdxStart = start.getMonth();
  var yearStart = start.getFullYear();
  var monthIdxEnd = end.getMonth();
  var yearEnd = end.getFullYear();

  while (!(yearStart == yearEnd && monthIdxStart == monthIdxEnd)) {
    data.push({
      value: `${monthIdxEnd + 1}-${yearEnd}`,
      label: `${month[monthIdxEnd]} ${yearEnd}`,
    });
    if (monthIdxEnd == 0) {
      monthIdxEnd = 11;
      yearEnd--;
    } else {
      monthIdxEnd--;
    }
  }
  data.push({
    value: `${monthIdxStart + 1}-${yearStart}`,
    label: `${month[monthIdxStart]} ${yearStart}`,
  });
  return data;
};
