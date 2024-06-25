import connectDB from "@/lib/dbConfig";
import {  UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

connectDB();

// GET users
export const GET = async (req: NextRequest) => {
    try {
        const users = await UserModel.find();
        console.log("new user", users);

        return NextResponse.json({
            message: "Get users successfully",
            success: true,
            users,
        });
    } catch (error : any) {
        console.log("Error while getting users", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// Create a new user
export const POST = async (req: NextRequest) => {
    try {
      const payload = await req.json();
      console.log("Payload ===>", payload);
      const { email, password } = payload;
  
      const user = await UserModel.findOne({ email });
  
      if (user) {
        return NextResponse.json(
          {
            error: "Email is already registered!",
          },
          { status: 400 }
        );
      }
  
      // Encrypt the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user with the hashed password
      const newUser = await UserModel.create({
        ...payload,
        password: hashedPassword,
      });
  
      console.log("===>", newUser);
      return NextResponse.json({
        message: "User created successfully",
        success: true,
        newUser,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// Update a user
export const PUT = async (req: NextRequest) => {
    try {
        const payload = await req.json();
        console.log("Payload ===>", payload);
        const { id, password, ...rest } = payload;

        const user = await UserModel.findById(id);

        if (!user) {
            return NextResponse.json(
                {
                    error: "User not found!",
                },
                { status: 404 }
            );
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            rest.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, rest, { new: true });

        console.log("===>", updatedUser);
        return NextResponse.json({
            message: "User updated successfully",
            success: true,
            updatedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// Delete a user
export const DELETE = async (req: NextRequest) => {
    try {
        const { id } = await req.json();
        console.log("Payload ===>", id);

        const user = await UserModel.findById(id);

        if (!user) {
            return NextResponse.json(
                {
                    error: "User not found!",
                },
                { status: 404 }
            );
        }

        await UserModel.findByIdAndDelete(id);

        return NextResponse.json({
            message: "User deleted successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
