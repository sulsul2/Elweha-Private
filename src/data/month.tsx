export const dataMonth = (start: Date, end: Date) => {
  const data = [];
  const month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  var monthIdxStart = start.getMonth();
  var yearStart = start.getFullYear();
  var monthIdxEnd = end.getMonth();
  var yearEnd = end.getFullYear();

  while (!(yearStart == yearEnd && monthIdxStart == monthIdxEnd)) {
    data.push({
      value: {
        month: monthIdxEnd + 1,
        year: yearEnd,
      },
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
    value: {
      month: monthIdxStart,
      year: yearStart,
    },
    label: `${month[monthIdxStart]} ${yearStart}`,
  });
  return data;
};
