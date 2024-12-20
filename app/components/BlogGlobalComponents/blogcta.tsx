import React from "react";
import ctaImage from "../../assets/blogImages/CTAImg.png";

interface BlogCtaMProps {
  title: string;
  backgroundColor: string;
  buttonText: string;
}

const BlogCta: React.FC<BlogCtaMProps> = ({
  title,
  backgroundColor,
  buttonText,
}) => {
  return (
    <div
      className="flex items-center justify-between p-6 gap-10 shadow-[0px_2.103px_0px_0px_#000] rounded-[21px] border-2 border-brand-primary"
      style={{ backgroundColor }}
    >
      <div className="flex flex-col gap-6">
        <div className="text-[34px] font-bold text-brand-primary">{title}</div>
        <button className="border rounded-[21px] px-3 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit text-[22px] font-medium">
          {buttonText}
        </button>
      </div>
      <div className="bg-cover bg-right rounded-lg">
        <img src={ctaImage} alt="cta" className="w-[300px] h-[150px]" />
      </div>
    </div>
  );
};

export default BlogCta;
