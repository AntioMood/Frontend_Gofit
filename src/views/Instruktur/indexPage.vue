<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'instruktur.create'}" class="btn btn-md btn-success">TAMBAH INSTRUKTUR</router-link>
                        <button @click.prevent="resetTerlambat()" class="btn btn-md btn-success">Reset Terlambat</button>
                        <table class="table table-striped table-bordered mt-4">

                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nama Instruktur</th>
                                    <th scope="col">Jenis Kelamin</th>
                                    <th scope="col">Tanggal Lahir</th>
                                    <th scope="col">Nomor Telepon</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Jumlah Terlambat (Detik)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(instruktur, id_instruktur) in instrukturs" :key="id_instruktur">
                                    <td>{{ instruktur.nama_instruktur }}</td>
                                    <td>{{ instruktur.jenis_kelamin }}</td>
                                    <td>{{ instruktur.tgl_lahir }}</td>
                                    <td>{{ instruktur.no_telp }}</td>
                                    <td>{{ instruktur.email }}</td>
                                    <td>{{ instruktur.jumlah_terlambat }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'instruktur.edit', params: { id_instruktur: instruktur.id_instruktur } }" class="btn btn-sm btn-primary mr-1">
                                            EDIT
                                        </router-link>
                                        <button @click.prevent="instrukturDelete(instruktur.id_instruktur)" class="btn btn-sm btn-danger ml-1">
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
        let instrukturs = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('https://pandu.ppcdeveloper.com/api/instruktur')
            .then(response => {
                //assign state posts with response data
                instrukturs.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function instrukturDelete(id_instruktur){
          axios.delete(`https://pandu.ppcdeveloper.com/api/instruktur/${id_instruktur}`)
            .then(() => {     
            //splice instruktur 
              instrukturs.value.splice(instrukturs.value.indexOf(id_instruktur),1)
                window.location.reload();
            }).catch(error =>{
                console.log(error.response.data)
            })
        }

        function resetTerlambat(){
            axios.post(`https://pandu.ppcdeveloper.com/api/instruktur_reset`)
            .then(() => {     
            //splice instruktur 
                window.location.reload();
            }).catch(error =>{
                console.log(error.response.data)
            })
        }

        return{
            instrukturs,
            instrukturDelete,
            resetTerlambat
        }
    }
}
</script>

<style>

</style>