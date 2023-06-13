<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'presensiGBelum.index'}" class="btn btn-md btn-success">Data Presensi belum dipresensi</router-link>
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
                                        <button @click.prevent="downloadPDF(
                                            booking_gym.noStrukBG,
                                            booking_gym.tgl_presensi,
                                            booking_gym.member.id_member,
                                            booking_gym.member.nama_member,
                                            booking_gym.sesi_gym.jam_mulai,
                                            booking_gym.sesi_gym.jam_selesai,
                                        )" class="btn btn-sm btn-primary ml-1">
                                            Cetak Struk Presensi Gym
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
import jsPDF from 'jspdf'

export default {
    setup() {
        //reactive state
        let booking_gyms = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('https://pandu.ppcdeveloper.com/api/showSudah')
            .then(response => {
                //assign state posts with response data
                booking_gyms.value = response.data.data
            }).catch(error => {
            console.log(error.response.data)
            })
        })

        function downloadPDF($noStrukBG, $tgl_presensi, $id_member, $nama_member, $jam_mulai, $jam_selesai){
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [10, 11]
            });

            pdf.text('Go Fit', 0.5, 1);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 2);
            pdf.text("", 0.5, 3);
            pdf.text('STRUK PRESENSI GYM', 0.5, 4);
            pdf.text("No Struk          : "+ $noStrukBG, 0.5, 5);
            pdf.text("Tanggal           : " + $tgl_presensi, 0.5, 6);
            pdf.text("", 0.5, 7);
            pdf.text("Member            : "+ $id_member +" / " + $nama_member, 0.5, 8);
            pdf.text("Slot Waktu        : " + $jam_mulai + " - " + $jam_selesai, 0.5, 9);
            pdf.save("Presensi Gym Member-" + $nama_member + ".pdf");
        }

        return{
            booking_gyms,
            downloadPDF
        }
    }
}
</script>

<style>

</style>