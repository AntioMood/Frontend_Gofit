<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'presensiKBelum.index'}" class="btn btn-md btn-success">Data Presensi Kelas Belum dipresensi</router-link>
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
                                    <td>{{ booking_kelas.status==0 ? "Tidak Hadir" : "Hadir" }}</td>
                                    <td class="text-center">
                                        <button v-if= "booking_kelas.jenis_pembayaran == 'Deposit Kelas'"
                                            @click.prevent="downloadPDFDK(
                                            booking_kelas.noStrukBK,
                                            booking_kelas.tgl_booking,
                                            booking_kelas.nama_member,
                                            booking_kelas.id_member,
                                            booking_kelas.nama_kelas,
                                            booking_kelas.nama_instruktur,
                                            booking_kelas.deposit_kelas,
                                            booking_kelas.tgl_exp,
                                        )" class="btn btn-sm btn-primary ml-1">
                                            Cetak Struk Presensi Kelas
                                        </button>
                                        <button v-else
                                            @click.prevent="downloadPDFDU(
                                                booking_kelas.noStrukBK,
                                                booking_kelas.tgl_booking,
                                                booking_kelas.nama_member,
                                                booking_kelas.id_member,
                                                booking_kelas.nama_kelas,
                                                booking_kelas.nama_instruktur,
                                                booking_kelas.harga,
                                                booking_kelas.deposit_uang,
                                            )" class="btn btn-sm btn-primary ml-1">
                                                Cetak Struk Presensi Kelas
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
        let booking_kelas = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/showSudahK')
            .then(response => {
                //assign state posts with response data
                booking_kelas.value = response.data.data
            }).catch(error => {
            console.log(error.response.data)
            })
        })

        function downloadPDFDK($noStrukBK, $tgl_booking, $nama_member, $id_member, $nama_kelas, $nama_instruktur, $deposit_kelas, $tgl_exp){
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [13, 13]
            });

            pdf.text('Go Fit', 0.5, 1);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 2);
            pdf.text("", 0.5, 3);
            pdf.text('STRUK PRESENSI KELAS PAKET', 0.5, 4);
            pdf.text("No Struk          : "+ $noStrukBK, 0.5, 5);
            pdf.text("Tanggal           : " + $tgl_booking, 0.5, 6);
            pdf.text("", 0.5, 7);
            pdf.text("Member           : "+ $id_member +" / " + $nama_member, 0.5, 8);
            pdf.text("Kelas               : " + $nama_kelas , 0.5, 9);
            pdf.text("Instruktur         : " + $nama_instruktur , 0.5, 10);
            pdf.text("Sisa Deposit    : " + $deposit_kelas , 0.5, 11);
            pdf.text("Berlaku sampai : " + $tgl_exp , 0.5, 12);
            pdf.save("Presensi Kelas Member-" + $nama_member + ".pdf");
        }

        function downloadPDFDU($noStrukBK, $tgl_booking, $nama_member, $id_member, $nama_kelas, $nama_instruktur, $harga, $deposit_uang){
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [13, 13]
            });

            pdf.text('Go Fit', 0.5, 1);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 2);
            pdf.text("", 0.5, 3);
            pdf.text('STRUK PRESENSI KELAS', 0.5, 4);
            pdf.text("No Struk          : "+ $noStrukBK, 0.5, 5);
            pdf.text("Tanggal           : " + $tgl_booking, 0.5, 6);
            pdf.text("", 0.5, 7);
            pdf.text("Member           : "+ $id_member +" / " + $nama_member, 0.5, 8);
            pdf.text("Kelas               : " + $nama_kelas , 0.5, 9);
            pdf.text("Instruktur         : " + $nama_instruktur , 0.5, 10);
            pdf.text("Tarif                 : Rp " + $harga , 0.5, 11);
            pdf.text("Sisa Deposit    : Rp " + $deposit_uang , 0.5, 12);
            pdf.save("Presensi Kelas Member-" + $nama_member + ".pdf");
        }

        return{
            booking_kelas,
            downloadPDFDK,
            downloadPDFDU
        }
    }
}
</script>

<style>

</style>