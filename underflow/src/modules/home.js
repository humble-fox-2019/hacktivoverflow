import axios from '../config/axios'
import swal from 'sweetalert2'

export default {
    state: {
        threads: [],
        login: ""
    },
    mutations: {
        fillThreads(state, payload) {
            state.threads = []
            payload.forEach(el => state.threads.push(el))
        },
        clearThreads(state) {
            state.threads = []
        }
    },
    actions: {
        fetchThreads({ commit }) {
            axios.get('/threads/')
                .then(({ data }) => {
                    console.log(data);
                    commit('fillThreads', data)
                })
                .catch(err => {
                    swal.fire({
                        type: 'error',
                        title: 'Error fetching data',
                        text: err.response.message
                    })
                })
        }
    },
    getters: {
        getThreads(state) {
            return state.threads
        }
    }
}
