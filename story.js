// Desa Melati: data cerita. Dibuat dari naskah_desa_melati.docx. Jangan diubah oleh engine.
// Ekspresi (req, hide, if): string JS sederhana, contoh "tahu>=4 && percaya>=3". Variabel tak dikenal = 0.
// set: penjumlahan ke variabel (boleh negatif). node.set diterapkan sekali saat node dimasuki.
// redirect: node tanpa teks atau pengalihan sebelum tampil. cont: tombol Lanjut ke entri pertama yang benar.
const STORY = {
 "title": "Desa Melati",
 "start": "start",
 "endingsTotal": 7,
 "vars": {
  "teror": 0,
  "tahu": 0,
  "percaya": 0,
  "langgar": 0,
  "bayu": 1,
  "aksi": 0,
  "aksi2": 0,
  "jimat": 0,
  "kalung": 0,
  "catatan": 0,
  "foto": 0,
  "v_balai": 0,
  "v_mbah": 0,
  "v_sd": 0,
  "v_sumur": 0,
  "v_rumah": 0,
  "v_mbah2": 0
 },
 "babTitles": {
  "1": "Babak 1: Kedatangan (Hari 1)",
  "2": "Babak 2: Yang Tidak Boleh Dijawab (Hari 2)",
  "3": "Babak 3: Kebenaran Desa (Hari 3)",
  "4": "Babak 4: Malam Syukuran",
  "5": "Ending"
 },
 "bgFallback": {
  "bg_gerbang_desa": "#3b2a1a",
  "bg_posko_sore": "#2e2418",
  "bg_posko_malam": "#14142b",
  "bg_posko_malam_gelap": "#0b0b1a",
  "bg_posko_pagi": "#1c2a33",
  "bg_jalan_desa_pagi": "#2a3a3a",
  "bg_jalan_desa_siang": "#33403a",
  "bg_balai_desa": "#2b2a22",
  "bg_gubuk_mbah": "#241a14",
  "bg_sd_desa": "#2a2f33",
  "bg_hutan_bambu_malam": "#0a1a14",
  "bg_sumur_tua": "#1f2a24",
  "bg_rumah_kosong": "#2a2420",
  "bg_rumah_dalam": "#1c1814",
  "bg_sumur_malam_ritual": "#1a0f0f",
  "bg_sumur_malam_cahaya": "#0f2a3a",
  "bg_jalan_keluar": "#0f1a1a",
  "bg_subuh": "#10241a",
  "bg_gelap": "#050505"
 },
 "nodes": {
  "start": {
   "label": "Gerbang Desa",
   "bab": 1,
   "speaker": "Narator",
   "text": "Elf yang membawamu dan tiga temanmu berhenti di depan gerbang bambu bertuliskan DESA MELATI. Sore itu langit jingga, tapi tidak ada suara ayam, motor, atau anak-anak bermain.\n\nPak Lurah sudah berdiri menyambut dengan senyum lebar dan tangan terbuka, seolah sudah menunggu sejak lama.",
   "bg": "bg_gerbang_desa",
   "chars": [
    "pak_lurah_ramah"
   ],
   "choices": [
    {
     "text": "Menyalami Pak Lurah dengan ramah",
     "next": "posko",
     "set": {
      "percaya": 1
     }
    },
    {
     "text": "Memperhatikan warga yang mengintip dari balik pagar",
     "next": "posko",
     "set": {
      "tahu": 1
     }
    }
   ]
  },
  "posko": {
   "label": "Empat Pantangan",
   "bab": 1,
   "speaker": "Pak Lurah",
   "text": "\"Ini posko kalian, Nak. Anggap rumah sendiri. Tapi ada empat pantangan di desa ini, tolong dipegang ya.\"\n\nIa mengangkat jari satu per satu. \"Satu, jangan keluar posko setelah maghrib. Dua, jangan menjawab panggilan dari arah hutan bambu. Tiga, jangan dekati rumah di ujung desa. Empat, jangan terima makanan dari warga yang tidak kalian kenal.\"\n\nBayu terkekeh pelan. \"Siap, Pak. Kami anak kota, bukan anak kecil.\"",
   "bg": "bg_posko_sore",
   "chars": [
    "pak_lurah_ramah",
    "bayu_santai"
   ],
   "choices": [
    {
     "text": "Menanyakan alasan di balik pantangan itu",
     "next": "posko_tanya"
    },
    {
     "text": "Mengangguk saja dan menyimpan pertanyaan",
     "next": "malam1_awal"
    }
   ]
  },
  "posko_tanya": {
   "label": "Senyum yang Terlalu Lama",
   "bab": 1,
   "speaker": "Pak Lurah",
   "text": "Senyum Pak Lurah bertahan sedetik terlalu lama. \"Adat, Nak. Namanya juga desa. Yang penting kalian turuti, semua selamat.\"\n\nBayu menyikut lenganmu. \"Udah, jangan bikin suasana aneh di hari pertama.\"\n\nDi sampingmu, Sari diam-diam mencatat sesuatu di buku kecilnya.",
   "bg": "bg_posko_sore",
   "chars": [
    "pak_lurah_senyum_aneh",
    "sari_netral"
   ],
   "choices": [
    {
     "text": "Mendesak: \"Selamat dari apa, Pak?\"",
     "next": "malam1_awal",
     "set": {
      "tahu": 1
     }
    },
    {
     "text": "Menyudahi dan menurut",
     "next": "malam1_awal",
     "set": {
      "percaya": 1
     }
    }
   ]
  },
  "malam1_awal": {
   "label": "Malam Pertama",
   "bab": 1,
   "speaker": "Narator",
   "text": "Malam pertama. Pukul sebelas, kalian berempat duduk di ruang tengah dengan satu bohlam yang berkedip pelan. Bayu masih bercanda soal pantangan, sementara Dina diam menatap jendela yang menghadap hutan bambu.\n\nTeh hangat di depannya belum disentuh sama sekali.",
   "bg": "bg_posko_malam",
   "chars": [
    "dina_netral",
    "bayu_santai"
   ],
   "fx": [
    "flicker"
   ],
   "choices": [
    {
     "text": "Ikut bercanda dengan Bayu",
     "next": "malam1_panggil",
     "set": {
      "percaya": 1
     }
    },
    {
     "text": "Menghampiri Dina dan bertanya kenapa ia diam",
     "next": "malam1_dina"
    }
   ]
  },
  "malam1_dina": {
   "label": "Nyanyian dari Bambu",
   "bab": 1,
   "speaker": "Dina",
   "text": "Dina berbisik supaya Bayu tidak dengar. \"Raka, sejak sore aku dengar nyanyian anak kecil dari arah bambu. Pelan sekali. Tapi tiap aku lihat ke sana, nggak ada siapa-siapa.\"\n\nTangannya dingin saat menggenggam lenganmu.",
   "bg": "bg_posko_malam",
   "chars": [
    "dina_takut"
   ],
   "choices": [
    {
     "text": "Percaya dan menemaninya berjaga",
     "next": "malam1_panggil",
     "set": {
      "percaya": 1,
      "tahu": 1
     }
    },
    {
     "text": "Bilang itu cuma suara angin",
     "next": "malam1_panggil",
     "set": {
      "teror": 1
     }
    }
   ]
  },
  "malam1_panggil": {
   "label": "Suara Ibumu",
   "bab": 1,
   "speaker": "Narator",
   "text": "Pukul 00.10. Semua sudah masuk kamar. Dari balik jendela, dari arah rumpun bambu, terdengar suara ibu-ibu memanggil namamu. Pelan, lembut, persis seperti suara ibumu di rumah.\n\n\"Rakaaa... sini, Nak. Ibu bawakan makanan.\"\n\nIbumu tidak mungkin ada di desa ini.",
   "bg": "bg_posko_malam_gelap",
   "fx": [
    "flicker"
   ],
   "choices": [
    {
     "text": "Menjawab: \"Iya, Bu?\"",
     "next": "jawab1",
     "set": {
      "langgar": 1
     }
    },
    {
     "text": "Menutup telinga dan diam",
     "next": "diam1"
    },
    {
     "text": "Mengintip dari celah jendela",
     "next": "intip1"
    }
   ]
  },
  "jawab1": {
   "label": "Dijawab",
   "bab": 1,
   "speaker": "Narator",
   "text": "Suara itu berhenti. Hening panjang. Lalu tepat di balik dinding kamarmu, suara yang sama berbisik, \"Kok baru jawab...\"\n\nLampu mati. Dari bawah pintu merayap bau bunga melati yang terlalu kuat. Kamu menarik selimut sampai menutupi kepala dan tidak berani membuka mata sampai subuh.",
   "bg": "bg_posko_malam_gelap",
   "fx": [
    "blackout"
   ],
   "set": {
    "teror": 2
   },
   "cont": [
    {
     "next": "pagi"
    }
   ]
  },
  "diam1": {
   "label": "Diam",
   "bab": 1,
   "speaker": "Narator",
   "text": "Panggilan itu berulang tiga kali, makin dekat setiap kali. Kamu menahan napas, menutup telinga, menghitung sampai seratus.\n\nPada hitungan terakhir suara itu menghilang, digantikan tawa kecil seorang anak. Subuh datang tanpa kamu sempat tidur.",
   "bg": "bg_posko_malam_gelap",
   "cont": [
    {
     "next": "pagi"
    }
   ]
  },
  "intip1": {
   "label": "Anak di Antara Bambu",
   "bab": 1,
   "speaker": "Narator",
   "text": "Di antara rumpun bambu, kamu melihat seorang anak perempuan berbaju putih berdiri menunduk. Kakinya tidak menyentuh tanah.\n\nPerlahan ia mengangkat kepala, menatap tepat ke celah jendela tempatmu mengintip, lalu tersenyum. Tak ada ibu-ibu. Hanya anak itu, dan suara ibumu yang keluar dari mulutnya.",
   "bg": "bg_hutan_bambu_malam",
   "chars": [
    "melati_samar"
   ],
   "fx": [
    "glitch"
   ],
   "set": {
    "teror": 1,
    "tahu": 1
   },
   "cont": [
    {
     "next": "pagi"
    }
   ]
  },
  "pagi": {
   "label": "Hari Kedua",
   "bab": 2,
   "speaker": "Narator",
   "text": "Hari kedua. Di jalan desa, warga menunduk saat kalian lewat, tapi begitu kamu membelakangi mereka, kamu merasa semua mata menempel di punggungmu.\n\nTidak ada yang menyinggung suara semalam, kecuali Dina yang matanya sembap. Bayu mengatur tugas: pagi ini kalian berpencar.",
   "bg": "bg_jalan_desa_pagi",
   "cont": [
    {
     "next": "hub1"
    }
   ]
  },
  "hub1": {
   "label": "Hub: Pagi Hari Kedua",
   "bab": 2,
   "speaker": "Narator",
   "text": "Ada tiga tempat yang harus dikunjungi hari ini, tapi waktunya hanya cukup untuk dua. Ke mana kamu pergi?",
   "bg": "bg_jalan_desa_pagi",
   "redirect": [
    {
     "if": "aksi>=2",
     "next": "siang_akhir"
    }
   ],
   "choices": [
    {
     "text": "Balai desa, mengambil data profil desa bersama Sari",
     "next": "balai",
     "hide": "v_balai>=1"
    },
    {
     "text": "Rumah Mbah Darmo, juru kunci desa",
     "next": "mbah",
     "hide": "v_mbah>=1"
    },
    {
     "text": "SD desa, menemani Dina dan Bayu mengajar",
     "next": "sd",
     "hide": "v_sd>=1"
    }
   ]
  },
  "balai": {
   "label": "Balai Desa",
   "bab": 2,
   "speaker": "Narator",
   "text": "Petugas balai, Pak Karto, menyerahkan data penduduk tanpa banyak bicara. Sari menunjuk rak arsip di belakangnya: ada buku register kelahiran dengan halaman tahun 1998 yang sobek rapi, seperti sengaja.\n\nPak Karto sibuk menatap layar komputer lamanya, tapi telinganya jelas mengarah ke kalian.",
   "bg": "bg_balai_desa",
   "chars": [
    "pak_karto",
    "sari_netral"
   ],
   "choices": [
    {
     "text": "Mengambil buku itu diam-diam saat Pak Karto lengah",
     "next": "balai_arsip",
     "set": {
      "aksi": 1,
      "v_balai": 1
     }
    },
    {
     "text": "Menanyakan langsung soal halaman yang sobek",
     "next": "balai_petugas",
     "set": {
      "aksi": 1,
      "v_balai": 1
     }
    }
   ]
  },
  "balai_arsip": {
   "label": "Arsip yang Disembunyikan",
   "bab": 2,
   "speaker": "Narator",
   "text": "Kamu menyelipkan buku itu ke dalam tas Sari. Di sela halaman yang tersisa terselip lembaran lain bertulisan tangan rapi: catatan seseorang tentang \"perjanjian di sumur\" dan daftar nama tamu desa dari tahun 1942, 1970, dan 1998. Nama terakhir diberi tanda silang merah.\n\nJantungmu berdegup keras saat Pak Karto menoleh. \"Sudah selesai, Nak?\"",
   "bg": "bg_balai_desa",
   "chars": [
    "sari_netral"
   ],
   "set": {
    "catatan": 1,
    "tahu": 1
   },
   "cont": [
    {
     "next": "hub1"
    }
   ]
  },
  "balai_petugas": {
   "label": "Mata yang Tidak Berkedip",
   "bab": 2,
   "speaker": "Pak Karto",
   "text": "Pak Karto berhenti mengetik. Wajahnya datar. \"Jangan tanya soal itu, Nak. Kalau mau tahu, tanya Mbah Darmo. Tapi saran saya, jangan.\"\n\nIa kembali menatap layar, dan sampai kalian keluar, ia tidak pernah berkedip.",
   "bg": "bg_balai_desa",
   "chars": [
    "pak_karto"
   ],
   "set": {
    "teror": 1
   },
   "cont": [
    {
     "next": "hub1"
    }
   ]
  },
  "mbah": {
   "label": "Rumah Mbah Darmo",
   "bab": 2,
   "speaker": "Mbah Darmo",
   "text": "Gubuk Mbah Darmo berdiri persis di samping sumur tua yang ditutup papan dan ditaburi melati. Kakek renta itu menatapmu lama sebelum bicara.\n\n\"Pulang saja, Nak. Besok pagi masih ada angkutan ke kota. Desa ini bukan tempat untuk tamu.\"\n\nDi tangannya ada seutas kain merah kecil berisi sesuatu.",
   "bg": "bg_gubuk_mbah",
   "chars": [
    "mbah_darmo"
   ],
   "choices": [
    {
     "text": "Menerima jimat dari Mbah Darmo",
     "next": "mbah_terima",
     "set": {
      "aksi": 1,
      "v_mbah": 1
     }
    },
    {
     "text": "Bertanya: \"Apa sebenarnya yang terjadi di desa ini, Mbah?\"",
     "next": "mbah_tanya",
     "set": {
      "aksi": 1,
      "v_mbah": 1
     }
    },
    {
     "text": "Menolak: \"Maaf Mbah, saya tidak percaya klenik\"",
     "next": "mbah_tolak",
     "set": {
      "aksi": 1,
      "v_mbah": 1
     }
    }
   ]
  },
  "mbah_terima": {
   "label": "Jimat Kain Merah",
   "bab": 2,
   "speaker": "Mbah Darmo",
   "text": "\"Simpan di saku, jangan lepas, terutama saat bunga melati wangi padahal tidak ada yang berbunga.\"\n\nKain itu terasa hangat di telapak tanganmu, seperti ada yang berdetak di dalamnya. Mbah Darmo menatap sumur. \"Kalau mau tahu lebih, datanglah lagi. Tapi hanya kalau aku sudah percaya sama kamu.\"",
   "bg": "bg_gubuk_mbah",
   "chars": [
    "mbah_darmo"
   ],
   "set": {
    "jimat": 1,
    "percaya": 1
   },
   "cont": [
    {
     "next": "hub1"
    }
   ]
  },
  "mbah_tanya": {
   "label": "Utang Desa",
   "bab": 2,
   "speaker": "Mbah Darmo",
   "text": "Mbah Darmo menghela napas panjang. \"Desa ini punya utang, Nak. Utang yang dibayar dengan orang. Setiap dua puluh delapan tahun, saat melati di dasar sumur berbunga serentak, desa ini minta 'tamu'. Tahun ini genap dua puluh delapan.\"\n\nIa menggeleng. \"Aku sudah bicara terlalu banyak. Datanglah lagi kalau kamu sudah lihat sendiri.\"",
   "bg": "bg_gubuk_mbah",
   "chars": [
    "mbah_darmo"
   ],
   "set": {
    "tahu": 1,
    "percaya": 1
   },
   "cont": [
    {
     "next": "hub1"
    }
   ]
  },
  "mbah_tolak": {
   "label": "Papan yang Bergeser",
   "bab": 2,
   "speaker": "Narator",
   "text": "Mbah Darmo tidak marah. Ia hanya tersenyum sedih. \"Dulu ada yang bilang begitu juga.\"\n\nSaat kamu berbalik pergi, papan penutup sumur di sampingmu bergeser sedikit, dan dari celahnya tercium bau melati yang dingin.",
   "bg": "bg_gubuk_mbah",
   "chars": [
    "mbah_darmo"
   ],
   "fx": [
    "flicker"
   ],
   "set": {
    "teror": 1
   },
   "cont": [
    {
     "next": "hub1"
    }
   ]
  },
  "sd": {
   "label": "SD Desa",
   "bab": 2,
   "speaker": "Dina",
   "text": "Anak-anak SD duduk rapi di lantai kelas, jumlahnya hanya delapan. Mereka bernyanyi dengan suara kecil yang sama persis: lagu yang tidak kamu kenal, tentang melati dan dasar sumur.\n\nDina menarik lengan bajumu. \"Raka, ini lagu yang kudengar semalam.\"",
   "bg": "bg_sd_desa",
   "chars": [
    "dina_netral"
   ],
   "choices": [
    {
     "text": "Memperhatikan gambar yang ditempel di dinding kelas",
     "next": "sd_gambar",
     "set": {
      "aksi": 1,
      "v_sd": 1
     }
    },
    {
     "text": "Ikut bernyanyi bersama anak-anak",
     "next": "sd_nyanyi",
     "set": {
      "aksi": 1,
      "v_sd": 1
     }
    }
   ]
  },
  "sd_gambar": {
   "label": "Gambar Anak-anak",
   "bab": 2,
   "speaker": "Narator",
   "text": "Semua anak menggambar hal yang sama: seorang anak perempuan berbaju putih di dalam lingkaran, dikelilingi orang dewasa. Di sudut kertas, tulisan tangan anak-anak: \"Kak Melati mau kakak baru\".\n\nSalah satu anak berbisik tanpa menoleh, \"Kakak yang tidur di kamar pojok, ya? Kak Melati suka.\"",
   "bg": "bg_sd_desa",
   "chars": [
    "melati_samar"
   ],
   "fx": [
    "glitch"
   ],
   "set": {
    "tahu": 1,
    "teror": 1
   },
   "cont": [
    {
     "next": "hub1"
    }
   ]
  },
  "sd_nyanyi": {
   "label": "Lagu yang Kamu Hafal",
   "bab": 2,
   "speaker": "Narator",
   "text": "Kamu hafal liriknya setelah dua kali dengar, dan itu yang menakutkan. Di bait terakhir, anak-anak berhenti bernyanyi serentak dan menoleh padamu.\n\n\"Kak Raka tahu namanya, ya,\" kata mereka bersamaan. Dina menarikmu keluar kelas dengan wajah pucat.",
   "bg": "bg_sd_desa",
   "chars": [
    "dina_takut"
   ],
   "set": {
    "percaya": 1,
    "teror": 1
   },
   "cont": [
    {
     "next": "hub1"
    }
   ]
  },
  "siang_akhir": {
   "label": "Bakul dari Bu Warsih",
   "bab": 2,
   "speaker": "Narator",
   "text": "Matahari condong ke barat. Kalian pulang ke posko lebih cepat dari jadwal, tidak ada yang mau berlama-lama di luar.\n\nDi depan pintu sudah ada bakul besar berisi nasi, ayam goreng, dan sambal, dengan secarik kertas: \"Dari Bu Warsih, untuk mahasiswa.\" Tidak ada satu pun dari kalian yang kenal Bu Warsih. Bayu sudah mencomot sepotong ayam.",
   "bg": "bg_posko_sore",
   "chars": [
    "bayu_santai"
   ],
   "choices": [
    {
     "text": "Ikut makan bersama Bayu (melanggar pantangan keempat)",
     "next": "malam2",
     "set": {
      "langgar": 1,
      "teror": 1
     }
    },
    {
     "text": "Mencegah Bayu dan membuang makanan itu",
     "next": "makan_cegah"
    },
    {
     "text": "Menyimpan sedikit untuk diperiksa nanti, tanpa memakannya",
     "next": "malam2",
     "set": {
      "tahu": 1
     }
    }
   ]
  },
  "makan_cegah": {
   "label": "Bayu Marah",
   "bab": 2,
   "speaker": "Bayu",
   "text": "\"Lo kenapa sih? Nggak sopan banget sama warga!\"\n\nSetelah kamu menjelaskan pantangan keempat dengan suara tertahan, Bayu mendengus, tapi menurut. Malam itu kalian makan mie instan dalam diam. Untuk pertama kalinya, tidak ada yang bercanda.",
   "bg": "bg_posko_sore",
   "chars": [
    "bayu_marah"
   ],
   "set": {
    "percaya": 1
   },
   "cont": [
    {
     "next": "malam2"
    }
   ]
  },
  "malam2": {
   "label": "Bayu Berjalan",
   "bab": 2,
   "speaker": "Sari",
   "text": "Pukul dua dini hari. Kamu terbangun karena suara pintu depan dibuka pelan. Sari berdiri di ambang kamarmu dengan wajah pucat.\n\n\"Raka, Bayu jalan keluar. Matanya terbuka, tapi dia nggak sadar. Dia jalan ke arah hutan bambu.\"",
   "bg": "bg_posko_malam_gelap",
   "chars": [
    "sari_netral",
    "bayu_kosong"
   ],
   "fx": [
    "flicker"
   ],
   "choices": [
    {
     "text": "Mengejar Bayu keluar sendirian",
     "next": "kejar",
     "set": {
      "langgar": 1
     }
    },
    {
     "text": "Membangunkan Dina dan Sari, lalu mengejar bersama",
     "next": "kejar_rombongan",
     "set": {
      "langgar": 1,
      "percaya": 1
     }
    },
    {
     "text": "Mengunci pintu dan menunggu pagi",
     "next": "tunggu"
    }
   ]
  },
  "kejar": {
   "label": "Lima Langkah",
   "bab": 2,
   "speaker": "Narator",
   "text": "Udara malam menusuk. Bayu berjalan lambat, tangan kirinya menggapai ke depan seolah ada yang menggandengnya.\n\nDi antara rumpun bambu, seorang anak perempuan berbaju putih menggenggam tangan itu dan menariknya masuk. Jarakmu dengan Bayu tinggal lima langkah.",
   "bg": "bg_hutan_bambu_malam",
   "chars": [
    "bayu_kosong",
    "melati_samar"
   ],
   "fx": [
    "shake"
   ],
   "choices": [
    {
     "text": "Menarik Bayu sekuat tenaga",
     "next": "kejar_tarik"
    },
    {
     "text": "Meneriakkan nama Bayu",
     "next": "kejar_panggil"
    },
    {
     "text": "Menggenggam jimat dari Mbah Darmo",
     "next": "kejar_jimat",
     "req": "jimat>=1"
    }
   ]
  },
  "kejar_tarik": {
   "label": "Ditarik Kembali",
   "bab": 2,
   "speaker": "Narator",
   "text": "Kamu menerjang dan memeluk pinggang Bayu. Tubuhnya berat, seperti ditahan sesuatu dari depan. Kamu menariknya sampai kalian terguling ke tanah. Bayu tersentak sadar.\n\nSaat kamu mendongak, anak itu masih di sana, menatapmu dengan mata hitam penuh. Kakinya tidak menyentuh tanah.",
   "bg": "bg_hutan_bambu_malam",
   "chars": [
    "melati_samar"
   ],
   "fx": [
    "shake",
    "flash"
   ],
   "set": {
    "teror": 2
   },
   "cont": [
    {
     "next": "pagi3"
    }
   ]
  },
  "kejar_panggil": {
   "label": "Bukan Senyum Bayu",
   "bab": 2,
   "speaker": "Bayu",
   "text": "\"BAYU!\" Ia berhenti. Menoleh pelan. Wajahnya tersenyum, tapi bukan senyum Bayu yang kamu kenal.\n\n\"Tenang, Ka,\" katanya dengan suara tenang yang tak pernah ia punya. \"Aku main sebentar.\"\n\nIa berbalik masuk ke rumpun bambu, dan rumpun itu menutup seperti tirai. Dari dalam terdengar tawa dua anak. Satu suara anak perempuan. Satunya lagi suara Bayu.",
   "bg": "bg_hutan_bambu_malam",
   "chars": [
    "bayu_kosong",
    "melati_samar"
   ],
   "fx": [
    "glitch",
    "shake"
   ],
   "set": {
    "bayu": -1,
    "teror": 2,
    "tahu": 1
   },
   "cont": [
    {
     "next": "pagi3"
    }
   ]
  },
  "kejar_jimat": {
   "label": "Kain Merah Menyala",
   "bab": 2,
   "speaker": "Narator",
   "text": "Kain merah di sakumu mendadak panas. Kamu mengangkatnya tinggi-tinggi. Anak perempuan itu mundur, wajahnya meringis seperti anak yang ketahuan nakal, lalu melepas tangan Bayu. Bayu ambruk ke tanah.\n\nDari rumpun bambu terdengar bisikan kecil: \"Kakak jahat...\" Jimat itu kini dingin, dan salah satu sudut kainnya menghitam.",
   "bg": "bg_hutan_bambu_malam",
   "chars": [
    "melati_samar"
   ],
   "fx": [
    "flash"
   ],
   "set": {
    "teror": 1,
    "tahu": 1
   },
   "cont": [
    {
     "next": "pagi3"
    }
   ]
  },
  "kejar_rombongan": {
   "label": "Blitz di Tengah Bambu",
   "bab": 2,
   "speaker": "Narator",
   "text": "Kalian berempat berlari dalam diam. Sari mengangkat kameranya dan menekan shutter. Blitz menyala: di antara rumpun bambu terlihat puluhan sosok orang desa berdiri diam, menunduk, dan di tengah mereka seorang anak berbaju putih.\n\nDina menjerit. Bersama-sama kalian menarik Bayu menjauh, dan sosok-sosok itu menghilang saat blitz padam.",
   "bg": "bg_hutan_bambu_malam",
   "chars": [
    "sari_kamera",
    "dina_takut"
   ],
   "fx": [
    "flash"
   ],
   "set": {
    "teror": 2,
    "tahu": 1
   },
   "cont": [
    {
     "next": "pagi3"
    }
   ]
  },
  "tunggu": {
   "label": "Sandal di Ujung Jalan",
   "bab": 2,
   "speaker": "Narator",
   "text": "Kamu mengunci pintu dan menarik kursi untuk menahannya. Sari menangis pelan. Dari luar kalian mendengar langkah kaki menjauh, lalu nyanyian anak kecil yang makin lama makin samar.\n\nPagi datang. Bayu tidak ada di kamarnya. Hanya sandalnya yang tertinggal di ujung jalan setapak menuju hutan bambu, rapi berdampingan, seperti sengaja diletakkan.",
   "bg": "bg_posko_pagi",
   "fx": [
    "blackout"
   ],
   "set": {
    "bayu": -1,
    "teror": 2
   },
   "cont": [
    {
     "next": "pagi3"
    }
   ]
  },
  "pagi3": {
   "label": "Router: Nasib Bayu",
   "bab": 3,
   "bg": "bg_posko_pagi",
   "redirect": [
    {
     "if": "bayu>=1",
     "next": "pagi3_aman"
    },
    {
     "next": "pagi3_hilang"
    }
   ]
  },
  "pagi3_aman": {
   "label": "Ajakan Syukuran",
   "bab": 3,
   "speaker": "Pak Lurah",
   "text": "Pak Lurah datang mengetuk posko pagi-pagi, wajahnya cerah seolah semalam tidak terjadi apa-apa.\n\n\"Nak, semalam desa kami diganggu. Maafkan. Malam ini kami adakan syukuran di sumur untuk menolak bala. Kalian harus hadir, semuanya. Tidak boleh ada yang absen.\"\n\nBayu menggigil di sudut ruangan, masih tidak ingat apa yang terjadi.",
   "bg": "bg_posko_pagi",
   "chars": [
    "pak_lurah_ramah"
   ],
   "cont": [
    {
     "next": "hub2"
    }
   ]
  },
  "pagi3_hilang": {
   "label": "Teman Kalian yang Satu Itu",
   "bab": 3,
   "speaker": "Pak Lurah",
   "text": "Pak Lurah datang mengetuk posko pagi-pagi. Raut wajahnya tenang. \"Teman kalian yang satu itu? Mungkin pulang ke kota naik angkutan subuh.\"\n\nAnehnya, tidak ada yang sempat melapor kepadanya bahwa Bayu hilang.\n\n\"Tenang, Nak. Malam ini kami adakan syukuran di sumur untuk menolak bala. Kalian harus hadir. Tidak boleh ada yang absen.\" Dina menggenggam tanganmu, gemetar.",
   "bg": "bg_posko_pagi",
   "chars": [
    "pak_lurah_senyum_aneh"
   ],
   "cont": [
    {
     "next": "hub2"
    }
   ]
  },
  "hub2": {
   "label": "Hub: Siang Hari Ketiga",
   "bab": 3,
   "speaker": "Narator",
   "text": "Hari ketiga. Syukuran dimulai nanti malam. Kamu punya waktu untuk menyelidiki dua tempat sebelum itu. Ke mana?",
   "bg": "bg_jalan_desa_siang",
   "redirect": [
    {
     "if": "aksi2>=2",
     "next": "sore3"
    }
   ],
   "choices": [
    {
     "text": "Sumur tua di tengah desa",
     "next": "sumur",
     "hide": "v_sumur>=1"
    },
    {
     "text": "Rumah kosong di ujung desa (melanggar pantangan ketiga)",
     "next": "rumah_kosong",
     "hide": "v_rumah>=1"
    },
    {
     "text": "Menemui Mbah Darmo lagi",
     "next": "mbah2",
     "set": {
      "aksi2": 1,
      "v_mbah2": 1
     },
     "hide": "v_mbah<1 || v_mbah2>=1"
    }
   ]
  },
  "sumur": {
   "label": "Sumur Tua",
   "bab": 3,
   "speaker": "Narator",
   "text": "Sumur itu berdiri di bawah pohon beringin besar, ditutup papan lapuk dan ditaburi bunga melati yang anehnya masih segar. Udara di sekitarnya terasa lebih dingin. Dari tadi tidak ada satu pun burung yang hinggap di pohon itu.",
   "bg": "bg_sumur_tua",
   "choices": [
    {
     "text": "Menggeser papan dan mengintip ke dalam",
     "next": "sumur_intip",
     "set": {
      "aksi2": 1,
      "v_sumur": 1
     }
    },
    {
     "text": "Memeriksa batu bata di pinggir sumur",
     "next": "sumur_periksa",
     "set": {
      "aksi2": 1,
      "v_sumur": 1
     }
    }
   ]
  },
  "sumur_intip": {
   "label": "Dasar yang Kering",
   "bab": 3,
   "speaker": "Narator",
   "text": "Dasar sumur kering. Tapi penuh kain putih dan gumpalan rambut, dan bunga melati tumbuh dari tanah yang tidak punya air.\n\nAda pantulan wajahmu di permukaan yang tidak ada, tersenyum padahal kamu tidak. \"Kakak...\" bisik sesuatu dari bawah. Kamu mundur dan menutup papan dengan tangan gemetar.",
   "bg": "bg_sumur_tua",
   "chars": [
    "melati_samar"
   ],
   "fx": [
    "glitch"
   ],
   "set": {
    "teror": 2,
    "tahu": 1
   },
   "cont": [
    {
     "next": "hub2"
    }
   ]
  },
  "sumur_periksa": {
   "label": "Nama di Batu Bata",
   "bab": 3,
   "speaker": "Narator",
   "text": "Di bata pinggir sumur terukir nama-nama dengan paku: SRI 1942. DARMA 1970. Dan satu nama yang diukir lebih dalam dari yang lain: RAKA 1998.\n\nKamu meyakinkan diri itu cuma kebetulan. Di baris paling bawah ada kolom kosong yang baru dibersihkan. Seseorang sudah menyiapkan tempat untuk satu nama lagi.",
   "bg": "bg_sumur_tua",
   "set": {
    "tahu": 2,
    "teror": 1
   },
   "cont": [
    {
     "next": "hub2"
    }
   ]
  },
  "rumah_kosong": {
   "label": "Rumah di Ujung Desa",
   "bab": 3,
   "speaker": "Narator",
   "text": "Rumah panggung tua di ujung desa itu pintunya terbuka sedikit, seolah sudah menunggu. Bau melati menyeruak dari dalam meski jendelanya tertutup rapat.\n\nKamu menarik napas dan sadar kamu baru saja melanggar pantangan ketiga.",
   "bg": "bg_rumah_kosong",
   "fx": [
    "flicker"
   ],
   "set": {
    "langgar": 1
   },
   "choices": [
    {
     "text": "Mengintip dari jendela terlebih dulu",
     "next": "rumah_intip",
     "set": {
      "aksi2": 1,
      "v_rumah": 1
     }
    },
    {
     "text": "Langsung masuk lewat pintu depan",
     "next": "rumah_dalam",
     "set": {
      "aksi2": 1,
      "v_rumah": 1,
      "teror": 1
     }
    }
   ]
  },
  "rumah_intip": {
   "label": "Kursi Goyang",
   "bab": 3,
   "speaker": "Narator",
   "text": "Dari balik kaca jendela yang berdebu, ruang tamu tampak sepi. Hanya sebuah kursi goyang yang bergerak sendiri, pelan, ke depan dan ke belakang. Di dinding tergantung bingkai-bingkai foto tertutup kain putih.\n\nTidak ada orang. Kamu memberanikan diri mendorong pintu.",
   "bg": "bg_rumah_kosong",
   "set": {
    "teror": 1
   },
   "cont": [
    {
     "next": "rumah_dalam"
    }
   ]
  },
  "rumah_dalam": {
   "label": "Lantai yang Bersih",
   "bab": 3,
   "speaker": "Narator",
   "text": "Di dalam, debu menutup segalanya kecuali satu hal: lantai kayu di depanmu bersih, seolah tiap hari ada yang menyapunya.\n\nDua tempat menarik perhatianmu: foto-foto di dinding, dan sebuah kamar kecil di belakang dengan pintu terbuka sedikit.",
   "bg": "bg_rumah_dalam",
   "choices": [
    {
     "text": "Menyingkap kain putih pada foto di dinding",
     "next": "rumah_foto",
     "hide": "foto>=1"
    },
    {
     "text": "Masuk ke kamar kecil di belakang",
     "next": "rumah_kotak",
     "hide": "kalung>=1"
    },
    {
     "text": "Keluar dari rumah sekarang",
     "next": "hub2"
    }
   ]
  },
  "rumah_foto": {
   "label": "Foto 1998",
   "bab": 3,
   "speaker": "Narator",
   "text": "Kain putih terlepas satu per satu. Di bawahnya, foto kelompok KKN tahun 1998: empat mahasiswa berdiri di depan posko yang sama. Kamu mengenali kaus almamater mereka. Kamu mengenali posenya. Kamu mengenali wajah mereka.\n\nRaka. Dina. Bayu. Sari.\n\nDi sudut foto ada tulisan tangan: \"Pulang tiga, tinggal satu.\"",
   "bg": "bg_rumah_dalam",
   "chars": [
    "raka_takut"
   ],
   "fx": [
    "glitch",
    "flash"
   ],
   "set": {
    "foto": 1,
    "teror": 2,
    "tahu": 1
   },
   "cont": [
    {
     "next": "rumah_dalam"
    }
   ]
  },
  "rumah_kotak": {
   "label": "Kalung Berhuruf M",
   "bab": 3,
   "speaker": "Narator",
   "text": "Kamar itu hanya berisi dipan kecil dan lemari mungil. Di atas lemari ada kotak kayu berisi kalung perak dengan liontin kecil berukir huruf M, dan boneka kain yang sebelah matanya hilang.\n\nBegitu kamu menyentuh kalung itu, bau melati menguat dan dari belakangmu terdengar suara anak kecil: \"Itu punyaku.\" Kamu menoleh. Tidak ada siapa-siapa. Tapi kalung itu terasa hangat, seolah minta dibawa pulang.",
   "bg": "bg_rumah_dalam",
   "chars": [
    "melati_samar"
   ],
   "fx": [
    "flicker"
   ],
   "set": {
    "kalung": 1,
    "tahu": 1
   },
   "cont": [
    {
     "next": "rumah_dalam"
    }
   ]
  },
  "mbah2": {
   "label": "Router: Kepercayaan Mbah Darmo",
   "bab": 3,
   "bg": "bg_gubuk_mbah",
   "redirect": [
    {
     "if": "percaya>=2",
     "next": "mbah2_cerita"
    },
    {
     "next": "mbah2_tolak"
    }
   ]
  },
  "mbah2_cerita": {
   "label": "Kisah Melati",
   "bab": 3,
   "speaker": "Mbah Darmo",
   "text": "Mbah Darmo duduk menghadap sumur, tidak menoleh.\n\n\"Namanya Melati, Nak. Anak perempuan desa ini, sembilan tahun, ratusan tahun lalu. Waktu kemarau panjang, warga memasukkannya ke sumur supaya hujan turun. Hujan turun. Tapi Melati tidak pernah pergi. Sejak itu desa memberinya 'kakak', satu tamu tiap dua puluh delapan tahun, supaya dia tidak murka dan tidak kesepian.\"\n\nIa menatapmu akhirnya. \"Kalau kalungnya dibawa pulang, dan ada yang berani membacakan kebenaran di depan sumur, dia bisa pergi. Kalungnya ada di rumah di ujung desa. Kebenarannya tertulis di arsip balai. Itu satu-satunya cara.\"",
   "bg": "bg_gubuk_mbah",
   "chars": [
    "mbah_darmo"
   ],
   "set": {
    "tahu": 2
   },
   "cont": [
    {
     "next": "hub2"
    }
   ]
  },
  "mbah2_tolak": {
   "label": "Pintu yang Menutup",
   "bab": 3,
   "speaker": "Mbah Darmo",
   "text": "Mbah Darmo hanya menggeleng saat melihatmu. \"Belum, Nak. Kamu belum cukup yakin pada desa ini, dan desa ini belum yakin padamu. Kembalilah saat kamu sudah memegang kepercayaan teman-temanmu.\"\n\nPintu gubuk menutup pelan. Kamu pergi dengan tangan kosong dan perasaan ditinggalkan.",
   "bg": "bg_gubuk_mbah",
   "chars": [
    "mbah_darmo"
   ],
   "cont": [
    {
     "next": "hub2"
    }
   ]
  },
  "sore3": {
   "label": "Waktunya Memutuskan",
   "bab": 3,
   "speaker": "Narator",
   "text": "Matahari hampir tenggelam. Di halaman posko, kalian berkumpul. Dari kejauhan terdengar tetabuhan pelan, dan nyala obor mulai terlihat di dekat sumur. Pak Lurah sudah mengirim orang untuk menjemput.\n\nWaktunya memutuskan.",
   "bg": "bg_posko_sore",
   "chars": [
    "dina_takut",
    "sari_netral"
   ],
   "choices": [
    {
     "text": "Menghadiri syukuran, tapi tetap waspada",
     "next": "ritual_awal"
    },
    {
     "text": "Mengajak semua kabur sekarang juga",
     "next": "kabur_ajak"
    }
   ]
  },
  "ritual_awal": {
   "label": "Malam Syukuran",
   "bab": 4,
   "speaker": "Pak Lurah",
   "text": "Seluruh warga berdiri melingkar di sekitar sumur, obor di tangan, wajah mereka ditutup bayangan. Papan penutup sumur sudah diangkat.\n\nPak Lurah merentangkan tangan. \"Malam ini kita menerima tamu kehormatan. Satu dari kalian akan memberi salam kepada Mbah Melati, mewakili semua.\"\n\nKelopak melati jatuh dari dahan beringin, padahal tidak ada yang berbunga.",
   "bg": "bg_sumur_malam_ritual",
   "chars": [
    "pak_lurah_senyum_aneh"
   ],
   "fx": [
    "flicker"
   ],
   "redirect": [
    {
     "if": "teror>=8 && foto>=1",
     "next": "loop_awal"
    }
   ],
   "choices": [
    {
     "text": "Membongkar kebenaran di depan seluruh warga",
     "next": "bongkar",
     "req": "tahu>=4"
    },
    {
     "text": "Maju sebagai wakil dan memberi salam",
     "next": "ritual_maju"
    },
    {
     "text": "Mengikuti ritual dan makan tumpeng bersama warga",
     "next": "end_tamu"
    },
    {
     "text": "Lari bersama yang lain",
     "next": "kabur_jalan"
    }
   ]
  },
  "bongkar": {
   "label": "Membongkar Kebenaran",
   "bab": 4,
   "speaker": "Raka",
   "text": "Kamu melangkah ke tengah lingkaran. \"Saya tahu apa yang kalian lakukan. Melati bukan hantu yang harus dikasih makan. Dia anak kalian.\"\n\nHening. Obor-obor bergetar. Mbah Darmo di barisan belakang mengangguk sangat pelan. Wajah Pak Lurah mengeras.",
   "bg": "bg_sumur_malam_ritual",
   "chars": [
    "raka_berani",
    "pak_lurah_marah"
   ],
   "cont": [
    {
     "if": "kalung>=1 && catatan>=1 && tahu>=6 && percaya>=3",
     "next": "kutukan_awal"
    },
    {
     "next": "bongkar_gagal"
    }
   ]
  },
  "bongkar_gagal": {
   "label": "Tanpa Bukti",
   "bab": 4,
   "speaker": "Pak Lurah",
   "text": "Tanpa bukti yang cukup, kata-katamu hanya jadi suara asing di tengah kerumunan. \"Tangkap anak ini,\" kata Pak Lurah lirih.\n\nObor-obor bergerak mendekat, dan dari sumur terdengar tawa gembira seorang anak yang tahu sebentar lagi punya teman baru. Dina menarik tanganmu: \"Raka, lari!\"",
   "bg": "bg_sumur_malam_ritual",
   "chars": [
    "pak_lurah_marah"
   ],
   "fx": [
    "shake"
   ],
   "choices": [
    {
     "text": "Lari ke jalan keluar desa",
     "next": "kabur_jalan"
    },
    {
     "text": "Menyerahkan diri demi teman-temanmu",
     "next": "end_korban",
     "req": "tahu>=3"
    }
   ]
  },
  "kutukan_awal": {
   "label": "Mbah Darmo Bersuara",
   "bab": 4,
   "speaker": "Mbah Darmo",
   "text": "\"Berhenti!\" Mbah Darmo melangkah keluar dari barisan, menatap Pak Lurah. \"Sudah cukup, Wiryo. Sudah cukup kita bayar dengan anak orang.\"\n\nWarga mulai saling pandang. Sebagian menunduk. Sebagian menangis. Mbah Darmo mengangguk padamu. \"Sekarang, Nak. Bawa kalung itu ke sumur. Bacakan kebenarannya.\"",
   "bg": "bg_sumur_malam_ritual",
   "chars": [
    "mbah_darmo"
   ],
   "choices": [
    {
     "text": "Membacakan catatan arsip dengan lantang",
     "next": "kutukan_puncak"
    },
    {
     "text": "Memanggil nama Melati dan mengulurkan kalungnya",
     "next": "kutukan_puncak"
    }
   ]
  },
  "kutukan_puncak": {
   "label": "Melati Pulang",
   "bab": 4,
   "speaker": "Narator",
   "text": "Kamu berdiri di bibir sumur. Suaramu bergetar, tapi kamu terus bicara: tentang seorang anak sembilan tahun yang dikorbankan, tentang nama-nama tamu yang menyusul, tentang orang-orang yang diam selama ratusan tahun.\n\nKalung perak itu kamu julurkan ke gelapnya sumur. Dari bawah, sebuah tangan kecil muncul dan menerimanya. Lalu seorang anak berbaju putih naik perlahan, menatap seluruh warga satu per satu, dan untuk pertama kalinya tersenyum seperti anak biasa.",
   "bg": "bg_sumur_malam_cahaya",
   "chars": [
    "melati_tenang"
   ],
   "fx": [
    "flash"
   ],
   "cont": [
    {
     "if": "bayu>=1",
     "next": "end_putus_a"
    },
    {
     "next": "end_putus_b"
    }
   ]
  },
  "ritual_maju": {
   "label": "Salam untuk Mbah Melati",
   "bab": 4,
   "speaker": "Melati",
   "text": "Kamu melangkah ke bibir sumur dengan lutut gemetar. \"Selamat malam, Mbah Melati,\" ucapmu.\n\nObor-obor serentak padam. Dalam gelap kamu mendengar air naik di dasar sumur, padahal sumur itu kering. Dari kedalaman muncul tangan mungil yang pucat, terulur padamu, minta digenggam.\n\n\"Kakak... main sama aku.\"",
   "bg": "bg_sumur_malam_ritual",
   "chars": [
    "melati_samar"
   ],
   "fx": [
    "blackout",
    "shake"
   ],
   "choices": [
    {
     "text": "Menggenggam tangan kecil itu",
     "next": "habis_awal"
    },
    {
     "text": "Menawarkan diri tinggal menemaninya, asal teman-temanmu dilepas",
     "next": "end_korban",
     "req": "tahu>=3"
    },
    {
     "text": "Melepaskan diri dan lari",
     "next": "kabur_jalan"
    }
   ]
  },
  "habis_awal": {
   "label": "Tangan yang Dingin",
   "bab": 4,
   "speaker": "Narator",
   "text": "Tangan itu dingin sekali. Dingin yang naik ke lenganmu, ke dada, ke pikiranmu. Kamu mendengar teman-temanmu memanggil namamu dari jauh, makin jauh, makin kecil.\n\nDi sekelilingmu warga menunduk dan mulai menyanyikan lagu yang kamu hafal dari kelas SD.",
   "bg": "bg_gelap",
   "fx": [
    "glitch"
   ],
   "cont": [
    {
     "next": "end_habis"
    }
   ]
  },
  "kabur_ajak": {
   "label": "Kabur Sekarang",
   "bab": 4,
   "speaker": "Narator",
   "text": "Kamu menjelaskan semuanya, terburu-buru, sementara obor-obor di kejauhan makin dekat. Teman-temanmu yang masih bersamamu bergegas mengemasi barang.\n\nKalian punya dua jalan: jalan desa menuju gerbang, atau jalan pintas lewat hutan bambu.",
   "bg": "bg_posko_sore",
   "chars": [
    "dina_netral",
    "sari_kamera"
   ],
   "choices": [
    {
     "text": "Lewat jalan desa menuju gerbang",
     "next": "kabur_jalan"
    },
    {
     "text": "Lewat jalan pintas hutan bambu",
     "next": "kabur_hutan"
    }
   ]
  },
  "kabur_jalan": {
   "label": "Jalan Menuju Gerbang",
   "bab": 4,
   "speaker": "Narator",
   "text": "Kalian berlari sepanjang jalan desa. Gerbang bambu terlihat di kejauhan. Setiap rumah yang kalian lewati membuka jendelanya, dan di setiap jendela ada satu wajah yang menatap tanpa suara.",
   "bg": "bg_jalan_keluar",
   "fx": [
    "shake"
   ],
   "cont": [
    {
     "if": "teror<=5 && langgar<=2",
     "next": "end_pulang"
    },
    {
     "next": "end_jalan"
    }
   ]
  },
  "kabur_hutan": {
   "label": "Panggilan dari Segala Arah",
   "bab": 4,
   "speaker": "Narator",
   "text": "Rumpun bambu menutup di belakang kalian seperti pintu. Suara panggilan datang dari segala arah, memanggil nama kalian satu per satu dengan suara orang-orang yang kalian sayangi.\n\nSalah satu dari kalian berhenti. Lalu satu lagi. Kamu menoleh dan mendapati dirimu sendirian.",
   "bg": "bg_hutan_bambu_malam",
   "chars": [
    "melati_samar"
   ],
   "fx": [
    "glitch",
    "blackout"
   ],
   "cont": [
    {
     "next": "end_habis"
    }
   ]
  },
  "loop_awal": {
   "label": "Kamu Pernah di Sini",
   "bab": 4,
   "speaker": "Mbah Darmo",
   "text": "Sumur. Obor. Warga yang mengelilingi. Kamu pernah melihat ini. Kamu pernah berdiri di sini.\n\nMbah Darmo menatapmu dari barisan belakang dan matanya basah. \"Ini kali kedua, Nak. Tahun 1998 kamu yang tinggal di dalam sumur itu. Tiga temanmu pulang dan lupa. Dua puluh delapan tahun kemudian kalian kembali, dan kamu lupa lagi.\"\n\nFoto di rumah kosong. Nama di bata sumur. Kamu mengerti: RAKA 1998 bukan nama orang lain.",
   "bg": "bg_gelap",
   "chars": [
    "mbah_darmo",
    "raka_takut"
   ],
   "fx": [
    "glitch",
    "blackout"
   ],
   "cont": [
    {
     "next": "end_loop"
    }
   ]
  },
  "end_pulang": {
   "label": "Pulang Tanpa Jawaban",
   "bab": 5,
   "speaker": "Narator",
   "text": "Gerbang bambu terlewati, dan di baliknya ada elf yang entah kenapa sudah menunggu dengan mesin menyala. Kalian naik tanpa bicara. Di kaca belakang, kamu melihat seluruh warga berdiri di tepi jalan, tersenyum, melambai.\n\nKalian selamat. Tapi malam itu, di rumah masing-masing, kalian semua mendengar nyanyian anak kecil dari balik jendela dan mencium bau melati yang tak mau hilang.\n\nDua puluh delapan tahun lagi, mungkin akan ada tamu baru.",
   "bg": "bg_gerbang_desa",
   "fx": [
    "fadeblack"
   ],
   "ending": {
    "title": "Ending: Pulang Tanpa Jawaban",
    "eid": "pulang",
    "kind": "Netral"
   }
  },
  "end_jalan": {
   "label": "Jalan Tanpa Ujung",
   "bab": 5,
   "speaker": "Narator",
   "text": "Kalian berlari dan berlari, tapi gerbang bambu tidak makin dekat. Rumah-rumah yang kalian lewati terus sama, jendela yang sama, wajah yang sama.\n\nKetika akhirnya kalian berhenti, napas tersengal, kamu sadar yang berdiri di depanmu bukan gerbang, melainkan sumur. Di tepinya bunga melati mekar serentak. Seorang anak perempuan berbaju putih duduk di atasnya dan melambai.\n\n\"Kakak-kakak sudah datang semua...\"",
   "bg": "bg_sumur_malam_ritual",
   "chars": [
    "melati_samar"
   ],
   "fx": [
    "glitch",
    "fadeblack"
   ],
   "ending": {
    "title": "Ending: Jalan Tanpa Ujung",
    "eid": "jalan",
    "kind": "Buruk"
   }
  },
  "end_tamu": {
   "label": "Tamu Kehormatan",
   "bab": 5,
   "speaker": "Narator",
   "text": "Kamu duduk bersama warga, menyendok nasi tumpeng, dan semuanya terasa baik-baik saja. Warga tersenyum. Pak Lurah menepuk bahumu. Teman-temanmu tertawa.\n\nSampai kamu sadar tidak ada seorang pun dari kalian yang mengunyah, dan piring-piring kalian tidak pernah kosong.\n\nBesok, besoknya lagi, dan seterusnya, kalian akan jadi tamu terhormat di Desa Melati. Selamanya.",
   "bg": "bg_sumur_malam_ritual",
   "chars": [
    "pak_lurah_senyum_aneh"
   ],
   "fx": [
    "fadeblack"
   ],
   "ending": {
    "title": "Ending: Tamu Kehormatan",
    "eid": "tamu",
    "kind": "Buruk"
   }
  },
  "end_habis": {
   "label": "Satu Per Satu",
   "bab": 5,
   "speaker": "Narator",
   "text": "Keesokan paginya angkutan ke kota datang menjemput mahasiswa KKN. Sopir menunggu dua jam. Pak Lurah melambai dan berkata kalian sudah pulang lebih dulu.\n\nDi buku tamu posko tertulis nama-nama yang sama dengan tinta yang tidak pernah kering: Raka, Dina, Bayu, Sari.\n\nDi dalam sumur, anak perempuan berbaju putih itu sekarang punya empat kakak untuk diajak bermain.",
   "bg": "bg_gelap",
   "fx": [
    "fadeblack"
   ],
   "ending": {
    "title": "Ending: Satu Per Satu",
    "eid": "habis",
    "kind": "Buruk"
   }
  },
  "end_korban": {
   "label": "Pengorbanan",
   "bab": 5,
   "speaker": "Narator",
   "text": "\"Aku saja,\" ucapmu. \"Lepaskan mereka.\"\n\nAnak perempuan itu menatapmu lama, lalu mengangguk. Teman-temanmu terbangun di tepi jalan desa saat fajar, bingung, dengan satu kursi kosong di angkutan yang membawa mereka pulang.\n\nDi rumah, Dina menemukan sebuah foto yang tidak ia ingat pernah ambil: empat orang berdiri di depan posko, dan satu di antaranya samar, seperti sedang tersenyum dari balik kaca.",
   "bg": "bg_subuh",
   "chars": [
    "melati_samar"
   ],
   "fx": [
    "fadeblack"
   ],
   "ending": {
    "title": "Ending: Pengorbanan",
    "eid": "korban",
    "kind": "Sedih"
   }
  },
  "end_putus_a": {
   "label": "Kutukan Terputus",
   "bab": 5,
   "speaker": "Narator",
   "text": "Fajar menyingsing. Sumur yang tadinya gelap kini berisi air jernih, dan bunga melati di sekitarnya layu tanpa bau, akhirnya hanya bunga biasa. Warga menunduk, sebagian menangis, Pak Wiryo duduk bersimpuh.\n\nPagi itu angkutan datang, dan kalian berempat pulang. Di rumah kosong ujung desa, foto 1998 yang dulu bertuliskan \"Pulang tiga, tinggal satu\" kini berisi empat wajah yang tersenyum, dengan tulisan baru:\n\n\"Pulang empat.\"",
   "bg": "bg_subuh",
   "chars": [
    "melati_tenang"
   ],
   "fx": [
    "fadeblack"
   ],
   "ending": {
    "title": "Ending: Kutukan Terputus",
    "eid": "putus",
    "kind": "Sejati (True)"
   }
  },
  "end_putus_b": {
   "label": "Kutukan Terputus (Bayu Hilang)",
   "bab": 5,
   "speaker": "Narator",
   "text": "Fajar menyingsing. Sumur kini berisi air jernih, dan bunga melati di sekitarnya hanya bunga biasa. Warga menunduk, sebagian menangis.\n\nTiga dari kalian pulang. Bayu tidak pernah ditemukan, tapi saat angkutan melaju, dari rumpun bambu terdengar tawanya, jernih, lalu hilang bersama angin. Foto di rumah kosong kini bertuliskan: \"Pulang tiga.\"\n\nKutukan sudah putus. Tapi ada harga yang terlanjur dibayar.",
   "bg": "bg_subuh",
   "chars": [
    "melati_tenang"
   ],
   "fx": [
    "fadeblack"
   ],
   "ending": {
    "title": "Ending: Kutukan Terputus",
    "eid": "putus",
    "kind": "Sejati (True)"
   }
  },
  "end_loop": {
   "label": "Putaran Berikutnya",
   "bab": 5,
   "speaker": "Narator",
   "text": "Gelap. Lalu cahaya sore jingga. Elf berhenti di depan gerbang bambu bertuliskan DESA MELATI.\n\nKamu terbangun dengan tiga teman di sampingmu, tidak ingat apa pun. Di depan gerbang seorang lelaki berdiri menyambut dengan senyum terlalu lebar.\n\n\"Selamat datang, Nak Raka. Sudah lama kami menunggu.\"\n\nDua puluh delapan tahun terasa seperti satu tarikan napas.",
   "bg": "bg_gerbang_desa",
   "chars": [
    "pak_lurah_ramah"
   ],
   "fx": [
    "blackout",
    "fadeblack"
   ],
   "ending": {
    "title": "Ending: Putaran Berikutnya",
    "eid": "loop",
    "kind": "Twist"
   }
  }
 }
};
if (typeof module !== "undefined") module.exports = STORY;
