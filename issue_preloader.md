# GSAP Preloader Implementation

Akan membuat preloader animasi dengan persentase angka (0-100%) dan transisi yang smooth untuk masuk ke konten utama, dengan mereplika *feel* dari referensi Dave Holloway. Preloader hanya akan muncul sekali per sesi (menggunakan `sessionStorage`).

## Proposed Changes

### Komponen Preloader (Baru)

- **`src/components/Preloader.jsx`**:
  - Komponen React dengan *fixed overlay* dan teks persentase berukuran besar.
  - Menggunakan `useEffect` untuk memeriksa `sessionStorage.getItem('loading-sequence-seen') === 'true'`.
  - Jika valuenya `true` (sudah pernah dikunjungi di sesi yang sama), komponen langsung return `null` atau `display: none` agar preloader tidak dimuat ulang.
  - Jika belum, GSAP akan menganimasikan sebuah counter dari 0 ke 100 secara smooth.
  - Setelah 100%, terjadi transisi *sweep* atau *fade out* untuk menyembunyikan preloader dan menampilkan konten web. 
  - Menyimpan status `sessionStorage.setItem('loading-sequence-seen', 'true')` setelah animasi selesai sepenuhnya.

- **`src/components/Preloader.scss`**:
  - Styling layarnya: `position: fixed; inset: 0; z-index: 9999; background: #000; display: flex; align-items: center; justify-content: center;`
  - Styling teks persentase.

### Update App.jsx

- **`src/App.jsx`**:
  - Mengimpor dan merender komponen `<Preloader />`.
