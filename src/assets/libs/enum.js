export * from './modules/index-products';
export * from './modules/converged-services';
export * from './modules/road-maps';
export * from './modules/feature-info';


/**
 * 排名颜色
 * @param {*} idx 
 * @param {*} type 
 * @returns 
 */
export function rankColor(idx, type) {
 if (type === 1) {
    switch (idx) {
      case 0: 
        return {
          color: '#ffffff',
          bgColor: '#5f7cf9'
        };
      default: 
        return {
          color: '#152339',
          bgColor: '#e4e9ff'
        };
    }
  } else {
    switch (idx) {
      case 0: 
        return {
          color: '#152339',
          bgColor: '#9ad7a0'
        };
      case 1: 
        return {
          color: '#152339',
          bgColor: '#9ad7a0'
        };
      default: 
        return {
          color: '#152339',
          bgColor: '#9ad7a0'
        };
    }
  }
}
