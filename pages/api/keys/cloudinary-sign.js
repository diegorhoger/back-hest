// Require the cloudinary library
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Load the environment variables
dotenv.config();

// Require the Cloudinary v2 config file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a function to sign the request
export default function signature(req, res) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    process.env.CLOUDINARY_API_SECRET
  );
  res.status(200).json({ signature, timestamp });
}
