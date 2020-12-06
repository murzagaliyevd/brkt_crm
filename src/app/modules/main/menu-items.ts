import { MenuItem } from '@shared/models/MenuItem';

export const MENU_ITEMS: MenuItem[] = [
  {
    url: '/',
    icon: 'home',
    label: 'Главная',
  },
  {
    url: null,
    icon: 'list',
    label: 'Заказы',
    children: [
      {
        url: '/orders/pending',
        icon: 'hourglass_full',
        label: 'Ожидающие',
      },
    ]
  },
  {
    url: null,
    icon: 'assignment',
    label: 'Мои накладные',
    children: [
      {
        url: '/directions',
        icon: 'hourglass_full',
        label: 'В ожидании',
      },
      {
        url: '/directions',
        icon: 'check_circle',
        label: 'Подтвержденные',
      },
      {
        url: '/stock-transfer',
        icon: 'double_arrow',
        label: 'Передача на склад',
      },
    ]
  },
  // {
  //   url: null,
  //   icon: 'corporate_fare',
  //   label: 'Склад',
  //   children: [
  //     {
  //       url: '/stock/waiting',
  //       icon: 'hourglass_full',
  //       label: 'В ожидании',
  //     },
  //     {
  //       url: '/stock/in',
  //       icon: 'store',
  //       label: 'На складе',
  //     },
  //   ]
  // },
];
