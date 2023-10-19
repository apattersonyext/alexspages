import * as React from "react";

type FeaturesZigzagProps = {
  headline?: string;
  subtitle?: any;
  service1?: any;
  service1desc?: any;
  service1photo?: any;
  service2?: any;
  service2desc?: any;
  service2photo?: any;
  service3?: any;
  service3desc?: any;
  service3photo?: any;
  color?: any;
  title?: string;
};

const FeaturesZigzag = ({
  headline,
  subtitle,
  service1,
  service1desc,
  service1photo,
  service2,
  title,
  service2desc,
  service2photo,
  service3,
  service3desc,
  service3photo,
  color,
}: FeaturesZigzagProps) => {
  const getColorClasses = () => {
    let classes = "text-base ";
    switch (color) {
      case "red":
        classes += "text-red-600";
        break;
      case "blue":
        classes += "text-blue-600";
        break;
      case "green":
        classes += "text-green-600";
        break;
      // Add more cases for other colors if needed
      default:
        break;
    }
    return classes;
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-gray-800">
          {/* Section header */}
          <div className="max-w-4xl mx-auto text-center pb-12 md:pb-16">
          <h2 className="text-3xl font-bold mb-4 tracking-tight text-gray-900">
          <a id="services">{title}</a>
        </h2>

          </div>

          {/* Items */}
          <div className="grid gap-20">
            {/* 1st item */}
            {service1 && (
              <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
                {/* Image */}
                <div
                  className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
                  data-aos="fade-up"
                >
                  <img
                    className="max-w-full mx-auto rounded-xl md:max-w-none h-auto"
                    src={service1photo}
                    width="540"
                    height="405"
                  />
                </div>
                {/* Content */}
                <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                  <div className={`font-sans-serif text-2xl ${getColorClasses()} mb-2`}></div>
                  <h3 className="text-3xl font-bold mb-4 tracking-tight text-gray-900">{service1}</h3>
                  <p className="h3 mb-3 text-xl text-gray-400 mb-4">{service1desc}</p>
                </div>
              </div>
            )}

            {/* 2nd item */}
            {service2 && (
              <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
                {/* Image */}
                <div
                  className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl"
                  data-aos="fade-up"
                >
                  <img
                    className="max-w-full rounded-xl mx-auto md:max-w-none h-auto"
                    src={service2photo}
                    width="540"
                    height="405"
                  />
                </div>
                {/* Content */}
                <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                  <div className={`font-sans-serif text-2xl ${getColorClasses()} mb-2`}></div>
                  <h3 className="h3 mb-3 text-3xl font-bold mb-4 tracking-tight text-gray-900">{service2}</h3>
                  <p className="text-xl text-gray-400 mb-4">{service2desc}</p>
                </div>
              </div>
            )}

            {/* 3rd item */}
            {service3 && (
              <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
                {/* Image */}
                <div
                  className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
                  data-aos="fade-up"
                >
                  <img
                    className="max-w-full rounded-xl mx-auto md:max-w-none h-auto"
                    src={service3photo}
                    width="540"
                    height="405"
                  />
                </div>
                {/* Content */}
                <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                  <div className={`font-sans-serif text-2xl ${getColorClasses()} mb-2`}></div>
                  <h3 className="h3 mb-3 text-3xl font-bold mb-4 tracking-tight text-gray-900">{service3}</h3>
                  <p className="text-xl text-gray-400 mb-4">{service3desc}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesZigzag;
