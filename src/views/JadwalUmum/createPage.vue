<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH JADWAL UMUM</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Instruktur</label>
                                <select name="id_instruktur" id="id_instruktur" class="form-select" v-model="jadwal_umum.id_instruktur">

                                    <option v-for="(item, id_instruktur) in instruktur" :key="id_instruktur" v-bind:value="item.id_instruktur">
                                        {{ item.nama_instruktur }}
                                    </option>
                                </select>

                                <!-- validation -->
                                <div v-if="validation.id_instruktur" class="mt-2 alert alert-danger">
                                    {{ validation.id_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Kelas</label>
                                <select name="id_kelas" id="id_kelas" class="form-select" v-model="jadwal_umum.id_kelas">

                                    <option v-for="(item, id_kelas) in kelas" :key="id_kelas" v-bind:value="item.id_kelas">
                                        {{ item.nama_kelas }}
                                    </option>
                                </select>

                                <!-- validation -->
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.id_kelas[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Hari</label>
                                <select name="hari" id="hari" class="form-select" v-model="jadwal_umum.hari" placeholder="Pilih hari">
                                    <option value="Senin">Senin</option>
                                    <option value="Selasa">Selasa</option>
                                    <option value="Rabu">Rabu</option>
                                    <option value="Kamis">Kamis</option>
                                    <option value="Jumat">Jumat</option>
                                    <option value="Sabtu">Sabtu</option>
                                    <option value="Minggu">Minggu</option>
                                </select>

                                <!-- validation -->
                                <div v-if="validation.hari" class="mt-2 alert alert-danger">
                                    {{ validation.hari[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jam Mulai</label>
                                <select name="hari" id="hari" class="form-select" v-model="jadwal_umum.jam_mulai" placeholder="Pilih Jam">
                                    <option value="08:00:00">08.00 AM</option>
                                    <option value="09:30:00">09:30 AM</option>
                                    <option value="17:00:00">17:00 PM</option>
                                    <option value="18:30:00">18:30 PM</option>
                                </select>

                                <!-- validation -->
                                <div v-if="validation.jam_mulai" class="mt-2 alert alert-danger">
                                    {{ validation.jam_mulai[0] }}
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

    export default {
        setup() {
            //state departemen
            const jadwal_umum = reactive({
                id_instruktur: '',
                id_kelas: '',
                hari: '',
                jam_mulai:'',
            })

            const kelas = ref([])

            const instruktur = ref([])

            //state validation
            const validation = ref([])
            //vue router
            const router = useRouter()

            onMounted(() => {
                //get API from Laravel Backend
                axios.get('https://pandu.ppcdeveloper.com/api/kelas')
                .then(response => {
                    //assign state posts with response data
                    kelas.value = response.data.data
                    console.log(kelas.value)
                }).catch(error => {
                    console.log(error.response.data)
                })

                axios.get('https://pandu.ppcdeveloper.com/api/instruktur')
                .then(response => {
                    //assign state posts with response data
                    instruktur.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
            });

            //method store
            function store() {
                let id_instruktur = jadwal_umum.id_instruktur
                let id_kelas = jadwal_umum.id_kelas
                let hari = jadwal_umum.hari
                let jam_mulai = jadwal_umum.jam_mulai

                axios.post('https://pandu.ppcdeveloper.com/api/jadwalU', {
                    id_instruktur: id_instruktur,
                    id_kelas: id_kelas,
                    hari: hari,
                    jam_mulai: jam_mulai,
                }).then(() => {
                        //redirect ke post index
                        router.push({
                            name: 'jadwalU.index'
                        })
                    }).catch(error => {
                        //assign state validation with error
                        validation.value = error.response.data
                    })

            }

            //return
            return {
                jadwal_umum,
                validation,
                router,
                store,
                instruktur,
                kelas            
            }
        }
    }    
</script>

<style>

</style>


