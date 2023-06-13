<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH INSTRUKTUR</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Instruktur</label>
                                <input type="text" class="form-control" v-model="instruktur.nama_instruktur" placeholder="Masukkan nama Instruktur">

                                <!--validation-->
                                <div v-if="validation.nama_instruktur" class="mt-2 alert alert-danger">
                                    {{ validation.nama_instruktur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jenis Kelamin</label>
                                <input class="form-control" v-model="instruktur.jenis_kelamin" placeholder="Masukkan jenis kelamin">

                                <!--validation-->
                                <div v-if="validation.jenis_kelamin" class="mt-2 alert alert-danger">
                                    {{ validation.jenis_kelamin[0]}}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <input class="form-control" type="date" v-model="instruktur.tgl_lahir" placeholder="Masukkan Tanggal Lahir">

                                <!--validation-->
                                <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger">
                                    {{ validation.tgl_lahir[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nomor Telepon</label>
                                <input class="form-control" v-model="instruktur.no_telp" placeholder="Masukkan nomor telepon">

                                <!--validation-->
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                                    {{ validation.no_telp[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                             <label for="content" class="form-label">Email</label>
                                <input class="form-control" v-model="instruktur.email" placeholder="Masukkan email">

                                <!--validation-->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Password</label>
                                <input class="form-control" v-model="instruktur.pass" placeholder="Masukkan password">
                                <!--validation-->
                                <div v-if="validation.pass" class="mt-2 alert alert-danger">
                                    {{ validation.pass[0]}}
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
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    export default {
        setup() {
            //state departemen
            const instruktur = reactive({
                nama_instruktur: '',
                jenis_kelamin: '',
                tgl_lahir: '',
                no_telp:'',
                email:'',
                pass:''
            })

            //state validation
            const validation = ref([])
            //vue router
            const router = useRouter()

            //method store
            function store() {
                let nama_instruktur = instruktur.nama_instruktur
                let jenis_kelamin = instruktur.jenis_kelamin
                let tgl_lahir = instruktur.tgl_lahir
                let no_telp = instruktur.no_telp
                let email = instruktur.email
                let pass = instruktur.pass

                axios.post('https://pandu.ppcdeveloper.com/api/instruktur', {
                    nama_instruktur: nama_instruktur,
                    jenis_kelamin: jenis_kelamin,
                    tgl_lahir: tgl_lahir,
                    no_telp: no_telp,
                    email: email,
                    pass: pass
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
                store
            }

        }
    }    
</script>

<style>

</style>


