<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'aktivasi.create'}" class="btn btn-md btn-success">Aktivasi Member</router-link>
                        <table class="table table-striped table-bordered mt-4">

                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nomor Struk</th>
                                    <th scope="col">Nama Pegawai</th>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Tanggal Transaksi</th>
                                    <th scope="col">Tanggal Expire</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(aktivasi, id_aktivasi) in aktivasi_tahunans" :key="id_aktivasi">
                                    <td>{{ aktivasi.no_strukA }}</td>
                                    <td>{{ aktivasi.pegawai.nama_pegawai }}</td>
                                    <td>{{ aktivasi.member.nama_member }}</td>
                                    <td>{{ aktivasi.tgl_transaksi }}</td>
                                    <td>{{ aktivasi.tgl_exp }}</td>
                                    <td class="text-center">
                                        <!-- <router-link :to="{ name: 'instruktur.edit', params: { id_instruktur: instruktur.id_instruktur } }" class="btn btn-sm btn-primary mr-1">
                                            EDIT
                                        </router-link> -->
                                        <!-- <button @click.prevent="instrukturDelete(instruktur.id_instruktur)" class="btn btn-sm btn-danger ml-1">
                                            DELETE
                                        </button> -->
                                        <button @click.prevent="downloadPDF(
                                            aktivasi.no_strukA,
                                            aktivasi.id_member,
                                            aktivasi.tgl_transaksi,
                                            aktivasi.tgl_exp,
                                            aktivasi.id_pegawai,
                                            aktivasi.member.nama_member,
                                            aktivasi.pegawai.nama_pegawai
                                        )" class="btn btn-sm btn-primary ml-1">
                                            Cetak Struk Aktivasi
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
        let aktivasi_tahunans = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('https://pandu.ppcdeveloper.com/api/aktivasi')
            .then(response => {
                //assign state posts with response data
                aktivasi_tahunans.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function downloadPDF($no_strukA, $id_member, $tgl_transaksi, $tgl_exp, $id_pegawai, $nama_member, $nama_pegawai){
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [8, 17]
            });

            pdf.text('Go Fit', 0.5, 1);
            pdf.text("No Struk : "+ $no_strukA, 11, 1);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 2);
            pdf.text("Tanggal : "+ $tgl_transaksi, 11, 2);
            pdf.text('', 0.5, 3);
            pdf.text("Member                    : "+ $id_member +" / " + $nama_member, 0.5, 4);
            pdf.text("Aktivasi Tahunan      : Rp.3.000.000 ", 0.5, 5);
            pdf.text("Masa aktif member   : " + $tgl_exp, 0.5, 6);
            pdf.text("Kasir : " + $id_pegawai + " /" + $nama_pegawai, 11, 7);
            pdf.save("Struk Aktivasi-" + $id_member + ".pdf");
        }

        return{
            aktivasi_tahunans,
            downloadPDF
        }
    }
}
</script>

<style>

</style>