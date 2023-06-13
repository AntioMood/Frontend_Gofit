<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Laporan Pendapatan</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{name: 'laporan.index'}" class="btn btn-md btn-success">Kembali Ke Halaman Utama Laporan</router-link>
                <button  class="btn btn-md-3 btn-success"  @click="downloadPDF()">Cetak</button>
                <div class="card border-0 rounded shadow">
                    <div class="card-body" ref='content'> 
                        <div>
                            <h5>Periode : {{ periode }}</h5>
                            <h5>Tanggal Cetak  : {{ Tanggal_Cetak }}</h5>
                        </div>
                        <table class="table table-striped table-bordered mt-4" border="2">                           
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">BULAN</th>         
                                    <th scope="col">DEPOSIT</th> 
                                    <th scope="col">AKTIVASI</th>   
                                    <th scope="col">TOTAL</th>                                                     
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(dataLaporanAll, id) in dataLaporanAlls" :key="id">
                                    <td>{{ dataLaporanAll.Bulan}}</td>
                                    <td>Rp.{{ formatRP(dataLaporanAll.depositall)}}</td>
                                    <td>Rp.{{ formatRP(dataLaporanAll.Aktivasi)}}</td>
                                    <td>Rp.{{ formatRP(dataLaporanAll.total)}}</td>
                                </tr>
                                <tr>                                   
                                    <td colspan="3"><B>Total</B></td>
                                    <td>Rp.{{ formatRP(Total) }}</td>
                                </tr>
                            </tbody> 
                        </table>                        
                    </div> 
                </div> 
            </div>
            <div class="card-body" ref="graph">
                <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3">
                    <h3><b><u>Graph Laporan Pendapatan</u></b></h3>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </div> 
    </div> 
</template>
<script> 
import axios from 'axios' 
import { onMounted, ref } from 'vue' 
// import jsPDF from 'jspdf'
import { Chart } from 'chart.js/auto';

export default { 
    setup() { 
        //reactive state 
        let dataLaporanAlls = ref([]) 
        let Total = ref([]) 
        let periode = ref([]) 
        let Tanggal_Cetak = ref([]) 
        let bulan = ref([])
        
        //mounted 
        onMounted(() => {            
            //get API from Laravel Backend
            axios.get('https://pandu.ppcdeveloper.com/api/laporan_pendapatan') 
            .then(response => {
                dataLaporanAlls.value = response.data.data 
                Total.value = response.data.Total
                periode.value = response.data.periode 
                Tanggal_Cetak.value = response.data.Tanggal_Cetak
                bulan.value = response.data.bulan
                console.log(dataLaporanAlls.value)
                const ctx = document.getElementById('myChart');
                const labels = [];
                const dataValues = [];

                // Mengambil data individu tanpa menggunakan .map()
                for (let i = 0; i < dataLaporanAlls.value.length; i++) {
                    const item = dataLaporanAlls.value[i];
                    const bulanValue = item.Bulan;
                    const totalValue = item.total;

                    // Menambahkan nilai ke dalam array labels dan dataValues
                    labels.push(bulanValue);
                    dataValues.push(totalValue);
                }

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                    labels: labels,
                    datasets: [{
                        label: '# Total Perbulannya',
                        data: dataValues,
                        borderWidth: 1
                    }]
                    },
                    options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                    }
                });
                }).catch(error => {
                    console.log(error)
                })
            })

        function formatRP(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }    
        return { 
            dataLaporanAlls, 
            Total, 
            periode, 
            Tanggal_Cetak,
            formatRP
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