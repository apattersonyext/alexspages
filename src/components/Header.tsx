import * as React from "react";
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatPhoneNumber } from "react-phone-number-input";
import { Image } from "@yext/sites-components";
import { Link } from "@yext/sites-components";

export interface HeaderProps {
  data?: any;
}

const Header = ({ data }: HeaderProps) => {
  let phone = data.mainPhone ? data.mainPhone : "+12345678910";
  let email = data.emails?.[0] ?? "test@test.com";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  

  const navigation = [
    { name: "About", href: "#about", show: data.c_toggleAbout },
    { name: "Services", href: "#services", show: data.c_toggleServices },
    { name: "Reviews", href: "#reviews", show: data.c_toggleReviews },
    { name: "Hours", href: "#hours", show: data.c_toggleHours },
    { name: "Contact", href: "#contact", show: data.c_toggleContact },
    { name: "Gallery", href: "#gallery", show: data.c_toggleGallery },
  ];



  return (
    <header className="" style={{ background: `var(--backgroundColor)` }}>
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between text-lg p-10 lg:px-8" aria-label="Global">
        <div className="flex items-center gap-x-12">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            {data.logo ? (
              <Image image={data.logo.image} layout="fixed" height={110} width={110} />
            ) : (
              <img className="h-24 w-auto rounded-md" src="https://logoipsum.com/logoipsum.png" alt="" />
            )}
          </a>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation
              .filter((item) => item.show)
              .map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  className="tracking-tight font-bold leading-6 text-gray-900 hover:text-gray-700"
                  eventName={`cta Click_${item.name}`}
                >
                  {item.name}
                </Link>
              ))}
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex justify-around space-x-8">
          {/* {navigation
            .filter((item) => item.show)
            .map((item) => (
              <Link
                href={`#${item.href}`}
                key={item.name}
                className="tracking-tight font-bold leading-6 text-gray-900 hover:text-gray-700"
                eventName={`cta Click_${item.name}`}
              >
                {item.name}
              </Link>
            ))} */}
          <Link
            href={`tel:${phone}`}
            className="tracking-tight font-bold leading-6 text-gray-900 hover:text-gray-700"
            eventName={`phoneCall`}
          >
            {formatPhoneNumber(phone)}
          </Link>
          <Link
            href={`mailto: ${email}`}
            className="tracking-tight font-bold leading-6 text-gray-900 hover:text-gray-700"
            eventName={`email`}
          >
            {email}
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        {/* ... (rest of your code) */}
      </Dialog>
    </header>
  );
};

export default Header;
