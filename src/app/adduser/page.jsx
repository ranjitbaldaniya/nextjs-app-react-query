"use client";
import React, { useState } from "react";
import { useCreateUser } from "@/lib/mutation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

const AddUser = () => {
  // State variables to manage form inputs
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Initialize the mutation hook
  const mutation = useCreateUser();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before submission
    const userObj = {
      firstName: firstname,
      lastName: lastname,
      email,
      password,
      role: "user",
    };

    try {
      await mutation.mutateAsync(userObj);
      // Clear the form after successful submission
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card className="container mx-auto p-5">
      <h2 className="text-center text-2xl font-bold my-4">Add User</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md"
      >
        <div className="mb-4">
          <Label htmlFor="firstname" className="block mb-2">
            First Name
          </Label>
          <Input
            id="firstname"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="lastname" className="block mb-2">
            Last Name
          </Label>
          <Input
            id="lastname"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email" className="block mb-2">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password" className="block mb-2">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full p-2 font-bold rounded-md"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Creating..." : "Create user"}
        </Button>
        {error && <Alert variant="error" className="mt-2">{error}</Alert>}
        {mutation.isSuccess && (
          <Alert variant="success" className="mt-2">User created successfully!</Alert>
        )}
      </form>
    </Card>
  );
};

export default AddUser;
