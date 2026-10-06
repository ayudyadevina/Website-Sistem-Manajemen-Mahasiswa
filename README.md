###  Website deploy : https://sistem-manajemen-mahasiswa-if.vercel.app
---
# IF Student Management

**IF Student Management** merupakan website sederhana untuk melakukan pengelolaan data mahasiswa pada lingkungan Program Studi Teknik Informatika. Website ini dirancang untuk mempermudah proses memasukkan, menampilkan, dan mengelola informasi dasar mahasiswa melalui antarmuka yang sederhana dan mudah digunakan.

## 1. Tujuan

Website ini dibuat untuk:

* menyediakan antarmuka sederhana untuk memasukkan data mahasiswa;
* memudahkan pengguna dalam melihat data mahasiswa yang telah dimasukkan;
* mengorganisasi informasi mahasiswa dalam bentuk tabel;
* menerapkan konsep dasar pengembangan website melalui form input dan pengelolaan data;
* menghasilkan tampilan sistem manajemen mahasiswa yang sederhana dan mudah digunakan.

## 2. Fitur Website

### A. Form Data Mahasiswa

Form digunakan untuk memasukkan informasi mahasiswa yang terdiri dari:

* **NRP** — digunakan sebagai identitas mahasiswa;
* **Nama Lengkap** — digunakan untuk memasukkan nama mahasiswa;
* **Email** — menggunakan alamat email mahasiswa ITS dengan format `@student.its.ac.id`;
* **Program Studi** — pengguna dapat memilih program studi yang tersedia.

Program studi yang tersedia pada website meliputi:

* Teknik Informatika
* Rekayasa Perangkat Lunak
* Rekayasa Kecerdasan Artifisial 

### B. Tombol Simpan

Tombol **Simpan** digunakan untuk mengirimkan data mahasiswa yang telah dimasukkan melalui form.

### C. Tombol Batal

Tombol **Batal** digunakan untuk membatalkan atau mengosongkan proses pengisian data.

### D. Tabel Data Mahasiswa

Data mahasiswa ditampilkan dalam bentuk tabel sehingga informasi dapat dilihat secara terstruktur.

Tabel terdiri dari beberapa kolom:

| Kolom         | Fungsi                                       |
| ------------- | -------------------------------------------- |
| No            | Menampilkan nomor urut data                  |
| NRP           | Menampilkan NRP mahasiswa                    |
| Nama          | Menampilkan nama mahasiswa                   |
| Program Studi | Menampilkan program studi mahasiswa          |
| Email         | Menampilkan email mahasiswa                  |
| Aksi          | Menyediakan tindakan terhadap data mahasiswa |

Struktur tabel tersebut tersedia pada halaman utama website.

## 3. Alur Penggunaan

Alur penggunaan website secara umum adalah:

```text
Membuka Website
       ↓
Mengisi Form Data Mahasiswa
       ↓
Memasukkan NRP
       ↓
Memasukkan Nama Lengkap
       ↓
Memasukkan Email
       ↓
Memilih Program Studi
       ↓
Klik "Simpan"
       ↓
Data Mahasiswa Ditampilkan
       ↓
Data Dapat Dikelola Melalui Kolom "Aksi"
```

Jika pengguna tidak ingin melanjutkan pengisian data, pengguna dapat memilih tombol **Batal**.

## 4. Wireframe

Wireframe digunakan sebagai rancangan awal sebelum proses implementasi website. Rancangan ini digunakan untuk menentukan struktur halaman, posisi komponen, serta alur interaksi pengguna.

### Wireframe Halaman Utama

> ** <img width="1888" height="1024" alt="wireframe-web" src="https://github.com/user-attachments/assets/9ab97152-bfea-4f3a-808a-5a0fbc1702a6" /> **


## 5. Struktur Halaman

Website terdiri dari dua bagian utama:

### Form Student

Bagian ini berfungsi sebagai area untuk memasukkan data mahasiswa. Pengguna dapat mengisi NRP, nama lengkap, email, serta memilih program studi. ([IF Student Management][1])

### Data Mahasiswa

Bagian ini berfungsi untuk menampilkan data mahasiswa yang telah dimasukkan ke dalam sistem dalam bentuk tabel. ([IF Student Management][1])

## 6. Teknologi yang Digunakan

Website dikembangkan menggunakan:

* **HTML** — untuk membangun struktur halaman;
* **CSS** — untuk mengatur tampilan dan tata letak;
* **JavaScript** — untuk menangani interaksi dan fungsi pada website;
* **Git & GitHub** — untuk version control dan penyimpanan source code;
* **Vercel** — untuk melakukan deployment website.

> Kalau ternyata kalian menggunakan framework/library tertentu, bagian ini tinggal kita sesuaikan.

## 7. Deployment

Website telah di-deploy menggunakan Vercel dan dapat diakses melalui:

**[IF Student Management](https://sistem-manajemen-mahasiswa-if.vercel.app)**

## 8. Repository

Source code website dikelola menggunakan Git dan disimpan pada repository GitHub.

Proses pengembangan menggunakan alur:

```text
Development
     ↓
Git Add
     ↓
Git Commit
     ↓
Git Push
     ↓
GitHub
     ↓
Vercel
     ↓
Website Deployment
```
