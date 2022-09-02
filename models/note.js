require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
// const password = process.env.PASSWORD
console.log('connecting to', url);
const user = "mikaelplata"
mongoose.connect(
    `mongodb+srv://${user}:${process.env.PASSWORD}@cluster0.dqu9fk1.mongodb.net/noteApp?retryWrites=true&w=majority`    
    // url
)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})
// const Note = mongoose.model('Note', noteSchema)

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)