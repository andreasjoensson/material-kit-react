// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'medarbejdere',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Vagtplan',
    path: '/vagtplan/edit',
    icon: icon('ic_user'),
  },
  {
    title: 'Regler',
    path: '/dashboard/regler',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
