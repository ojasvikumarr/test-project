"use client";
import React from "react";
import Link from "next/link";
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input";
import { cn } from "../utils/cn";
import { useRouter } from 'next/router';
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { AuroraBackground } from "../components/ui/aurora-background";
import { motion } from "framer-motion";
import { DatePicker } from "../components/ui/dataPicker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"


export default function SignupForm() {
    const router = useRouter()
    const [name, setName] = useState('');
    const [bday , setbday] = useState('');
    const [image, setimage] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmPassword] = useState('');
    const [company, setcompany] = useState('');
    const [code , setcode] = useState('');
    const [loading, setloading] = useState(false)
    const words = [
        {
            text: "New",
          },
          {
            text: "to",
          },
          {
            text: "this",
          },
          {
            text: "site?",
            className: "text-blue-500 dark:text-blue-500",
          },
    ];
    useEffect(() => {
        // if(localStorage.getItem('token')){
        //   router.push("/")
        // }
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        else if (name === 'image') setimage(value);
        else if (name === 'phone') setPhone(value);
        else if (name === 'email') setEmail(value);
        else if (name === 'company') setcompany(value);
        else if (name === 'password') setPassword(value);
        else if (name === 'code') setcode(value);
        else if (name === 'confirmpassword') setconfirmPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, code, bday, phone, email, company, password, confirmpassword };
        console.log('Submitting data:', data);
        setloading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            const result = await res.json();
            if (res.ok) {
                console.log("Success:", `Successfully signed up the user ${result.success}`);
                toast('Successfully signed up!', {
                    position: "top-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Slide,
                });
                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            toast.error(`Problem in signing up the user: ${error.message}`, {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Slide,
            });
    
            console.error("Error:", `Problem in signing up the user: ${error.message}`);
        }
        setloading(false);
        // setEmail('');
        // setImage('');
        // setPhone('');
        // setName('');
        // setCompany('');
        // setPassword('');
        // setConfirmPassword('');
    
        
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
                    
                    <div className="max-w-md w-full min-w-[480px] mx-auto rounded-none md:rounded-2xl mb-40 p-4 md:p-8 mt-16 shadow-input bg-white dark:bg-black">
                        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                            <TypewriterEffect words={words} />
                        </h2>

                        <form className="my-8">
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-center items-center md:space-x-2 mb-4">
                                <LabelInputContainer>
                                    <Label htmlFor="name">Name</Label>
                                    <Input onChange={handleChange} value={name} name="name" id="name" placeholder="Tyler" type="text" />
                                </LabelInputContainer>
                                </div>
                                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-center items-center md:space-x-2 mb-4">
                                <div className="mt-7 flex items-baseline">
                                <Select name="code" value={code} onValueChange={setcode}>
                                    <SelectTrigger className="w-[80px]">
                                        <SelectValue placeholder="code" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="91">+91</SelectItem>
                                        <SelectItem value="011">+011</SelectItem>
                                        <SelectItem value="81">+81</SelectItem>
                                    </SelectContent>
                                </Select>
                                </div>
                                <LabelInputContainer>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input onChange={handleChange} value={phone} name="phone" id="phone" placeholder="xxxxxxxxxx" type="number" />
                                </LabelInputContainer>
                            </div>
                            <div className="flex items-center flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-3">
                            <LabelInputContainer>
                            <Label htmlFor="bday">Date of Birth</Label>
                            <DatePicker date={bday} setDate={setbday} />
                            </LabelInputContainer>
                            </div>
                            <div className="flex items-center flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="image">Upload Id Card</Label>
                                    <Input value={image} name="image" id="image"  type="file" />
                                </LabelInputContainer>
                               
                            </div>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">Email Address</Label>
                                <Input onChange={handleChange} value={email} name="email" id="email" placeholder="projectmayhem@fc.com" type="email" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-8">
                                <Label htmlFor="company">Company Name</Label>
                                <Input onChange={handleChange} value={company} name="company" id="company" placeholder="XYZ Org." type="company" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="password">Create Password</Label>
                                <Input onChange={handleChange} value={password} name="password" id="password" placeholder="password" type="password" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-8">
                                <Label htmlFor="company">Confirm Password</Label>
                                <Input onChange={handleChange} value={confirmpassword} name="confirmpassword" id="confirmpassword" placeholder="confirm the password" type="password" />
                            </LabelInputContainer>

                            {loading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </div>
            ) : (
                            <button
                                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Sign up &rarr;
                                <BottomGradient />
                            </button>
                            )}

                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                            <Link href={'/login'}><button
                                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            >
                                Login &rarr;
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