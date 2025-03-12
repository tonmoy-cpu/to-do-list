"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { login, register } from "@/redux/actions";
import { RootState } from "@/redux/store";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";

const Login = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("male1");
  const [error, setError] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const users = useSelector((state: RootState) => state.auth.users || []);
  const dispatch = useDispatch();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  const avatarOptions = [
    { id: "avatar 1", seed: "John?hair=short&facialHairProbability=50" },
    { id: "avatar 2", seed: "Alex?hair=short&facialHair=beard" },
    { id: "avatar 3", seed: "Mike?hair=short&skinColor=light&facialHairProbability=0" },
    { id: "avatar 4", seed: "James?hair=bald&facialHair=mustache" },
    { id: "avatar 5", seed: "Chris?hair=short&accessories=glasses&facialHairProbability=0" },
    { id: "avatar 6", seed: "David?hair=short&skinColor=dark&facialHair=beard" },
    { id: "avatar 7", seed: "Emma?hair=long&facialHairProbability=0" },
    { id: "avatar 8", seed: "Sophia?hair=long&accessories=glasses&facialHairProbability=0" },
    { id: "avatar 9", seed: "Olivia?hair=bun&skinColor=light&facialHairProbability=0" },
    { id: "avatar 10", seed: "Isabella?hair=long&accessories=hat&facialHairProbability=0" },
    { id: "avatar 11", seed: "Ava?hair=long&skinColor=dark&facialHairProbability=0" },
    { id: "avatar 12", seed: "Mia?hair=long&accessoriesProbability=50&facialHairProbability=0" },
  ];

  const generateAvatarSvg = (seed: string) => {
    return createAvatar(style, { seed, size: 100 });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );
      if (foundUser) {
        dispatch(login(username));
        setError("");
      } else {
        setError("Invalid username or password");
      }
    } else {
      setError("Please enter both username and password");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password && confirmPassword) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (users.some((u) => u.username === username)) {
        setError("Username already exists");
        return;
      }
      dispatch(register({ username, password, avatar }));
      setError("");
      setIsRegisterMode(false);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setAvatar("male1");
    } else {
      setError("Please fill in all fields");
    }
  };

  useEffect(() => {
    if (user && !hasRedirected) {
      router.push("/");
      setHasRedirected(true);
    }
  }, [user, router, hasRedirected]);

  if (user && hasRedirected) {
    return <div className="text-[#1b281b] dark:text-white">Redirecting to home...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fbfdfc] dark:bg-[#1e1e1e] text-[#1b281b] dark:text-white">
      <div className="bg-white dark:bg-[#232323] p-6 rounded-lg shadow-md w-96 border border-[#eef6ef] dark:border-[#2c2c2c]">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#1b281b] dark:text-white">
          {isRegisterMode ? "Register" : "Login"}
        </h2>
        {error && (
          <p className="text-red-500 dark:text-[#ff6b6b] text-center mb-4">{error}</p>
        )}
        <form
          onSubmit={isRegisterMode ? handleRegister : handleLogin}
          className="space-y-4"
        >
          <div className="mb-4">
            <label
              className="block text-[#4f4f4f] dark:text-[#bdbdbd] text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-[#eef6ef] dark:border-[#2c2c2c] rounded bg-white dark:bg-[#2c2c2c] text-[#1b281b] dark:text-white placeholder-[#4f4f4f] dark:placeholder-[#bdbdbd] focus:outline-none focus:ring-1 focus:ring-[#3f9142]"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-[#4f4f4f] dark:text-[#bdbdbd] text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-[#eef6ef] dark:border-[#2c2c2c] rounded bg-white dark:bg-[#2c2c2c] text-[#1b281b] dark:text-white placeholder-[#4f4f4f] dark:placeholder-[#bdbdbd] focus:outline-none focus:ring-1 focus:ring-[#3f9142]"
              placeholder="Enter password"
            />
          </div>
          {isRegisterMode && (
            <>
              <div className="mb-4">
                <label
                  className="block text-[#4f4f4f] dark:text-[#bdbdbd] text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-[#eef6ef] dark:border-[#2c2c2c] rounded bg-white dark:bg-[#2c2c2c] text-[#1b281b] dark:text-white placeholder-[#4f4f4f] dark:placeholder-[#bdbdbd] focus:outline-none focus:ring-1 focus:ring-[#3f9142]"
                  placeholder="Confirm password"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-[#4f4f4f] dark:text-[#bdbdbd] text-sm font-bold mb-2"
                  htmlFor="avatar"
                >
                  Select Avatar
                </label>
                <select
                  id="avatar"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full p-2 border border-[#eef6ef] dark:border-[#2c2c2c] rounded bg-white dark:bg-[#2c2c2c] text-[#1b281b] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#3f9142]"
                >
                  {avatarOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.id}
                    </option>
                  ))}
                </select>
                <div className="mt-2 flex justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(
                        generateAvatarSvg(avatarOptions.find((opt) => opt.id === avatar)?.seed || "John?hair=short")
                      )}`}
                      alt="Preview Avatar"
                    />
                    <AvatarFallback className="bg-[#eef6ef] dark:bg-[#2c2c2c] text-[#3f9142] dark:text-[#98e19b]">
                      {username[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-[#3f9142] text-white p-2 rounded hover:bg-[#357937] focus:outline-none focus:ring-1 focus:ring-[#3f9142]"
          >
            {isRegisterMode ? "Register" : "Login"}
          </button>
        </form>
        <button
          onClick={() => setIsRegisterMode(!isRegisterMode)}
          className="w-full text-[#3f9142] dark:text-[#98e19b] underline mt-4 hover:text-[#357937] dark:hover:text-[#7cc47f]"
        >
          {isRegisterMode ? "Switch to Login" : "Switch to Register"}
        </button>
      </div>
    </div>
  );
};

export default Login;