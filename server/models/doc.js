import mongoose from "mongoose"

const {Schema} = mongoose

const docSchema = new Schema({
    docName: {
        type: String,
        default: "Untitled Document"
    },
    content: {
        type: Object,
        default: ""
    },
    accessList: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

export const Doc = mongoose.model("Doc", docSchema)