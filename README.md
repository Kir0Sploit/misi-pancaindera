# Misi Pemeriksaan Pancaindera

BBM interaktif Bahasa Melayu Tahun 4 bertemakan keselamatan di lapangan terbang. Murid menjadi Pegawai Pemeriksaan Pancaindera bagi penerbangan Kuala Lumpur ke Singapura. Permainan fiksyen ini boleh dimainkan pada lima iPad, satu bagi setiap pasukan.

## Objektif pendidikan

SK 5.1; SP 5.1.3 (iii): memahami dan menggunakan kata adjektif pancaindera mengikut konteks. Sasaran bagi setiap pasukan ialah mengenal pasti sekurang-kurangnya 4/5 kata adjektif dan membina sekurang-kurangnya 4/5 ayat dengan betul.

## Aliran permainan

Mula → pilih satu daripada lima pasukan → lima soalan kata adjektif → pengukuhan S + KA + KH + K → lima ayat melalui ketik dan letak → keputusan. Terdapat enam variasi bagi setiap deria (30 konteks, masing-masing dengan aktiviti kenal pasti dan bina ayat), set A, set B dan set rawak. Set tetap bertindih untuk pengukuhan. Dua misi menggunakan konteks sama untuk menghubungkan pengenalpastian dengan aplikasi.

Setiap jawapan yang akhirnya diselesaikan mendapat satu bintang, maksimum 10. Markah objektif dikira berasingan: betul pada percubaan pertama tanpa menggunakan petunjuk. Objektif tercapai apabila kedua-dua misi mencapai sekurang-kurangnya 4/5. Percubaan salah boleh diulang tanpa had; jawapan tidak terus didedahkan. Markah ialah ukuran kumpulan, bukan penilaian individu.

Tetapan guru membolehkan pemasa, bunyi dan petunjuk ditukar serta pasukan/set dipilih untuk misi baharu. Pemasa tidak menyebabkan kegagalan. Hanya tetapan disimpan dalam localStorage; prestasi dan maklumat murid tidak disimpan. Muat semula halaman untuk sesi bersih. Jangan merasa atau menghidu bahan tidak dikenali; semua aktiviti ialah simulasi bahasa.

## Teknologi dan seni bina

React + TypeScript strict + Vite + CSS. Data pendidikan dalam `src/data/questions.ts`; mesin keadaan skrin dalam `src/App.tsx`; dialog asli dengan fokus terkurung dan ilustrasi SVG dalam `src/components/UI.tsx`. Aliran data: set/pasukan → lima soalan → jawapan dan percubaan dalam memori → markah setiap misi → keputusan. Tiada backend, pangkalan data, akaun, API berbayar atau rahsia. Web Audio menjana bunyi hanya selepas interaksi dan gagal secara senyap jika tidak tersedia. Nunito menggunakan Google Fonts dengan fon sistem sebagai sandaran.

## Pembangunan tempatan

Gunakan Node.js 22.12+ dan jalankan arahan dari folder projek ini:

```sh
npm ci
npm run dev
```

## Binaan dan ujian

```sh
npm run build
npx playwright install chromium
npm test
npm run preview
```

Ujian Playwright meliputi lima pasukan, jawapan salah dan betul, dua misi, ambang objektif, ulang main, pertukaran pasukan, tetapan dan viewport sentuh. Aset Vite menggunakan `base: './'`, jadi laluan relatif berfungsi dalam subdirektori GitHub Pages. Tiada client-side URL router atau keperluan fallback 404.

## Penerbitan GitHub Pages

Folder ini ialah akar projek kendiri. Salin **kandungan folder ini termasuk `.github`**, bukan keseluruhan folder IPGFlow, ke repositori GitHub baharu, contohnya `misi-pancaindera`.

1. Tolak fail projek dan `package-lock.json` ke branch `main`.
2. Dalam repositori: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Buka **Actions → Deploy game to GitHub Pages → Run workflow**, atau push ke `main`.
4. Selepas job deploy berjaya, buka `https://USERNAME.github.io/REPOSITORY/` (contoh `https://USERNAME.github.io/misi-pancaindera/`).

Workflow memasang dependensi, membina projek, memuat naik `dist`, kemudian menerbitkan melalui GitHub Pages. Konfigurasi ini menganggap permainan berada di akar repositori penerbitan. Ia sengaja tidak mengubah workflow aplikasi IPGFlow induk. Laman permainan: https://kir0sploit.github.io/misi-pancaindera/ . Repositori: https://github.com/Kir0Sploit/misi-pancaindera . Push ke main akan menerbitkan kemas kini secara automatik.

## Struktur

```
.github/workflows/deploy.yml
src/
  App.tsx
  main.tsx
  styles.css
  components/UI.tsx
  data/questions.ts
public/favicon.svg
tests/game.spec.ts
```

## Kredit

Kandungan berdasarkan brief pengajaran Bahasa Melayu Tahun 4 yang dibekalkan pengguna. Ilustrasi terminal SVG asal; ikon Lucide (ISC), fon Nunito (SIL Open Font License), emoji mengikut sistem peranti. Tiada tangkapan skrin rujukan disertakan bersama brief; reka bentuk terminal dihasilkan berdasarkan arahan visual bertulis.

## Muzik dan lobi permainan

Lobi mempunyai animasi kapal terbang, awan, bagasi di tali sawat, pancaran pengimbas dan pegawai melambai. Gunakan butang jeda untuk menghentikan animasi; tetapan sistem `prefers-reduced-motion` turut dihormati.

Muzik pengembaraan asal lapan bar dijana secara tempatan dengan Web Audio (melodi loceng, arpeggio dan bes). Muzik bermula selepas interaksi pengguna. Kesan bunyi berbeza tersedia untuk ketikan, susun cebisan, mula misi, jawapan betul, percubaan semula dan tamat misi. Kawalan pembesar suara mematikan semua audio; butang muzik atau Tetapan Guru mengawal muzik latar. Audio dijeda apabila tab disembunyikan dan tetapan disimpan pada peranti. Tiada fail audio luaran atau lesen muzik tambahan diperlukan.

Komponen lobi: `src/components/GameHome.tsx`. Enjin audio: `src/audio/GameAudio.ts`. Ujian tambahan `tests/audio-lobby.spec.ts` menyemak peraturan autoplay, gain audio, mute, tab tersembunyi, penyimpanan pilihan, jeda animasi dan paparan responsif.

