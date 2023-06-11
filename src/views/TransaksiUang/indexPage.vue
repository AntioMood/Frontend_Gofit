<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'tdepoU.create'}" class="btn btn-md btn-success">Transaksi Deposit Uang</router-link>
                        <table class="table table-striped table-bordered mt-4">

                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nomor Struk</th>
                                    <th scope="col">Nama Pegawai</th>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Tanggal Transaksi</th>
                                    <th scope="col">Deposit Uang yang dimasukan</th>
                                    <th scope="col">Total Deposit Uang</th>
                                    <th scope="col">Bonus yang didapat</th>
                                    <th scope="col">Deposit Uang yang dimiliki Member</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(depoUang, id_TdepoU) in transaksi_deposit_uangs" :key="id_TdepoU">
                                    <td>{{ depoUang.no_strukU }}</td>
                                    <td>{{ depoUang.pegawai.nama_pegawai }}</td>
                                    <td>{{ depoUang.member.nama_member }}</td>
                                    <td>{{ depoUang.tgl_transaksi }}</td>
                                    <td>Rp.{{ formatRP(depoUang.depoU) }}</td>
                                    <td>Rp.{{ formatRP(depoUang.totalDepoU) }}</td>
                                    <td>Rp.{{ formatRP(depoUang.bonus) }}</td>
                                    <td>Rp.{{ formatRP(depoUang.sisa) }}</td>
                                    <td class="text-center">
                                        <!-- <router-link :to="{ name: 'instruktur.edit', params: { id_instruktur: instruktur.id_instruktur } }" class="btn btn-sm btn-primary mr-1">
                                            EDIT
                                        </router-link> -->
                                        <!-- <button @click.prevent="instrukturDelete(instruktur.id_instruktur)" class="btn btn-sm btn-danger ml-1">
                                            DELETE
                                        </button> -->
                                        <button @click.prevent="downloadPDF(
                                            depoUang.no_strukU,
                                            depoUang.id_member,
                                            depoUang.depoU,
                                            depoUang.bonus,
                                            depoUang.totalDepoU,
                                            depoUang.sisa,
                                            depoUang.tgl_transaksi,
                                            depoUang.id_pegawai,
                                            depoUang.member.nama_member,
                                            depoUang.pegawai.nama_pegawai
                                        )" class="btn btn-sm btn-primary ml-1">
                                            Cetak Struk Deposit Uang
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
        let transaksi_deposit_uangs = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/depoU')
            .then(response => {
                //assign state posts with response data
                transaksi_deposit_uangs.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function downloadPDF($no_strukU, $id_member, $depoU, $bonus, $totalDepoU, $sisa, $tgl_transaksi, $id_pegawai, $nama_member, $nama_pegawai){
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [10, 17]
            });

            pdf.text('Go Fit', 0.5, 1);
            pdf.text("No Struk : "+ $no_strukU, 11, 1);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 2);
            pdf.text("Tanggal : "+ $tgl_transaksi, 11, 2);
            pdf.text('', 0.5, 3);
            pdf.text("Member                    : "+ $id_member +" / " + $nama_member, 0.5, 4);
            pdf.text("Deposit                     : Rp " + $depoU, 0.5, 5);
            pdf.text("Bonus Deposit          : Rp " + $bonus, 0.5, 6);
            pdf.text("Sisa Deposit             : Rp " + $sisa, 0.5, 7);
            pdf.text("Total Deposit            : Rp " + $totalDepoU, 0.5, 8);
            pdf.text("Kasir : " + $id_pegawai + " /" + $nama_pegawai, 11, 9);
            pdf.save("Transaksi Deposit Uang-" + $id_member + ".pdf");
        }

        function formatRP(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }


        return{
            transaksi_deposit_uangs,
            downloadPDF,
            formatRP
        }
    }
}
</script>

<style>

</style>