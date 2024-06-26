import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    bio: { type: String },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    onboarded: { type: Boolean, default: false },
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community"
        }
    ],
    liked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
