const convertToKoreanTime = (isoString: string): Date => {
  const date = new Date(isoString);
  const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return koreanTime;
};

export const formatToKoreanDate = (isoString: string): string => {
  const date = convertToKoreanTime(isoString);
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
