"use client";
import React from "react";
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input";
import { cn } from "../utils/cn"

import { useRouter } from 'next/router';
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast , Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TypewriterEffect } from "../components/ui/typewriter-effect";

import Link from "next/link";
import { AuroraBackground } from "../components/ui/aurora-background";
import { motion } from "framer-motion";

export default function LoginForm() {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setloading] = useState(false)
    const words = [
        {
          text: "Welcome",
        },
        {
          text: "back",
        }
      ];


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email, password };
        setloading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const result = await res.json();
    
            if (res.ok) {
                console.log("Success:", `Successfully logged in the user ${result.token}`);
                localStorage.setItem('token', result.token);
    
                toast.success('Successfully Logged in!', {
                    position: 'top-left',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    transition: Slide,
                });
    
                setTimeout(() => {
                    router.push('/dashboard');
                }, 3000);
            } else {
                toast.error(`Problem in Logging the user: ${result.error}`, {
                    position: 'top-left',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                    transition: Slide,
                });
    
                console.error("Error:", `Problem in Logging the user: ${result.error}`);
            }
        } catch (error) {
            toast.error(`Problem in Logging the user: ${error.message}`, {
                position: 'top-left',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
                transition: Slide,
            });
    
            console.error("Error:", `Problem in Logging the user: ${error.message}`);
        }
        setloading(false);
        // setEmail('');
        // setPassword('');
    };
    
    return (
        <>
        <AuroraBackground>
        <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      
            <div className="max-w-md w-96 min-w-[480px]  mx-auto rounded-none md:rounded-2xl p-4 md:p-8 mt-16 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                <TypewriterEffect words={words} />
            </h2>
            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input onChange={handleChange} value={email} name="email" id="email" placeholder="projectmayhem@fc.com" type="email" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={handleChange} value={password} name="password" id="password" placeholder="••••••••" type="password" />
                </LabelInputContainer>
                {loading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </div>
            ) : (
                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Login &rarr;
                    <BottomGradient />
                </button>
                    )}
                <div className="bg-gradient-to-r  from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                <Link href={'/signup'}><button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"

                >
                    Sign up &rarr;
                    <BottomGradient />
                </button></Link>
                
            </form>
        </div>
        </motion.div>

        </AuroraBackground>
        </>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};