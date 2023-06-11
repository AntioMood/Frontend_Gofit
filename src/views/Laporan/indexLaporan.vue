<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Laporan</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <!-- <router-link :to="{name: 'presensiKSudah.index'}" class="btn btn-md btn-success">Data Presensi Kelas Sudah dipresensi</router-link> -->
                        <table class="table table-striped table-bordered mt-4">

                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Laporan Pendapatan</th>
                                    <th scope="col">Laporan Gym</th>
                                    <th scope="col">Laporan Kelas</th>
                                    <th scope="col">Laporan Instruktur</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center">
                                        <router-link :to="{name: 'laporaPendapatan.index'}" class="btn btn-md btn-success">Laporan Pendapatan</router-link>
                                    </td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'laporanGym.index'}" class="btn btn-md btn-success">Laporan Gym</router-link>
                                    </td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'laporanKelas.index'}" class="btn btn-md btn-success">Laporan Kelas</router-link>
                                    </td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'laporanInstruktur.index'}" class="btn btn-md btn-success">Laporan Instruktur</router-link>
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
// import axios from 'axios'
// import { onMounted, ref } from 'vue'

// export default {
//     setup() {
//         //reactive state
//         let booking_kelas = ref([])

//         //mounted
//         onMounted(() => {
//             //get API from Laravel Backend
//             axios.get('http://127.0.0.1:8000/api/showBelumK')
//             .then(response => {
//                 //assign state posts with response data
//                 booking_kelas.value = response.data.data
//             }).catch(error => {
//             console.log(error.response.data)
//             })
//         })

//         function konfirmasi(id_booking){
//           axios.post(`http://localhost:8000/api/konfirmasiK/${id_booking}`)
//             .then(() => {     
//             //splice instruktur 
//                 window.location.reload();
//             }).catch(error =>{
//                 console.log(error.response.data)
//             })
//         }

//         return{
//             booking_kelas,
//             konfirmasi,
//         }
//     }
// }
</script>

<style>

</style>