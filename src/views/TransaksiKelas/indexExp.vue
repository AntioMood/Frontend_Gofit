<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'tdepoK.index'}" class="btn btn-md btn-success">Transaksi Deposit Kelas Page</router-link>
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
                                    <td>{{ depoKelas.nama_pegawai }}</td>
                                    <td>{{ depoKelas.nama_member }}</td>
                                    <td>{{ depoKelas.nama_kelas }}</td>
                                    <td>{{ depoKelas.tgl_transaksi }}</td>
                                    <td>{{ depoKelas.tgl_exp }}</td>
                                    <td>{{ depoKelas.depoK }}</td>
                                    <td>Rp.{{ formatRP(depoKelas.totalBayar) }}</td>
                                    <td>{{ depoKelas.totalDepoK }}</td>
                                    <td>{{ depoKelas.bonus }}</td>
                                    <td class="text-center">
                                        <button @click.prevent="resetDepoK(depoKelas.id_TdepoK)" class="btn btn-sm btn-danger ml-1">
                                            Reset Deposit Kelas
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
        let transaksi_deposit_kelas = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('https://pandu.ppcdeveloper.com/api/depoK_show')
            .then(response => {
                //assign state posts with response data
                transaksi_deposit_kelas.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function resetDepoK(id_TdepoK){
          axios.post(`https://pandu.ppcdeveloper.com/api/depoK/${id_TdepoK}`)
          .then(() => {     
            //splice instruktur 
                // window.location.reload();
                Swal.fire('Berhasil!')
            }).catch(error =>{
                console.log(error.response.data)
            })
        }

        function formatRP(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }

        return{
            transaksi_deposit_kelas,
            resetDepoK,
            formatRP
        }
    }
}
</script>

<style>

</style>