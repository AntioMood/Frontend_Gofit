<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH MEMBER</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <input type="text" class="form-control" v-model="member.nama_member" placeholder="Masukkan nama member">

                                <!--validation-->
                                <div v-if="validation.nama_member" class="mt-2 alert alert-danger">
                                    {{ validation.nama_member[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <input class="form-control" type="date" v-model="member.tgl_lahir" placeholder="Masukkan tanggal lahir">

                                <!--validation-->
                                <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger">
                                    {{ validation.tgl_lahir[0]}}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Alamat</label>
                                <input class="form-control" v-model="member.alamat" placeholder="Masukkan Alamat">

                                <!--validation-->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Email</label>
                                <input class="form-control" v-model="member.email" placeholder="Masukkan alamat Email">

                                <!--validation-->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                             <label for="content" class="form-label">Password</label>
                                <input class="form-control" disabled v-model="member.password" placeholder="Password akan diatur default sesuai tanggal lahir dengan format ddmmYY">
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nomor Telepon</label>
                                <input class="form-control" v-model="member.no_telp" placeholder="Masukkan nomor telepon">

                                <!--validation-->
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                                    {{ validation.no_telp[0]}}
                                </div>
                            </div>

                            <!-- <div class="form-group mb-3">
                                <label for="content" class="form-label">Deposit Uang</label>
                                <input class="form-control" type="float" v-model="member.deposit_uang" placeholder="Masukkan Deposit Uang">
                                
                                <div v-if="validation.deposit_uang" class="mt-2 alert alert-danger">
                                    {{ validation.deposit_uang[0]}}
                                </div>
                            </div> -->
                            <!-- <div class="form-group mb-3">
                                <label for="content" class="form-label">Status</label>
                                <select name="status" id="status" class="form-select" v-model="member.status">
                                    <option value="0">Tidak Aktif</option>
                                    <option value="1">Aktif</option>
                                </select>

                                
                                <div v-if="validation.status" class="mt-2 alert alert-danger">
                                    {{ validation.status[0] }}
                                </div>
                            </div> -->
                            <!-- <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Pembuatan</label>
                                <input class="form-control" type="date" v-model="member.tgl_pembuatan" placeholder="Masukkan tanggal Pembuatan">

                      
                                <div v-if="validation.tgl_pembuatan" class="mt-2 alert alert-danger">
                                    {{ validation.tgl_pembuatan[0]}}
                                </div>
                            </div> -->
                            <!-- <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Expired</label>
                                <input class="form-control" type="date" v-model="member.tgl_exp" placeholder="Masukkan tanggal Expired">

                                
                                <div v-if="validation.tgl_exp" class="mt-2 alert alert-danger">
                                    {{ validation.tgl_exp[0]}}
                                </div>
                            </div> -->
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jenis Kelamin</label>
                                <select name="jenis_kelamin" id="jenis_kelamin" class="form-select" v-model="member.jenis_kelamin">
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>

                                <!--validation-->
                                <div v-if="validation.jenis_kelamin" class="mt-2 alert alert-danger">
                                    {{ validation.jenis_kelamin[0]}}
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
            const member = reactive({
                nama_member: '',
                tgl_lahir: '',
                alamat: '',
                email:'',
                password:'',
                no_telp:'',
                deposit_uang: '',
                status: '',
                tgl_pembuatan: '',
                tgl_exp: '',
                jenis_kelamin: ''
            })

            //state validation
            const validation = ref([])
            //vue router
            const router = useRouter()

            //method store
            function store() {
                let nama_member = member.nama_member
                let tgl_lahir = member.tgl_lahir
                let alamat = member.alamat
                let email = member.email
                let password = member.password
                let no_telp = member.no_telp
                let deposit_uang = member.deposit_uang
                let status = member.status
                // let tgl_pembuatan = member.tgl_pembuatan
                // let tgl_exp = member.tgl_exp
                let jenis_kelamin = member.jenis_kelamin

                axios.post('https://pandu.ppcdeveloper.com/api/member', {
                    nama_member: nama_member,
                    tgl_lahir: tgl_lahir,
                    alamat: alamat,
                    email: email,
                    password: password,
                    no_telp: no_telp,
                    deposit_uang: deposit_uang,
                    status: status,
                    // tgl_pembuatan: tgl_pembuatan,
                    // tgl_exp: tgl_exp,
                    jenis_kelamin: jenis_kelamin
                }).then(() => {
                        //redirect ke post index
                        router.push({
                            name: 'member.index'
                        })
                    }).catch(error => {
                        //assign state validation with error
                        validation.value = error.response.data
                    })

            }

            //return
            return {
                member,
                validation,
                router,
                store
            }

        }
    }    
</script>

<style>

</style>


