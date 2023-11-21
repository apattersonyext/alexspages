import { HexColor } from "@yext/studio";

export interface GridContainerProps {
  children: React.ReactNode;
  backgroundColor?: HexColor;
  backgroundImage?: string;
}

const GridContainer = ({
  children,
  backgroundColor,
  backgroundImage,
}: GridContainerProps) => {
  return (
    <div
      className="mx-auto bg-cover grid grid-cols-1 md:grid-cols-2  gap-x-8"
      style={{
        backgroundColor,
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {children}
    </div>
  );
};

export default GridContainer;