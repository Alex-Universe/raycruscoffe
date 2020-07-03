// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 3000;
console.log(`PORT :${process.env.PORT}`)

// ============================
//  Enviorment
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
console.log(`ENVIOROMENT :${process.env.NODE_ENV}`)

// ============================
//  DataBase
// ============================
let db_url

if (process.env.NODE_ENV === 'dev') {
    db_url = 'mongodb://localhost:27017/RaycrusCoffeDB'
} else {
    process.env.URL_DB = '//mongodb+srv://admin:4ujTPCQsxB5pV9y4@cluster0.lhkhu.mongodb.net/test?authSource=admin&replicaSet=atlas-lm72hr-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
}

process.env.URL_DB = db_url;
console.log(`ENVIOROMENT :${db_url}`)