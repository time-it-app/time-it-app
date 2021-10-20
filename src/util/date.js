/**
 * @param {string} dateFormat A format that specifies how to return the formatted date. 
 * Format needs to be specified like this:
 * > dd - day
 * 
 * > MM - month
 * 
 * > yyyy - year
 * 
 * > hh - hour
 * 
 * > mm - minutes
 * 
 * > ss - seconds
 * 
 * @param {Date | string} date A date object or a string that can be parsed as date object
 * @example
 * formatDate('dd/MM/yyyy', '2015-05-16') returns '16/05/2015'
 */
export function formatDate(dateFormat, date) {
  try {
    const [year, month, day, hour, minutes, seconds] = new Date(date)
      .toISOString()
      .split(/-|T|:|\./);

    return dateFormat
      .replace(/dd/g, day)
      .replace(/MM/g, month)
      .replace(/yyyy/g, year)
      .replace(/hh/g, hour)
      .replace(/mm/g, minutes)
      .replace(/ss/g, seconds);
  } catch {
    return '';
  }
}
