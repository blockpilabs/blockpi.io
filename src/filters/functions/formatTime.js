import { checkType } from '@/utils';
import { formatTime as fmtTime } from '@/utils/time-utils';

export function formatTime(time, format) {
  if (!time) return;

  if (checkType(time) === 'number' && (time + '').length === 10) {
    time = +time * 1000;
  }

  return fmtTime(time, format);
}

export function formatTimeFromNow(time, format) {
  if (!time) return;

  if (checkType(time) === 'number' && (time + '').length === 10) {
    time = +time * 1000;
  }

  const d = new Date(time);
  const now = Date.now();
  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }

  return fmtTime(time, format);
}
