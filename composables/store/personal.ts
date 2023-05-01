import { defineStore } from 'pinia';


export const personal = defineStore("personal", {
    state: () => ({
        isEditor: false,
        userAvatar: "",
        id: "",
        nickname: "",
        sex: "",
        introduce: "",
        area: "",
        birth: ""
    }),

    getters: {

    },

    actions: {
        setPersonal(data) {
            this.userAvatar = data.avatar;
            this.id = data.id;
            this.nickname = data.nickname;
        }
    }
})

