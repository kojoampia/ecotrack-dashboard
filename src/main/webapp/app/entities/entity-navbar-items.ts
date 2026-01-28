import NavbarItem from 'app/layouts/navbar/navbar-item.model';

export const EntityNavbarItems: NavbarItem[] = [
  {
    name: 'Product',
    route: '/product',
    translationKey: 'global.menu.entities.product',
  },
  {
    name: 'Supplier',
    route: '/supplier',
    translationKey: 'global.menu.entities.supplier',
  },
  {
    name: 'EmissionRecord',
    route: '/emission-record',
    translationKey: 'global.menu.entities.emissionRecord',
  },
  {
    name: 'ProductPassport',
    route: '/product-passport',
    translationKey: 'global.menu.entities.productPassport',
  },
];
