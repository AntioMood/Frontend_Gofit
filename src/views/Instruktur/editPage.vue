<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT INSTRUKTUR</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Instruktur</label>
                                <input type="text" class="form-control" v-model="instruktur.nama_instruktur">

                                <!--validation-->
                                <div v-if="validation.nama_instruktur" class="mt-2 alert alert-danger">
                                        {{validation.nama_instruktur[0]}}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jenis Kelamin</label>
                                <input class="form-control" v-model="instruktur.jenis_kelamin">

                                <!--validation-->
                                <div v-if="validation.jenis_kelamin" class="mt-2 alert alert-danger">
                                    {{ validation.jenis_kelamin[0]}}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <input class="form-control" type="date" v-model="instruktur.tgl_lahir">

                                <!--validation-->
                                <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger">
                                    {{ validation.tgl_lahir[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nomor Telepon</label>
                                <input class="form-control" v-model="instruktur.no_telp">

                                <!--validation-->
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                                    {{ validation.no_telp[0]}}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Email</label>
                                <input class="form-control" v-model="instruktur.email">

                                <!--validation-->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0]}}
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
            //state departemen
            const instruktur = reactive({
                nama_instruktur: '',
                jenis_kelamin: '',
                tgl_lahir: '',
                no_telp:'',
                email:''
            })

            //state validation
            const validation = ref([])
            //vue router
            const router = useRouter()
            //vue route
            const route = useRoute()

            onMounted(() => {
            //get API from Laravel Backend
                axios.get(`https://pandu.ppcdeveloper.com/api/instruktur/${route.params.id_instruktur}`)
                .then(response => {
                    //assign state posts with response data
                    instruktur.nama_instruktur = response.data.data.nama_instruktur  
                    instruktur.jenis_kelamin  = response.data.data.jenis_kelamin 
                    instruktur.tgl_lahir = response.data.data.tgl_lahir
                    instruktur.no_telp = response.data.data.no_telp
                    instruktur.email = response.data.data.email 

                }).catch(error => {
                    console.log(error.response.data)
                })
            })

            //method update
            function update() {
                let nama_instruktur = instruktur.nama_instruktur
                let jenis_kelamin = instruktur.jenis_kelamin
                let tgl_lahir = instruktur.tgl_lahir
                let no_telp = instruktur.no_telp
                let email = instruktur.email

                axios.put(`https://pandu.ppcdeveloper.com/api/instruktur/${route.params.id_instruktur}`, {
                    nama_instruktur: nama_instruktur,
                    jenis_kelamin: jenis_kelamin,
                    tgl_lahir: tgl_lahir,
                    no_telp: no_telp,
                    email: email
                }).then(() => {
                        //redirect ke post index
                        router.push({
                            name: 'instruktur.index'
                        })
                    }).catch(error => {
                        //assign state validation with error
                        validation.value = error.response.data
                    })

            }

            //return
            return {
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