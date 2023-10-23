import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";


export interface AboutProps {
  description?: string;
  mainphone?: string;
  email?: string;
}

const About = ({ description, mainphone, email }: AboutProps) => {
  return (
    <>
      <div className="bg-gray-100 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            <a id="about">About Us</a>
          </h2>
          {description ? 
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {description}
            </p> :
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          }
          <div className="mt-6 flex justify-center items-center pt-8">
            <a
              href={`tel:${mainphone}`}
              className="text-xl px-8 py-4 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-200 flex justify-center"
              style={{ width: "200px" }}
            >
              <span className="mx-auto">
                Call Us <FontAwesomeIcon icon={faPhone} className="text-xl ml-2" />
              </span>
            </a>
            <a
              href={`mailto:${email}`}
              className="text-xl px-8 py-4 ml-4 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-200 flex justify-center"
              style={{ width: "200px" }}
            >
              <span className="mx-auto">
                Email Us <FontAwesomeIcon icon={faEnvelope} className="text-xl ml-2" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
