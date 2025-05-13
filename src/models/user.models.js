import mongoose, { Schema } from "mongoose";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//using mongoose hook -- pre and post hook are there.
//pre are used before we storing any data in database and
// post is used just after  saving it to db and before sending the response

//encrpyt password before storing it to db using pre hook
//note: we uses normal fn because we need context of this

userSchema.pre("save", async function (next) {
  //checking if password is modified or not
  //fixed ismodifed function 
  if (!this.isModified("password")) return next();
  
  //encrypting the password
  this.password = await bycrpt.hash(this.password, 10);
  next();
});

//as like the prototype in js we have methods in moongose to add new method to schema
//creating isPasswordCorrect method to userschema so we can use it after that

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bycrpt.compare(password, this.password);
};

//using jwt token to generateAccessToken

userSchema.methods.generateAccessToken = function () {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//CREATING REFRESH TOKEN

userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
