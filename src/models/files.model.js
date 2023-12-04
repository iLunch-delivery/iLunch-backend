const mongoose = require('mongoose')

const FilesSchema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        url: { type: String, required: true },
        weight: { type: String, required: true },
    },
    { collection: 'User_files', versionKey: false }
)

const Files = mongoose.model('User_files', FilesSchema)

module.exports = Files