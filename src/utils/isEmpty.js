import { checkType } from './checkType';

/**
 * 参数数量为1，判断该参数为空；参数数量大于1，判断这些参数都为空
 * @param  {...any} args
 */
export function isEmpty(...args) {
  return args.every(data => {
    const dataType = checkType(data);
    switch (dataType) {
      case 'array':
        return !data.length;
      case 'object':
        return !Object.keys(data).length;
      case 'map':
      case 'set':
        return !data.size;
      case 'boolean':
      case 'number':
      case 'symbol':
      case 'function':
        return false;
      default:
        return !data;
    }
  });
}
