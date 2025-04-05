export const formatToUTC7 = (utcDateTime: string): string => {
    const date = new Date(utcDateTime); // Parse the UTC+0 date string
    return date.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }); // Convert to UTC+7
  };