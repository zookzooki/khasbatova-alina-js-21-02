const converDate = (value: string) => {
  const date = new Date(value);
  const dd = date.getDate();
  let newDd;
  if (dd < 10) {
    newDd = `0${dd}`;
  }

  const mm = date.getMonth() + 1;
  let newMm;
  if (mm < 10) {
    newMm = `0${mm}`;
  }

  const yy = date.getFullYear();

  const hh = date.getHours();
  let newHh;
  if (hh < 10) {
    newHh = `0${hh}`;
  }

  const min = date.getMinutes();
  let newMin;
  if (min < 10) {
    newMin = `0${min}`;
  }

  return {
    dd: newDd || dd,
    mm: newMm || mm,
    yy,
    hh: newHh || hh,
    min: newMin || min,
  };
};

export function formatDate(value: string) {
  const date = converDate(value);
  return `${date.dd}.${date.mm}.${date.yy} ${date.hh}:${date.min}`;
}

export function formatDateNoTime(value: string) {
  const date = converDate(value);
  return `${date.dd}.${date.mm}.${date.yy}`;
}
