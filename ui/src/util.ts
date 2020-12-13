/**
 * Helper method is meant to convert a number into a binary string with leading 0's
 * 
 * @param num The number we want to turn into a binary value
 * @param precision The precision that should be used for this binary value meaning, the extra zeros that should be in front of it
 */
export function toBinary(num: number, precision: number) {
  let result = (num >>> 0).toString(2);
  if (result.length < precision) {
    const offset = precision - result.length;
    for (let i = 0; i < offset; ++i) {
      result = '0' + result;
    }
  }
  return result;
}