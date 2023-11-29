const mongoose = require('mongoose')

const FilesSchema = mongoose.Schema(
    {
        id_type: { type: String, required: true },
        user_id: { type: Number, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        url: { type: String, required: true },
        weight: { type: String, required: true },
    },
    { collection: 'User_files' }
)

const Files = mongoose.model('User_files', FilesSchema)

module.exports = Files