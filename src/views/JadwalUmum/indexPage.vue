<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'jadwalU.create'}" class="btn btn-md btn-success">TAMBAH JADWAL UMUM</router-link>
                        <table class="table table-striped table-bordered mt-4">

                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nama Instruktur</th>
                                    <th scope="col">Nama Kelas</th>
                                    <th scope="col">Hari</th>
                                    <th scope="col">Jam Mulai</th>
                                    <th scope="col">Jam Selesai</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(jadwal_umum, id_jadwalU) in jadwal_umums" :key="id_jadwalU">
                                    <td>{{ jadwal_umum.instruktur.nama_instruktur }}</td>
                                    <td>{{ jadwal_umum.kelas.nama_kelas }}</td>
                                    <td>{{ jadwal_umum.hari }}</td>
                                    <td>{{ jadwal_umum.jam_mulai }}</td>
                                    <td>{{ jadwal_umum.jam_selesai }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'jadwalU.edit', params: { id_jadwalU: jadwal_umum.id_jadwalU } }" class="btn btn-sm btn-primary mr-1">
                                            EDIT
                                        </router-link>
                                        <button @click.prevent="JadwalUDelete(jadwal_umum.id_jadwalU)" class="btn btn-sm btn-danger ml-1">
                                            DELETE
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

export default {
    setup() {
        //reactive state
        let jadwal_umums = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('https://pandu.ppcdeveloper.com/api/jadwalU')
            .then(response => {
                //assign state posts with response data
                jadwal_umums.value = response.data.data
            }).catch(error => {
            console.log(error.response.data)
            })
        })

        function JadwalUDelete(id_jadwalU){
          axios.delete(`https://pandu.ppcdeveloper.com/api/jadwalU/${id_jadwalU}`)
            .then(() => {     
            //splice instruktur 
              jadwal_umums.value.splice(jadwal_umums.value.indexOf(id_jadwalU),1)
                window.location.reload();
            }).catch(error =>{
                console.log(error.response.data)
            })
        }

        return{
            jadwal_umums,
            JadwalUDelete
        }
    }
}
</script>

<style>

</style>