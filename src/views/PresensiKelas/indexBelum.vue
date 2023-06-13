<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'presensiKSudah.index'}" class="btn btn-md btn-success">Data Presensi Kelas Sudah dipresensi</router-link>
                        <table class="table table-striped table-bordered mt-4">

                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Nama Kelas</th>
                                    <th scope="col">Hari</th>
                                    <th scope="col">Jam</th>
                                    <th scope="col">Tanggal Kelas Dimulai</th>
                                    <th scope="col">Tanggal Booking</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(booking_kelas, id_booking) in booking_kelas" :key="id_booking">
                                    <td>{{ booking_kelas.nama_member }}</td>
                                    <td>{{ booking_kelas.nama_kelas }}</td>
                                    <td>{{ booking_kelas.hari }}</td>
                                    <td>{{ booking_kelas.jam_mulai }} - {{ booking_kelas.jam_selesai }}</td>
                                    <td>{{ booking_kelas.tanggal }}</td>
                                    <td>{{ booking_kelas.tgl_booking }}</td>
                                    <td>{{ booking_kelas.status==0 ? "Hadir" : "Tidak Hadir" }}</td>
                                    <td class="text-center">
                                        <button @click.prevent="konfirmasi(booking_kelas.id_booking)" class="btn btn-sm btn-primary mr-1">
                                            Presensi
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
import { onMounted, ref } from 'vue'
import Swal from "sweetalert2";

export default {
    setup() {
        //reactive state
        let booking_kelas = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('https://pandu.ppcdeveloper.com/api/showBelumK')
            .then(response => {
                //assign state posts with response data
                booking_kelas.value = response.data.data
            }).catch(error => {
            console.log(error.response.data)
            })
        })

        function konfirmasi(id_booking){
          axios.post(`https://pandu.ppcdeveloper.com/api/konfirmasiK/${id_booking}`)
            .then(() => {     
            //splice instruktur 
                // window.location.reload();
                Swal.fire('Berhasil!')
            }).catch(error =>{
                console.log(error.response.data)
            })
        }

        return{
            booking_kelas,
            konfirmasi,
        }
    }
}
</script>

<style>

</style>