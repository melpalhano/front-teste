import { MENU_RESOURCES_CONFIGS } from '../../config/menu';

export const getPageTitleFromPath = (pathname: string): string => {
  const menuItem = MENU_RESOURCES_CONFIGS.find((item) => {
    if (item.path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(item.path);
  });

  return menuItem?.title || 'Página';
};
