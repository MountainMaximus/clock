export const truncateString = (fullStr: string, strLen: number = 15) => {
    if (fullStr.length <= strLen) return fullStr;
    return fullStr.slice(0, strLen) + "...";
  };