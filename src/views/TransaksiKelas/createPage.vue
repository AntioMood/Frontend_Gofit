<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <!-- <div v-show="showSuccess" class="alert alert-success">
                        Jadwal berhasil digenerate
                    </div> -->
                    <div v-show="showError" class="alert alert-danger">
                        Deposit kelas yang sama masih ada
                    </div>
                    <div class="card-body">
                        <h4>Transaksi Deposit Kelas</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Pegawai</label>
                                <input type="text" class="form-control" v-model="pegawai" disabled>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Member</label>
                                <select name="id_member" id="id_member" class="form-select" v-model="depoKelas.id_member" required>

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
                                <label for="content" class="form-label">Nama Kelas</label>
                                <select name="id_kelas" id="id_kelas" class="form-select" v-model="depoKelas.id_kelas" required>

                                    <option v-for="(item, id_kelas) in kelas" :key="id_kelas" v-bind:value="item.id_kelas">
                                        {{ item.nama_kelas }}
                                    </option>
                                </select>

                                <!-- validation -->
                                <div v-if="validation.id_kelas && submitted" class="mt-2 alert alert-danger">
                                    {{ validation.id_kelas[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jumlah Deposit Kelas</label>
                                <select name="status" id="status" class="form-select" v-model="depoKelas.depoK" required>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </select>

                                <div v-if="validation.depoK && submitted" class="mt-2 alert alert-danger">
                                    {{ validation.depoK[0]}}
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
            const depoKelas = reactive({
                id_pegawai: '',
                id_member: '',
                id_kelas: '',
                depoK: '',
            })

            let pegawai = localStorage.getItem('Nama_user');

            const member = ref([])

            const kelas = ref([])

            //state validation
            const validation = ref([])
            //vue router
            const router = useRouter()
            // let showSuccess = ref(false);
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

                axios.get('https://pandu.ppcdeveloper.com/api/kelas')
                .then(response => {
                    //assign state posts with response data
                    kelas.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
            });

            //method store
            function store() {
                submitted.value = true;
                let id_pegawai = localStorage.getItem('id');
                let id_member = depoKelas.id_member
                let id_kelas = depoKelas.id_kelas
                let depoK = depoKelas.depoK

                axios.post('https://pandu.ppcdeveloper.com/api/depoK', {
                    id_pegawai: id_pegawai,
                    id_member: id_member,
                    id_kelas: id_kelas,
                    depoK: depoK
                }).then(() => {
                        //redirect ke post index
                        Swal.fire('Berhasil!')
                        router.push({
                            name: 'tdepoK.index'
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
                depoKelas,
                validation,
                router,
                store,
                pegawai,
                member,
                kelas,
                showError            
            }
        }
    }    
</script>

<style>

</style>


