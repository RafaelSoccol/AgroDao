import { 
  EditOutlined,
  FormOutlined,
  EyeOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [
  {
    key: 'home',
    path: `${APP_PREFIX_PATH}/home`,
    title: 'home',
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'cadastro',
    path: `${APP_PREFIX_PATH}/cadastro`,
    title: 'cadastro',
    icon: FormOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'edicao',
    path: `${APP_PREFIX_PATH}/edicao`,
    title: 'edicao',
    icon: EditOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'historico',
    path: `${APP_PREFIX_PATH}/historico`,
    title: 'historico',
    icon: EyeOutlined,
    breadcrumb: false,
    submenu: []
  },

]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
