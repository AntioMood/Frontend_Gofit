<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Transaksi Deposit Uang</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Pegawai</label>
                                <input type="text" class="form-control" v-model="pegawai" disabled>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Member</label>
                                <select name="id_member" id="id_member" class="form-select" v-model="depoUang.id_member" required>

                                    <option v-for="(item, id_member) in member" :key="id_member" v-bind:value="item.id_member">
                                        {{ item.id_member }} - {{item.nama_member}}
                                    </option>
                                </select>

                                <!-- validation -->
                                <div v-if="validation.id_member && submitted" class="mt-2 alert alert-danger">
                                    {{ validation.id_member[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Deposit Uang yang akan dimasukan</label>
                                <input class="form-control" type="float" v-model="depoUang.depoU" placeholder="Masukkan Deposit Uang" required>
                                <div v-show="showError" class="alert alert-danger">
                                    Minimal Deposit Rp 500.000
                                </div>
                                <!--validation-->
                                <div v-if="validation.depoU && submitted" class="mt-2 alert alert-danger">
                                    {{ validation.depoU[0]}}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import Swal from "sweetalert2";

    export default {
        setup() {
            //state departemen
            const depoUang = reactive({
                id_pegawai: '',
                id_member: '',
                depoU: '',
            })

            let pegawai = localStorage.getItem('Nama_user');

            const member = ref([])

            //state validation
            const validation = ref([])
            //vue router
            const router = useRouter()
            let showError = ref(false);
            const submitted = ref(false);

            onMounted(() => {
                //get API from Laravel Backend
                axios.get('https://pandu.ppcdeveloper.com/api/member')
                .then(response => {
                    //assign state posts with response data
                    member.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })

                // axios.get('https://pandu.ppcdeveloper.com/api/pegawai')
                // .then(response => {
                //     //assign state posts with response data
                //     pegawai.value = response.data.data
                // }).catch(error => {
                //     console.log(error.response.data)
                // })
            });

            //method store
            function store() {
                submitted.value = true;
                let id_pegawai = localStorage.getItem('id')
                let id_member = depoUang.id_member
                let depoU = depoUang.depoU

                axios.post('https://pandu.ppcdeveloper.com/api/depoU', {
                    id_pegawai: id_pegawai,
                    id_member: id_member,
                    depoU: depoU
                }).then(() => {
                        //redirect ke post index
                        Swal.fire('Berhasil!')
                        router.push({
                            name: 'tdepoU.index'
                        })
                    }).catch(error => {
                        //assign state validation with error
                        validation.value = error.response.data
                        showError.value = true; // Menampilkan pesan sukses
                        setTimeout(() => {
                            showError.value = false; // Menyembunyikan pesan sukses setelah beberapa detik
                        }, 3000);
                    })

            }

            //return
            return {
                depoUang,
                validation,
                router,
                store,
                pegawai,
                member,
                showError           
            }
        }
    }    
</script>

<style>

</style>


