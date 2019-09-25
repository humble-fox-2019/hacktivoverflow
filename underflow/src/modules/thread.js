export default {
    state: {
        voteId: "",
        voteStatus: 0
    },
    mutations: {
        changeVoteStatus({ voteStatus }, payload) {
            voteStatus = payload
            if (voteStatus > 1) voteStatus = 1
            if (voteStatus < -1) voteStatus = -1
        }
    },
    actions: {},
    getters: {}
}