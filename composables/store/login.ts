import { defineStore } from 'pinia';


export const login = defineStore("login", {
    state: () => ({
        dialogVisible: false,
        activeName: "login",
        isLogin: false,
        userAvatar: "",
        loginToken: "",
        pageTheme: "theme-white"
    }),

    getters: {

    },

    actions: {
        setLoginDialog(flag: Boolean) {
            this.dialogVisible = flag;
        },
        setActiveName(name: String) {
            this.activeName = name;
        }
    }
})

