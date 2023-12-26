import Swal from "sweetalert2";
const state = {
    user: null,
    token: null,
    roles: [],
};
const getters = {
    user: state => state.user,
    token: state => state.token,
    isAuth: state => !!state.user,
    roles: state => state.roles,
};
const actions = {
    logoutAction({ commit, state }) {
        
        
        
        
        
        axios
            .post("https://localhost:7001/Auth/logout", { token: state.token}, {
                headers: {
                    Authorization: "Bearer " + state.token
                }
            })
            .then(response => {
                if (response.status == 200) {
                    loader.hide();
                    Swal.fire({
                        icon: "success",
                        title: "تم تسجيل الخروج",
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        
                        
                    });
                    
                }
            });

            location.assign("/");
commit("logout");
    },
    setUserAction({ commit }, response) {
        commit("setUser", response);
    },
    setTokenAction({ commit }, response) {
        commit("setToken", response);
    },
    setRolesAction({ commit }, response) {
        commit("setRoles", response);
    },
};
const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setToken(state, token) {
        state.token = token;
    },
    setRoles(state, roles) {
        state.roles = roles;
    },
    logout(state) {
        state.user = null;
        state.token = null;
        state.roles = null;
        localStorage.clear()
        localStorage.removeItem("vuex")
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};