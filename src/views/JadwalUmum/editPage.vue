<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT PEGAWAI</h4>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Instruktur</label>
                                <select name="id_instruktur" id="id_instruktur" class="form-select" v-model="jadwal_umums.id_instruktur">

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
                                <select name="id_kelas" id="id_kelas" class="form-select" v-model="jadwal_umums.id_kelas">

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
                                <select name="hari" id="hari" class="form-select" v-model="jadwal_umums.hari">
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
                                <select name="hari" id="hari" class="form-select" v-model="jadwal_umums.jam_mulai">
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
    import { useRouter, useRoute } from 'vue-router'
    import axios from 'axios'

    export default {
        setup() {
            //state pegawai
            const jadwal_umums = reactive({
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

            //vue route
            const route = useRoute()

            onMounted(() => {
            //get API from Backend
            axios.get('http://localhost:8000/api/kelas')
                .then(response => {
                    //assign state posts with response data
                    kelas.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })

                axios.get('http://localhost:8000/api/instruktur')
                .then(response => {
                    //assign state posts with response data
                    instruktur.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })

                axios.get(`http://localhost:8000/api/jadwalU/${route.params.id_jadwalU}`)
                .then(response => {
                    //assign state posts with response data
                    jadwal_umums.id_instruktur = response.data.data.id_instruktur
                    jadwal_umums.id_kelas = response.data.data.id_kelas
                    jadwal_umums.hari = response.data.data.hari
                    jadwal_umums.jam_mulai = response.data.data.jam_mulai
                }).catch(error => {
                    console.log(error.response.data)
                })
            })

            //method store
            function update() {
                let id_instruktur = jadwal_umums.id_instruktur
                let id_kelas = jadwal_umums.id_kelas
                let hari = jadwal_umums.hari
                let jam_mulai = jadwal_umums.jam_mulai

                axios.put(`http://localhost:8000/api/jadwalU/${route.params.id_jadwalU}`, {
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
                jadwal_umums,
                kelas,
                instruktur,
                validation,
                router,
                update
            }

        }
    }    
</script>


<style>

</style>