const mongoose = require('mongoose');

let registrationSchema = mongoose.Schema({
  regisNum: {
    type: Number,
  },

  assesment_type: {
    type: String,
    require: [true, "tujuan assesment harus diisi"]
  },
  assesment_date: {
    type: Number,
    default: 0
  },
  assesment_result: {
    type: String,
    enum: ["K", "BK", "TBC"],
    default: "TBC",
  },

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
  company_address: {
    type: String,
    default: "-",
  },
  company_telp: {
    type: String,
    default: "-",
  },
  company_email: {
    type: String,
    default: "-",
  }
}, { timestamps: true });

// playerSchema.path('email').validate(async function (value) {
//   try {
//     const count = await this.model('Player').countDocuments({ email: value })
//     return !count;
//   } catch (err) {
//     throw err
//   }
// }, attr => `${attr.value} sudah terdaftar`)

registrationSchema.path("nim").validate(async function (value) {
  try {
    const count = await this.model('Registrations').countDocuments({ nim: value })
    return !count;
  } catch (err) {
    throw err
  }
}, attr => `NIM ${attr.value} sudah terdaftar`)

registrationSchema.path("nik").validate(async function (value) {
  try {
    const count = await this.model('Registrations').countDocuments({ nik: value })
    return !count;
  } catch (err) {
    throw err
  }
}, attr => `NIK ${attr.value} sudah terdaftar`)

registrationSchema.path("phone_num").validate(async function (value) {
  try {
    const count = await this.model('Registrations').countDocuments({ phone_num: value })
    return !count;
  } catch (err) {
    throw err
  }
}, attr => `No. Telp/HP ${attr.value} sudah terdaftar`)

registrationSchema.path("email").validate(async function (value) {
  try {
    const count = await this.model('Registrations').countDocuments({ email: value })
    return !count;
  } catch (err) {
    throw err
  }
}, attr => `Email ${attr.value} sudah terdaftar`)

// registrationSchema.pre('save', function (next) {
//   let setNim = this.nim.
//   if (this.applicant.schema === "") {

//   }
//   this.regisNum = this._id
//   next();
// })

module.exports = mongoose.model('Registrations', registrationSchema);