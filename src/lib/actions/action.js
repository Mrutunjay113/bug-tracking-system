"use server";
import User from "../../lib/models/User";
// import { redirect } from "next/navigation";
import ConnectMongoDb from "@/lib/mongoConnect";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { encode } from "next-auth/jwt";

const JWT_SECRET = process.env.JWT_SECRET;

export const addUser = async (data) => {
  console.log("data", data);
  const { email, password } = data;

  try {
    await ConnectMongoDb();

    const newUser = new User({ email, password });

    // Ensure NEXTAUTH_SECRET is defined and is a string
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      throw new Error("NEXTAUTH_SECRET is not defined");
    }

    // Create a JWT token with the user object using nextauth/jwt
    const token = await encode({
      token: {
        email: {
          email: newUser.email,
        },
      },
      secret: process.env.NEXTAUTH_SECRET,
      maxAge: "2h",
    }).then((res) => res);
    console.log(`token`, token);

    newUser.verification.token = token;
    newUser.verification.expires = Date.now() + 1000 * 60 * 60 * 24; // 24 hours

    const response = await newUser.save();

    return {
      user: JSON.parse(JSON.stringify(response)),
      token,
      error: null,
    };
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return {
        error: "Email already exists",
      };
    }
    return {
      error: "Something went wrong",
    };
  }
};

export const signInUser = async (credentials) => {
  console.log(`credentials`, credentials);
  const { email, password } = credentials;
  try {
    ConnectMongoDb(); // Ensure MongoDB connection

    const user = await User.findOne({ email });
    if (!user) {
      return {
        error: "Invalid credentials",
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return { error: "Invalid credentials" };
    }

    // Remove password from user object
    const { password: pass, ...userWithoutPassword } = user.toObject();
    // Generate JWT token and set it as a cookie using jose library
    // const jwt = await new SignJWT({ user: userWithoutPassword })
    //   .setProtectedHeader({ alg: "HS256" })
    //   .setIssuedAt()
    //   .setExpirationTime("2h")
    //   .sign(new TextEncoder().encode(JWT_SECRET));

    // ///set cookie with jwt token
    // cookies().set("token", jwt, {});

    return {
      error: null,
      user: JSON.parse(JSON.stringify(userWithoutPassword)),
    };
  } catch (error) {
    console.error("SignIn error:", error);
    return { error: "An error occurred during sign-in", user: null };
  }
};

// emailService.js

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendVerificationEmail = async (to, verificationLink) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "Acme <onboarding@resend.dev>",
//       to: ["delivered@resend.dev"],
//       subject: "Hello world",
//       react: EmailTemplate({ firstName: "John" }),
//     });

//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }
//     console.log(`data`, data);

//     return {
//       data,
//       error: null,
//     };
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// };

// export const verifyEmail = async (token) => {
//   //check token is valid or not with verification.token and verification.expires
//   try {
//     const user = await User.findOne({
//       "verification.token": token,
//       "verification.expires": { $gt: Date.now() },
//     });

//     if (!user) {
//       return {
//         error: "Invalid or expired token",
//       };
//     }

//     user.verified = true;
//     user.verification.token = null;
//     user.verification.expires = null;

//     await user.save();

//     return {
//       error: null,
//       user: JSON.parse(JSON.stringify(user)),
//     };
//   } catch (error) {
//     console.error("Error verifying email:", error);
//     return {
//       error: "An error occurred verifying email",
//     };
//   }
// };
