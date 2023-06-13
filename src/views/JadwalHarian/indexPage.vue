<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Dashboard</h1>
    </div>
  
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div v-show="showSuccess" class="alert alert-success">
                Jadwal berhasil digenerate
            </div>
            <div v-show="showError" class="alert alert-danger">
              Jadwal Sudah Tergenerate untuk Minggu ini
            </div>
            <div class="card-body">
              <button @click.prevent="store()" class="btn btn-sm btn-primary mr-1">
                Generate One Week
              </button>
              <table class="table table-striped table-bordered mt-4">
  
                <!-- <thead class="thead-dark">
                  <tr>
                    <th scope="col">Hari / Tanggal</th>
                    
                  </tr>
                </thead> -->
                <tbody>
                  <template v-for="(row, rowIndex) in jadwal_harians" :key="rowIndex">
                    <tr>
                      <td class="text-center">
                        {{ row[0].hari }}
                        <br>
                        {{ row[0].tanggal }}
                      </td>
                      <td class="text-center" v-for="jadwal_harian in row" :key="jadwal_harian.id_jadwalH">
                        <div v-if="getTimeSlot(jadwal_harian, '08:00', '09:30') !== '-'">
                          {{ getTimeSlot(jadwal_harian, '08:00', '09:30').jam_mulai }}
                          <br> 
                          {{ getTimeSlot(jadwal_harian, '08:00', '09:30').kelas }}
                          <br> 
                          {{ getTimeSlot(jadwal_harian, '08:00', '09:30').instruktur }} 
                          <br>
                          {{ getTimeSlot(jadwal_harian, '08:00', '09:30').status }}
                          <br>
                          <button @click.prevent="JadwalHUpdate(jadwal_harian.id_jadwalH)" class="btn btn-sm btn-primary mr-1">
                            Ubah Menjadi Libur
                          </button>
                        </div>
                        <div v-else-if="getTimeSlot(jadwal_harian, '09:30', '11:00') !== '-'" >
                          {{ getTimeSlot(jadwal_harian, '09:30', '11:00').jam_mulai }} 
                          <br>
                          {{ getTimeSlot(jadwal_harian, '09:30', '11:00').kelas }} 
                          <br>
                          {{ getTimeSlot(jadwal_harian, '09:30', '11:00').instruktur }} 
                          <br>
                          {{ getTimeSlot(jadwal_harian, '09:30', '11:00').status }}
                          <br>
                          <button @click.prevent="JadwalHUpdate(jadwal_harian.id_jadwalH)" class="btn btn-sm btn-primary mr-1">
                            Ubah Menjadi Libur
                          </button>
                        </div>
                        <div v-else-if="getTimeSlot(jadwal_harian, '17:00', '18:30') !== '-'" >
                          {{ getTimeSlot(jadwal_harian, '17:00', '18:30').jam_mulai }} 
                          <br>
                          {{ getTimeSlot(jadwal_harian, '17:00', '18:30').kelas }} 
                          <br>
                          {{ getTimeSlot(jadwal_harian, '17:00', '18:30').instruktur }} 
                          <br>
                          {{ getTimeSlot(jadwal_harian, '17:00', '18:30').status }}
                          <br>
                          <button @click.prevent="JadwalHUpdate(jadwal_harian.id_jadwalH)" class="btn btn-sm btn-primary mr-1">
                            Ubah Menjadi Libur
                          </button>
                        </div>
                        <div v-else-if="getTimeSlot(jadwal_harian, '18:30', '20:00') !== '-'" >
                          {{ getTimeSlot(jadwal_harian, '18:30', '20:00').jam_mulai }} 
                          <br>
                          {{ getTimeSlot(jadwal_harian, '18:30', '20:00').kelas }} 
                          <br>
                          {{ getTimeSlot(jadwal_harian, '18:30', '20:00').instruktur }} 
                          <br>
                          {{ getTimeSlot(jadwal_harian, '18:30', '20:00').status }}
                          <br>
                          <button @click.prevent="JadwalHUpdate(jadwal_harian.id_jadwalH)" class="btn btn-sm btn-primary mr-1">
                            Ubah Menjadi Libur
                          </button>
                        </div>
                        <div v-else>
                          - 
                        </div>
                      </td>
                    </tr>
                  </template>
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
  // import { useToast } from 'vue3-toastify';
  import Swal from "sweetalert2";
  
  export default {
    setup() {
      // Reactive state
      let jadwal_harians = ref([])

      // const toast = useToast();
      let showSuccess = ref(false);
      let showError = ref(false);
  
      // Mounted
      onMounted(() => {
        // Get API from Laravel Backend
        axios.get('https://pandu.ppcdeveloper.com/api/jadwalH')
          .then(response => {
            // Assign state posts with response data
            jadwal_harians.value = groupByDay(response.data.data);
          }).catch(error => {
            console.log(error.response.data)
          })
      })

      function groupByDay(data) {
        return data.reduce((acc, item) => {
          const dayIndex = acc.findIndex(group => group[0].hari === item.hari && group[0].tanggal === item.tanggal);
          if (dayIndex > -1) {
            acc[dayIndex].push(item);
          } else {
            acc.push([item]);
          }
          return acc;
        }, []);
      }
  
      function JadwalHUpdate(id_jadwalH) {
        axios.put(`https://pandu.ppcdeveloper.com/api/jadwalH/${id_jadwalH}`)
          .then(() => {
            // router.push({
            //         name: 'jadwalH.index',
            //     });
            Swal.fire('Berhasil!')
          }).catch(error => {
            console.log(error.response.data)
          })
      }
  
      function store() {
        axios.post(`https://pandu.ppcdeveloper.com/api/jadwalH`)
          .then(response => response.data)
          .then(data => {
            console.log(data); 
            showSuccess.value = true; // Menampilkan pesan sukses
            setTimeout(() => {
              showSuccess.value = false;
              // window.location.reload(); // Menyembunyikan pesan sukses setelah beberapa detik
            }, 3000);
            
          }).catch(error => {
            console.log(error.response.data);
            showError.value = true; // Menampilkan pesan sukses
            setTimeout(() => {
              showError.value = false; // Menyembunyikan pesan sukses setelah beberapa detik
            }, 3000);
          })
      }
  
      function getTimeSlot(jadwal_harian, startTime, endTime) {
        const jam_mulai = jadwal_harian.jam_mulai;
        const jam_selesai = jadwal_harian.jam_selesai;
  
        if (isTimeBetween(jam_mulai, jam_selesai, startTime, endTime)) {
          return {
            kelas: jadwal_harian.kelas.nama_kelas,
            instruktur: jadwal_harian.instruktur.nama_instruktur,
            jam_mulai: jadwal_harian.jam_mulai,
            status: jadwal_harian.status
          };
        } else {
          return '-';
        }
      }
  
      function isTimeBetween(timeStart, timeEnd, timeSlotStart, timeSlotEnd) {
        const start = convertToMinutes(timeStart);
        const end = convertToMinutes(timeEnd);
        const slotStart = convertToMinutes(timeSlotStart);
        const slotEnd = convertToMinutes(timeSlotEnd);
  
        return start <= slotStart && end >= slotEnd;
      }
  
      function convertToMinutes(time) {
        const [hours, minutes] = time.split(':');
        return parseInt(hours) * 60 + parseInt(minutes);
      }
  
      return {
        jadwal_harians,
        JadwalHUpdate,
        store,
        getTimeSlot,
        showSuccess,
        showError,
        groupByDay
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  