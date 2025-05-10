import { categoryIconsMap } from 'icons/Categories';
import { Tag } from 'lucide-react';

export function getIconByCategoryName(name) {
  const normalized = name.toLowerCase().trim();
  const icons = categoryIconsMap[normalized];
  if (icons && icons.length > 0) {
    return icons[Math.floor(Math.random() * icons.length)];
  }
  return Tag;
}
