import fetch from 'auth/FetchInterceptor'
import { UPDATE_USER } from 'redux/constants/User';
import store from 'redux/store'

const MenuService = {}

/*
    Injeta na store do usuário os dados do menu
*/
// TODO: após clonar o skeleton, ajustar essa função
MenuService.populateMenuData = async function () {
    const userState = store.getState().user;
    const authState = store.getState().auth;
    if(!userState.name && authState.token) {
        const menuData = await MenuService.getMenuData();

        store.dispatch({
            type: UPDATE_USER,
            name: menuData.user.nome,
            role: "Usuário"
        });
    }
}

// TODO: após clonar o skeleton, ajustar essa função
MenuService.getMenuData = function () {
	return fetch({
		url: '/v1/rest/menu',
		method: 'get'
	})
}

export default MenuService