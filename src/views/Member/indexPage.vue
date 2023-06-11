<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Member</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'member.create'}" class="btn btn-md btn-success">TAMBAH MEMBER</router-link>
                        <router-link :to="{name: 'member_exp.index'}" class="btn btn-md btn-success">Member Expired</router-link>
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
                                    <td>Rp.{{ formatRP(member.deposit_uang) }}</td>
                                    <td>{{ member.deposit_kelas }}</td>
                                    <td>{{ member.status==0 ? "Tidak Aktif" : "Aktif" }}</td>
                                    <td>{{ member.tgl_pembuatan }}</td>
                                    <td>{{ member.tgl_exp }}</td>
                                    <td>{{ member.jenis_kelamin }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'member.edit', params: { id_member: member.id_member } }" class="btn btn-sm btn-primary mr-1">
                                            EDIT
                                        </router-link>
                                        <button @click.prevent="resetPassword(member.id_member)" class="btn btn-sm btn-primary ml-1">
                                            Reset Password
                                        </button>
                                        <button @click.prevent="downloadPDF(
                                            member.id_member,
                                            member.nama_member,
                                            member.no_telp,
                                            member.alamat
                                        )" class="btn btn-sm btn-primary ml-1">
                                            Cetak Member Card
                                        </button>
                                        <button @click.prevent="memberDelete(member.id_member,)" class="btn btn-sm btn-danger ml-1">
                                            DELETE
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
import jsPDF from 'jspdf'

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
            axios.get('http://localhost:8000/api/member')
            .then(response => {
                //assign state posts with response data
                members.value = response.data.data
            }).catch(error => {
            console.log(error.response.data)
            })
        })

        function memberDelete(id_member){
          axios.delete(`http://localhost:8000/api/member/${id_member}`)
            .then(() => {     
            //splice instruktur 
              members.value.splice(members.value.indexOf(id_member),1)
                window.location.reload();
            }).catch(error =>{
                console.log(error.response.data)
            })
        }

        function resetPassword(id_member){
          axios.post(`http://localhost:8000/api/member/${id_member}`)
            .then(response => {
                    //assign state posts with response data
                    member.password = response.data.data.password
                }).catch(error => {
                    console.log(error.response.data)
            })
        }

        function downloadPDF($id_member, $nama_member, $no_telp, $alamat){
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [10, 15]
            });

            pdf.text('Go Fit', 0.5, 1);
            pdf.text('Member Card', 0.5, 2);
            pdf.text("ID Member         : " + $id_member, 0.5, 3);
            pdf.text("Nama Member   : " + $nama_member, 0.5, 4);
            pdf.text("Alamat                : " + $alamat, 0.5, 5);
            pdf.text("No Telp               : " + $no_telp, 0.5, 6);
            pdf.save("Member Card-" + $id_member + ".pdf");
        }

        function formatRP(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }

        return{
            members,
            member,
            memberDelete,
            resetPassword,
            downloadPDF,
            formatRP
        }
    }
}
</script>

<style>

</style>