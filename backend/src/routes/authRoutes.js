import express from "express";
import User from "../model/UserAuth.js";
import Otp from "../model/Otp.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 1. Define the functions (Named Exports)
export const sendOtp = async (req, res) => {
  try {
    const { identifier } = req.body;
    if (!identifier) return res.status(400).json({ message: "Identifier is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.create({ identifier, otp, expiresAt });
    console.log("OTP:", otp); 

    res.json({ success: true, message: "OTP sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    const otpRecord = await Otp.findOne({ identifier })
      .sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (otpRecord.verified) {
      return res.status(400).json({ message: "OTP already used" });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    otpRecord.verified = true;
    await otpRecord.save();

    let user = await User.findOne({ identifier });

    if (!user) {
      user = await User.create({ identifier, isVerified: true });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Assign the functions to routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// 3. Export the ROUTER as default
export default router;