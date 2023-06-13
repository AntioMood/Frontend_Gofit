<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Laporan Gym</h1>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <router-link :to="{ name: 'laporan.index' }" class="btn btn-md btn-success">Kembali Ke Halaman Utama Laporan</router-link>
          <button class="btn btn-md-3 btn-success" @click="downloadPDF()">Cetak</button>
          <div class="card border-0 rounded shadow">
            <div class="card-body" ref="content">
              <div>
                  <h5><u>Bulan : {{ bulan }}&nbsp;&nbsp;&nbsp;&nbsp;Tahun : {{ tahun }} </u></h5>
                  <h5>Tanggal Cetak  : {{ tgl_cetak }}</h5>
              </div>
              <table class="table table-striped table-bordered mt-4" border="2">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Jumlah Member</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(laporanGym, id) in laporanGyms" :key="id">
                    <td>{{ laporanGym.tanggal }}</td>
                    <td>{{ laporanGym.jumlah }}</td>
                  </tr>
                  <tr>
                    <td colspan="1"><b>Total</b></td>
                    <td>{{ total }}</td>
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
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  
  export default {
    setup() { 
        //reactive state 
        let laporanGyms = ref([]) 
        let tahun = ref([]) 
        let tgl_cetak = ref([]) 
        let bulan = ref([]) 
        let total = ref([]) 

        //mounted 
        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://pandu.ppcdeveloper.com/api/laporan_gym') 
            .then(response => { 
                //assign state posts with response data 
                laporanGyms.value = response.data.data 
                tahun.value = response.data.tahun 
                tgl_cetak.value = response.data.tgl_cetak
                bulan.value = response.data.bulan
                total.value = response.data.total
            }).catch(error => {
                 console.log(error.response.data) 
            }) 

        }) 

        return { 
            laporanGyms, 
            tahun, 
            bulan, 
            tgl_cetak,
            total
        } 
    },
  
    methods: {
      downloadPDF() {
        var html = this.$refs.content;
        let newWin = '';
        newWin = window.open('');
        newWin.document.write(html.outerHTML);
        newWin.print();
        newWin.close();
      },
    },
  };
  </script>
  
  <style>
  </style>
  