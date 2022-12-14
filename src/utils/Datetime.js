// Datetime related utilities
export const getCurrentTimestamp = () => Math.ceil(Date.now() / 1000);
export const convertTimestampToDate = (val) => {
  const d = new Date(Number(val) * 1000);
  return d.toUTCString();
};
