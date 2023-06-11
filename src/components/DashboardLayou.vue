<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Gofit</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#sidebarMenu" 
            aria-controls="sidebarMenu" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
        </button>
    </header>
    
    <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item" v-show="role === '3'" >
                            <router-link :to="{name:'instruktur.index'}" class="nav-link">Instruktur</router-link>
                        </li>
                        <li class="nav-item" v-show="role === '3' || role === '1'" >
                            <router-link :to="{name:'member.index'}" class="nav-link">Member</router-link>
                        </li>
                        <li class="nav-item" v-show="role === '3' || role === '2'" >
                            <router-link :to="{ name: 'jadwalU.index' }" class="nav-link">Jadwal Umum</router-link>
                        </li>
                        <li class="nav-item" v-show="role === '3' || role === '2'" >
                            <router-link :to="{name:'jadwalH.index'}" class="nav-link">Jadwal Harian</router-link>
                        </li>
                        <li class="nav-item" v-show="role === '3' || role === '1'" >
                            <router-link :to="{name:'aktivasi.index'}" class="nav-link">Aktivasi Tahunan</router-link>
                        </li>
                        <li class="nav-item" v-show="role === '3' || role === '1'">
                            <router-link :to="{name:'tdepoU.index'}" class="nav-link">Transaksi Deposit Uang</router-link>
                        </li>
                        <li class="nav-item" v-show="role === '3' || role === '1'" >
                            <router-link :to="{name:'tdepoK.index'}" class="nav-link">Transaksi Deposit Kelas</router-link>
                        </li>
                        <li class="nav-item" v-show="role === '3' || role === '2'" >
                            <router-link :to="{name:'perizinan.index'}" class="nav-link">Perizinan Instruktur</router-link>
                        </li>
                        <li class="nav-item" v-show="role === '3' || role === '1'" >
                            <router-link :to="{name:'presensiGSudah.index'}" class="nav-link">Presensi Gym</router-link>
                        </li>
                        <li class="nav-item" v-show="role === '3' || role === '1'" >
                            <router-link :to="{name:'presensiKSudah.index'}" class="nav-link">Presensi Kelas</router-link>
                        </li>
                        <li class="nav-item" v-show="role === '3' || role === '2'" >
                            <router-link :to="{name:'laporan.index'}" class="nav-link">Laporan</router-link>
                        </li>
                        <li class="nav-item pb-4" style="position: sticky; bottom: 0; margin-left: -15px;">
                            <form class="mx-1 mx-md-4 my-auto" @submit.prevent="logout">
                                <button class="btn btn-danger btn-block btn-sm" type="submit">Logout</button>
                            </form>
                        </li>
                    </ul>
                </div>   
            </nav>

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4"> 
                <h5 class="  mt-3" v-if="role === '1'">Halo {{ pegawai.nama_pegawai }}!!</h5>
                <h5 class="  mt-3" v-if="role === '1'">Sebagai Kasir</h5>
                <h5 class="  mt-3" v-if="role === '2'">Halo {{ pegawai.nama_pegawai }}!!</h5>
                <h5 class="  mt-3" v-if="role === '2'">Sebagai MO</h5>
                <h5 class="  mt-3" v-if="role === '3'">Halo {{ pegawai.nama_pegawai }}!!</h5>
                <h5 class="  mt-3" v-if="role === '3'">Sebagai Admin</h5>
                <!-- View Route -->
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>        

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    let nama_user;
    let id_user;
    let role = localStorage.getItem('role');

    const pegawai = ref([]);

    const router = useRouter();

    onMounted(() => {
      //get API from Laravel Backend
      axios.get("http://127.0.0.1:8000/api/pegawai/" + localStorage.getItem("id"))
        .then((response) => {
          //assign state posts with response data
          pegawai.value = response.data.data;
          nama_user = pegawai.value["nama_pegawai"];
          id_user = pegawai.value["id_pegawai"];
          localStorage.setItem('Nama_user', nama_user);
          localStorage.setItem('Id_user', id_user);
          console.log(nama_user);
        })
        .catch((error) => {
          console.log(error.response);
        });
    });

    function logout() {
      localStorage.removeItem("Role");
      localStorage.removeItem("Id_User");
      router.push({
        name: "login",
      });

    }

    return {
      pegawai,
      role,
      nama_user,
      logout,
    };
  },
};
</script>

<style>
    
</style>
