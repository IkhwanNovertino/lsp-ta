const mongoose = require('mongoose');

let registrationSchema = mongoose.Schema({
  regisNum: {
    type: Number,
  },
  assesment: {
    purpose: {
      type: String,
      require: [true, "tujuan assesment harus diisi"]
    },
    date: {
      type: Number,
      default: 0
    },
    result: {
      type: String,
      enum: ["K", "BK", "TBC"],
      default: "TBC",
    }
  },
  applicant: {
    nim: {
      type: String,
      require: [true, "no. induk mahasiswa harus diisi"]
    },
    nik: {
      type: String,
      minLength: [16, "NIK tidak valid"],
      maxLength: [16, "NIK tidak valid"],
      require: [true, "no. induk kependudukan harus diisi"]
    },
    name: {
      type: String,
      require: [true, "nama lengkap harus diisi"]
    },
    major: {
      type: String,
      require: [true, "program studi harus diisi"]
    },
    schema: {
      type: String,
      require: [true, "skema sertifikasi harus diisi"]
    },
  },
  personal: {
    birthplace: {
      type: String,
      require: [true, "Tempat lahir harus diisi"]
    },
    date_of_birth: {
      type: Number,
      default: 0,
      require: [true, "Tanggal lahir harus diisi"]
    },
    gender: {
      type: String,
      enum: ['L', 'P'],
      default: 'L'
    },
    nationality: {
      type: String,
      require: [true, "Kebangsaan harus diisi"],
      default: 'indonesia',
    },
    address: {
      type: String,
      require: [true, "Alamat harus diisi"],
    },
    zip_code: {
      type: String,
      require: [true, "Kode pos harus diisi"],
    },
    phone_num: {
      type: Number,
      require: [true, "nomor telpon/HP harus diisi"],
    },
    email: {
      type: String,
      require: [true, "email harus diisi"],
    },
  },
  data_pekerjaan: {
    current_job: {
      type: String,
      default: '-',
    },
    position: {
      type: String,
      default: '-',
    },
    company_name: {
      type: String,
      default: "-"
    },
    address: {
      type: String,
      default: "-",
    },
    contact: {
      telp: {
        type: String,
        default: "-",
      },
      email: {
        type: String,
        default: "-",
      }
    }
  }
}, { timestamps: true });

// registrationSchema.pre('save', function (next) {
//   let setNim = this.nim.
//   if (this.applicant.schema === "") {
    
//   }
//   this.regisNum = this._id
//   next();
// })

module.exports = mongoose.model('Registrations', registrationSchema);