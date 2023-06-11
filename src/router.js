//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/components/loginPage.vue'),
    },
    {
        path: '/',
        name: 'beranda',
        component: () => import('@/components/DashboardLayou.vue'),
        children:[
            {
                path: "/instruktur",
                name: "instruktur.index",
                component: () => import('@/views/Instruktur/indexPage.vue'),
            },
            {
                path: "/instruktur/create",
                name: "instruktur.create",
                component: () => import('@/views/Instruktur/createPage.vue'),
            },
            {
                path: "/instruktur/edit:id_instruktur",
                name: "instruktur.edit",
                component: () => import('@/views/Instruktur/editPage.vue'),
            },
            {
                path: "/member",
                name: "member.index",
                component: () => import('@/views/Member/indexPage.vue'),
            },
            {
                path: "/member",
                name: "member_exp.index",
                component: () => import('@/views/Member/indexExp.vue'),
            },
            {
                path: "/member/create",
                name: "member.create",
                component: () => import('@/views/Member/createPage.vue'),
            },
            {
                path: "/member/edit/:id_member",
                name: "member.edit",
                component: () => import('@/views/Member/editPage.vue'),
            },
            {
                path: "/jadwalU",
                name: "jadwalU.index",
                component: () => import('@/views/JadwalUmum/indexPage.vue'),
            },
            {
                path: "/jadwalU/create",
                name: "jadwalU.create",
                component: () => import('@/views/JadwalUmum/createPage.vue'),
            },
            {
                path: "/jadwalU/edit/:id_jadwalU",
                name: "jadwalU.edit",
                component: () => import('@/views/JadwalUmum/editPage.vue'),
            },
            {
                path: "/jadwalH",
                name: "jadwalH.index",
                component: () => import('@/views/JadwalHarian/indexPage.vue'),
            },
            {
                path: "/aktivasi",
                name: "aktivasi.index",
                component: () => import('@/views/Aktivasi/indexPage.vue'),
            },
            {
                path: "/aktivasi/create",
                name: "aktivasi.create",
                component: () => import('@/views/Aktivasi/createPage.vue'),
            },
            {
                path: "/tdepoU",
                name: "tdepoU.index",
                component: () => import('@/views/TransaksiUang/indexPage.vue'),
            },
            {
                path: "/tdepoU/create",
                name: "tdepoU.create",
                component: () => import('@/views/TransaksiUang/createPage.vue'),
            },
            {
                path: "/tdepoK",
                name: "tdepoK.index",
                component: () => import('@/views/TransaksiKelas/indexPage.vue'),
            },
            {
                path: "/tdepoK",
                name: "tdepoK_exp.index",
                component: () => import('@/views/TransaksiKelas/indexExp.vue'),
            },
            {
                path: "/tdepoK/create",
                name: "tdepoK.create",
                component: () => import('@/views/TransaksiKelas/createPage.vue'),
            },
            {
                path: "/perizinan",
                name: "perizinan.index",
                component: () => import('@/views/Perizinan/indexPage.vue'),
            },
            {
                path: "/perizinan",
                name: "perizinanAll.index",
                component: () => import('@/views/Perizinan/indexAll.vue'),
            },
            {
                path: "/presensiG",
                name: "presensiGSudah.index",
                component: () => import('@/views/PresensiGym/indexPage.vue'),
            },
            {
                path: "/presensiG",
                name: "presensiGBelum.index",
                component: () => import('@/views/PresensiGym/indexBelum.vue'),
            },
            {
                path: "/presensiK",
                name: "presensiKSudah.index",
                component: () => import('@/views/PresensiKelas/indexPage.vue'),
            },
            {
                path: "/presensiK",
                name: "presensiKBelum.index",
                component: () => import('@/views/PresensiKelas/indexBelum.vue'),
            },
            {
                path: "/laporan",
                name: "laporan.index",
                component: () => import('@/views/Laporan/indexLaporan.vue'),
            },
            {
                path: "/laporan",
                name: "laporaPendapatan.index",
                component: () => import('@/views/Laporan/indexLaporanPendapatan.vue'),
            },
            {
                path: "/laporan",
                name: "laporanGym.index",
                component: () => import('@/views/Laporan/indexLaporanGym.vue'),
            },
            {
                path: "/laporan",
                name: "laporanKelas.index",
                component: () => import('@/views/Laporan/indexLaporanKelas.vue'),
            },
            {
                path: "/laporan",
                name: "laporanInstruktur.index",
                component: () => import('@/views/Laporan/indexLaporanInstruktur.vue'),
            },
        ],
    },
]

//create router
const router = createRouter({
        history: createWebHistory(),
        routes // config routes
    })

    export default router;