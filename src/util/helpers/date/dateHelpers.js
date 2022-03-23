const addMonthToDate = (date, num) =>
  new Date(date.setMonth(date.getMonth() + num));

export default { addMonthToDate };
