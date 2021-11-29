import { EmptyPlacementText } from '@/assets/libs/enum';

export function formatEmptyPlacement(val) {
  if (val === 0) return 0;
  return val || EmptyPlacementText;
}
