<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Laporan Kelas</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{name: 'laporan.index'}" class="btn btn-md btn-success">Kembali Ke Halaman Utama Laporan</router-link>
                <button  class="btn btn-md-3 btn-success"  @click="downloadPDF()">Cetak</button>
                <div class="card border-0 rounded shadow">
                    <div class="card-body" ref='content'> 
                        <div>
                            <h5><u>Bulan : {{ bulan }}&nbsp;&nbsp;&nbsp;&nbsp;Tahun : {{ tahun }} </u></h5>
                            <h5>Tanggal Cetak  : {{ tgl_cetak }}</h5>
                        </div>
                        <table class="table table-striped table-bordered mt-4" border="2">                           
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Kelas</th>
                                    <th scope="col">Instruktur</th>
                                    <th scope="col">Jumlah Libur</th>    
                                    <th scope="col">Jumlah Peserta</th>                                                             
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(laporanKelas, id) in laporanKelass" :key="id">
                                    <td>{{ laporanKelas.kelas}}</td>
                                    <td>{{ laporanKelas.instruktur}}</td>
                                    <td>{{ laporanKelas.jumlah_libur}}</td>
                                    <td>{{ laporanKelas.jumlah_peserta}}</td>
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
// import jsPDF from 'jspdf'

export default { 
    setup() { 
        //reactive state 
        let laporanKelass = ref([]) 
        let tahun = ref([]) 
        let tgl_cetak = ref([]) 
        let bulan = ref([]) 

        //mounted 
        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('http://127.0.0.1:8000/api/laporan_kelas') 
            .then(response => { 
                //assign state posts with response data 
                laporanKelass.value = response.data.data 
                tahun.value = response.data.tahun 
                tgl_cetak.value = response.data.tgl_cetak
                bulan.value = response.data.bulan
            }).catch(error => {
                 console.log(error.response.data) 
            }) 

        }) 

        return { 
            laporanKelass, 
            tahun, 
            bulan, 
            tgl_cetak
        } 
    },
    
    methods:{
            downloadPDF(){
                var html = this.$refs.content;
                let newWin = '';
                newWin = window.open("");
                newWin.document.write(html.outerHTML);
                newWin.print();
                newWin.close();
            }
        } 
}
</script> 

<style>
</style>