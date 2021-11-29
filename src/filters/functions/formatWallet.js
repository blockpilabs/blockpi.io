/**
 * 格式化显示钱包地址
 * @param {*} str
 * @returns
 */
export function formatWallet(str) {
  if (str.length > 10) {
    return str.substring(0, 5) + '...' + str.substring(str.length - 5);
  }
  return str || '';
}
