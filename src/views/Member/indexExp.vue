<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'member.index'}" class="btn btn-md btn-success">Member Page</router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Tanggal Lahir</th>
                                    <th scope="col">Alamat</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Nomor Telepon</th>
                                    <th scope="col">Deposit Uang</th>
                                    <th scope="col">Deposit Kelas</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Tanggal Pembuatan</th>
                                    <th scope="col">Tanggal Expired</th>
                                    <th scope="col">Jenis Kelamin</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(member, id_member) in members" :key="id_member">
                                    <td>{{ member.nama_member }}</td>
                                    <td>{{ member.tgl_lahir }}</td>
                                    <td>{{ member.alamat }}</td>
                                    <td>{{ member.email }}</td>
                                    <td>{{ member.no_telp }}</td>
                                    <td>{{ member.deposit_uang }}</td>
                                    <td>{{ member.deposit_kelas }}</td>
                                    <td>{{ member.status==0 ? "Tidak Aktif" : "Aktif" }}</td>
                                    <td>{{ member.tgl_pembuatan }}</td>
                                    <td>{{ member.tgl_exp }}</td>
                                    <td>{{ member.jenis_kelamin }}</td>
                                    <td class="text-center">
                                        <button @click.prevent="deaktivasi(member.id_member)" class="btn btn-sm btn-primary ml-1">
                                            Deaktivasi
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'

export default {
    setup() {
        //reactive state
        let members = ref([])

        const member = reactive({
                nama_member: '',
                tgl_lahir: '',
                alamat: '',
                email:'',
                password:'',
                no_telp:'',
                deposit_uang: '',
                deposit_kelas: '',
                status: '',
                tgl_pembuatan: '',
                tgl_exp: '',
                jenis_kelamin: ''
            })

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('https://pandu.ppcdeveloper.com/api/member_show')
            .then(response => {
                //assign state posts with response data
                members.value = response.data.data
            }).catch(error => {
            console.log(error.response.data)
            })
        })

        function deaktivasi(id_member){
          axios.post(`https://pandu.ppcdeveloper.com/api/member_exp/${id_member}`)
            .then(() => {     
            //splice instruktur 
                window.location.reload();
            }).catch(error =>{
                console.log(error.response.data)
            })
        }

        return{
            members,
            member,
            deaktivasi,
        }
    }
}
</script>

<style>

</style>