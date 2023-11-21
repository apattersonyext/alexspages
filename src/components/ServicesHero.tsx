import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


export interface BannerProps {
  pageTitle: string;
  imageUrl: string;
  description: string;
  mainphone?: string;
  email?: string;
}

const ServicesHero = ({ pageTitle, imageUrl, description, mainphone, email }: BannerProps) => {
  return (
    <div className="bg-white py-14">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 lg:w-full lg:max-w-2xl">
            <svg
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-24 sm:py-24 lg:px-8 lg:py-24 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="hidden sm:mb-10 sm:flex">
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl" id="about">
                  {pageTitle}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {description}
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href={`tel:${mainphone}`}
                    className="rounded-md border border-gray-950 text-gray-900 px-3.5 py-2.5 text-2xl font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Call Now
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="text-2xl font-semibold leading-6 text-gray-900"
                  >
                    Learn more <span aria-hidden="true"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          {imageUrl && (
            <img
              className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
              src={imageUrl}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesHero;