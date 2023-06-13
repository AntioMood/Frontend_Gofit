<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'presensiGSudah.index'}" class="btn btn-md btn-success">Data Presensi Sudah dipresensi</router-link>
                        <table class="table table-striped table-bordered mt-4">

                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Sesi Gym</th>
                                    <th scope="col">Tanggal Booking</th>
                                    <th scope="col">Tanggal Presensi Member</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(booking_gym, id_booking_gym) in booking_gyms" :key="id_booking_gym">
                                    <td>{{ booking_gym.member.nama_member }}</td>
                                    <td>{{ booking_gym.sesi_gym.jam_mulai }} - {{ booking_gym.sesi_gym.jam_selesai }}</td>
                                    <td>{{ booking_gym.tgl_booking }}</td>
                                    <td>{{ booking_gym.tgl_presensi }}</td>
                                    <td class="text-center">
                                        <button @click.prevent="konfirmasi(booking_gym.id_booking_gym)" class="btn btn-sm btn-primary mr-1">
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

export default {
    setup() {
        //reactive state
        let booking_gyms = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('https://pandu.ppcdeveloper.com/api/showBelum')
            .then(response => {
                //assign state posts with response data
                booking_gyms.value = response.data.data
            }).catch(error => {
            console.log(error.response.data)
            })
        })

        function konfirmasi(id_booking_gym){
          axios.post(`https://pandu.ppcdeveloper.com/api/konfirmasiG/${id_booking_gym}`)
            .then(() => {     
            //splice instruktur 
                // window.location.reload();
            }).catch(error =>{
                console.log(error.response.data)
            })
        }

        return{
            booking_gyms,
            konfirmasi,
        }
    }
}
</script>

<style>

</style>