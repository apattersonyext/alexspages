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
      "photoGallery",
      "c_tagline",
      "paymentOptions",
      "emails",
      "yextDisplayCoordinate"
    ],
    localization: {
      locales: [YEXT_PUBLIC_LOCATION_LOCALE_CODE],
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
    c_servicePhotos,
    logo,
    id,
    c_tagline,
    photoGallery,
    yextDisplayCoordinate
  } = document;

  const data = { mainPhone, emails, logo, c_tagline }

  return (
    <>
      <Schema data={document} />
      <PageLayout data={data} templateData={{__meta, document}}>
        <Banner name={name} tagline={c_tagline} photoGallery={photoGallery} />
        <About description={description} mainphone={mainPhone} email={emails}/>
        {c_servicePhotos && c_servicePhotos.length >= 3 && (
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
        {hours && <Hours title={"Hours"} hours={hours} />}
        <Reviews entityid={id} title={"Reviews"}></Reviews>
        <Carousel title={"Gallery"} photoGallery={photoGallery}></Carousel>
        <ContactSection address={address} phone={mainPhone} email={emails} />
      </PageLayout>
    </>
  );
};

export default Location;
