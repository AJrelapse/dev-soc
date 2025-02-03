import Signup from "@/components/Auth/Singup";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GoogleIcon } from "@/assets/icons";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUp() {
  return (
    <>

      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          {/* Left Side - Signup Form */}
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 px-4 text-gray-700 hover:bg-gray-100 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3">
                <GoogleIcon />
                Sign up with Google
              </button>

              <div className="my-6 flex items-center">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-4 text-gray-500">Or sign up with email</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <Signup />
            </div>
          </div>

          {/* Right Side - Welcome Section */}
          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              <Link className="mb-10 inline-block" href="/">
                <h1>WORK SPACE</h1>
              </Link>
              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                Get Started for Free
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Sign Up!
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                For create your account please fill up the necessary fields below
              </p>

              <div className="mt-10">
                <Image
                  src={"/images/grids/grid-02.svg"}
                  alt="Signup Illustration"
                  width={405}
                  height={325}
                  className="mx-auto dark:opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
