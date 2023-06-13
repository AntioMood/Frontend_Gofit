<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'tdepoK.create'}" class="btn btn-md btn-success">Transaksi Deposit Kelas</router-link>
                        <router-link :to="{name: 'tdepoK_exp.index'}" class="btn btn-md btn-success">Transaksi Deposit Kelas Expired</router-link>
                        <table class="table table-striped table-bordered mt-4">

                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nomor Struk</th>
                                    <th scope="col">Nama Pegawai</th>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Jenis Kelas</th>
                                    <th scope="col">Tanggal Transaksi</th>
                                    <th scope="col">Tanggal Expired</th>
                                    <th scope="col">Deposit Kelas yang dimasukan</th>
                                    <th scope="col">Total Bayar</th>
                                    <th scope="col">Total Deposit Kelas yang diperoleh</th>
                                    <th scope="col">Bonus yang didapat</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(depoKelas, id_TdepoK) in transaksi_deposit_kelas" :key="id_TdepoK">
                                    <td>{{ depoKelas.no_strukK }}</td>
                                    <td>{{ depoKelas.pegawai.nama_pegawai }}</td>
                                    <td>{{ depoKelas.member.nama_member }}</td>
                                    <td>{{ depoKelas.kelas.nama_kelas }}</td>
                                    <td>{{ depoKelas.tgl_transaksi }}</td>
                                    <td>{{ depoKelas.tgl_exp }}</td>
                                    <td>{{ depoKelas.depoK }}</td>
                                    <td>Rp.{{ formatRP(depoKelas.totalBayar) }}</td>
                                    <td>{{ depoKelas.totalDepoK }}</td>
                                    <td>{{ depoKelas.bonus }}</td>
                                    <td class="text-center">
                                        <!-- <router-link :to="{ name: 'instruktur.edit', params: { id_instruktur: instruktur.id_instruktur } }" class="btn btn-sm btn-primary mr-1">
                                            EDIT
                                        </router-link> -->
                                        <!-- <button @click.prevent="instrukturDelete(instruktur.id_instruktur)" class="btn btn-sm btn-danger ml-1">
                                            DELETE
                                        </button> -->
                                        <button @click.prevent="downloadPDF(
                                            depoKelas.no_strukK,
                                            depoKelas.id_member,
                                            depoKelas.depoK,
                                            depoKelas.kelas.nama_kelas,
                                            depoKelas.kelas.harga,
                                            depoKelas.totalDepoK,
                                            depoKelas.totalBayar,
                                            depoKelas.bonus,
                                            depoKelas.tgl_transaksi,
                                            depoKelas.tgl_exp,
                                            depoKelas.id_pegawai,
                                            depoKelas.member.nama_member,
                                            depoKelas.pegawai.nama_pegawai
                                        )" class="btn btn-sm btn-primary ml-1">
                                            Cetak Struk Deposit Kelas
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
        let transaksi_deposit_kelas = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('https://pandu.ppcdeveloper.com/api/depoK')
            .then(response => {
                //assign state posts with response data
                transaksi_deposit_kelas.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function downloadPDF($no_strukK, $id_member, $depoK, $nama_kelas, $harga, $totalDepoK, $totalBayar, $bonus, $tgl_transaksi, $tgl_exp, $id_pegawai, $nama_member, $nama_pegawai){
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [10, 20]
            });

            pdf.text('Go Fit', 0.5, 1);
            pdf.text("No Struk : "+ $no_strukK, 14, 1);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 2);
            pdf.text("Tanggal : "+ $tgl_transaksi, 14, 2);
            pdf.text('', 0.5, 3);
            pdf.text("Member                             : "+ $id_member +" / " + $nama_member, 0.5, 4);
            pdf.text("Deposit (bayar " + $depoK + " gratis " + $bonus + ")  : " + "Rp " + $totalBayar + ",- (" + $depoK + " x Rp." + $harga + ")", 0.5, 5);
            pdf.text("Jenis kelas                         : " + $nama_kelas, 0.5, 6);
            pdf.text("Total Deposit " + $nama_kelas + "     : " + $totalDepoK, 0.5, 7);
            pdf.text("Berlaku sampai dengan     : " + $tgl_exp, 0.5, 8);
            pdf.text("Kasir : " + $id_pegawai + " /" + $nama_pegawai, 14, 9);
            pdf.save("Transaksi Deposit Kelas -" + $id_member + ".pdf");
        }

        function formatRP(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }

        return{
            transaksi_deposit_kelas,
            downloadPDF,
            formatRP
        }
    }
}
</script>

<style>

</style>