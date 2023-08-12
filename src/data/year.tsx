export const dataYear = (start: Date, end: Date) => {
  const data = [];

  var yearStart = start.getFullYear();
  var yearEnd = end.getFullYear();

  while (!(yearStart == yearEnd)) {
    data.push({
      value: `${yearEnd}`,
      label: `${yearEnd}`,
    });
    yearEnd--;
  }
  data.push({
    value: `${yearStart}`,
    label: `${yearStart}`,
  });
  return data;
};
