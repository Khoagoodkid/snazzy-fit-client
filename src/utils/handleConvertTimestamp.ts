export const formatDateAndTime = (timestamp: number): string => {
    try {
      const date = new Date(Number(timestamp));
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      return date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    } catch {
      return "Invalid Date";
    }
  };
  