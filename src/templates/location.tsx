import * as React from "react";
import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import { isProduction } from "@yext/pages/util";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import About from "../components/About";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import Hours from "../components/Hours";
import PageLayout from "../components/PageLayout";
import Schema from "../components/Schema";
import ContactSection from "../components/ContactSection";
import Reviews from "../components/Reviews"
import FeaturesZigzag from "../components/FeaturesZigzag";
import ServicesHero from "../components/ServicesHero";
import StaticMap from "../components/StaticMap";
import LetsTalk from "../components/LetsTalk";



export const config: TemplateConfig = {
  stream: {
    $id: "Location",
    filter: {
      entityIds: [YEXT_PUBLIC_LOCATION_ENTITY_ID],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "logo",
      "c_service1Description",
      "c_service2Description",
      "c_service3Description",
      "c_service1",
      "c_service2",
      "c_service3",
      "c_servicePhotos",
      "services",
      "c_font",
      "photoGallery",
      "c_tagline",
      "geocodedCoordinate",
      "c_toggleAbout",
      "c_toggleGallery",
      "c_toggleReviews",
      "c_toggleServices",
      "paymentOptions",
      "emails",
      "yextDisplayCoordinate",
      "c_reachOut",
      "c_toggleHours",
      "c_toggleContact",
      "c_contactMessage"
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
    transform: {
      replaceOptionValuesWithDisplayNames: [
        "paymentOptions",
      ],
    },
  },
};



export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug;
};


export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
  relativePrefixToRoot
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "meta", // Meta Tag (og:image)
        attributes: {
          property: "og:image",
          content: (document.photoGallery ? document.photoGallery[0].image.url : null),
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: relativePrefixToRoot + Favicon,
        },
      },
    ],
  };
};


const Location: Template<TemplateRenderProps> = ({
  __meta,
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
    address,
    hours,
    mainPhone,
    services,
    description,
    emails,
    c_service1Description,
    c_service2Description,
    c_service3Description,
    c_service1,
    c_service2,
    c_service3,
    c_toggleAbout,
    c_toggleGallery,
    c_toggleReviews,
    c_toggleServices,
    c_servicePhotos,
    logo,
    id,
    c_font,
    c_tagline,
    photoGallery,
    geocodedCoordinate,
    yextDisplayCoordinate,
    c_reachOut,
    c_toggleHours,
    c_toggleContact,
    c_contactMessage

  } = document;

  const data = { mainPhone, emails, logo, c_tagline, c_toggleAbout, c_toggleContact, c_toggleGallery, c_toggleHours, c_toggleReviews, c_toggleServices }

  return (
    <>
      <Schema data={document} />
      <div style={{ fontFamily: c_font }}>
      <PageLayout data={data} templateData={{__meta, document}}>
      {c_toggleAbout === true && <ServicesHero pageTitle={name} imageUrl={photoGallery[1].image.url} mainphone={mainPhone} email={emails} description={description} tagline={c_tagline}></ServicesHero>}
        {/* <Banner name={name} tagline={c_tagline} photoGallery={photoGallery}/> */}
        {/* {c_toggleAbout === true && <About description={description} mainphone={mainPhone} email={emails} />} */}
        {c_toggleServices === true && c_servicePhotos && c_servicePhotos.length >= 3 && (
          <FeaturesZigzag
            title={"Services"}
            service1={c_service1} service1desc={c_service1Description}
            service1photo={c_servicePhotos[0].url}
            service2={c_service2} service2desc={c_service2Description}
            service2photo={c_servicePhotos[1].url}
            service3={c_service3} service3desc={c_service3Description}
            service3photo={c_servicePhotos[2].url}
          />
        )}
        {c_toggleReviews === true && <Reviews entityid={id} title={"Reviews"}></Reviews>}
        {c_toggleHours === true && <LetsTalk
          description={c_reachOut}
          emails={document.emails[0]}
          formattedPhone={mainPhone}
          hours={hours}
        ></LetsTalk>}
        {c_toggleContact === true && <ContactSection address={address} phone={mainPhone} email={emails} latitude={geocodedCoordinate.latitude} longitude={geocodedCoordinate.longitude} contactmessage={c_contactMessage}/>}
        {c_toggleGallery === true && <Carousel title={"Gallery"} photoGallery={photoGallery}></Carousel>}
      </PageLayout>
      </div>
    </>
  );
};

export default Location;
