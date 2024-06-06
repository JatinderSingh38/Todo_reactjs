import mongoose from "mongoose";
const UserSchema = mongoose.Schema({  //-------------------creating schema ---------------------
    name: { type: String, required: true },
    description: { type: String, required: true },
    complete: { type: Boolean, required: true }
}
);
export const todo = mongoose.model('todo', UserSchema)