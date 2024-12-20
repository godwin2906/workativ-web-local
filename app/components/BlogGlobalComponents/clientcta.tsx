import GroupImg from "../../assets/blogImages/GroupImage.png";

const Clientcta = () => {
  return (
    <div className=" flex flex-col gap-6 border pt-5 pb-10 px-[10px] border-brand-primary rounded-[12px] bg-brand-bg_white shadow-[0px_1.838px_0px_0px_#000]">
      <div className="flex flex-col gap-10 border-none bg-brand-primary rounded-[12px] pr-3 pl-7 pt-10 pb-0">
        <div className="text-[35px] font-bold text-brand-text_blue leading-[40px]">
          Deploy AI Agents to Supercharge Your Enterprise Support
        </div>
        <div className="text-brand-primary font-normal text-[20px] leading-[28px]">
          Deliver faster, smarter, and cost-efficient support for your
          enterprise.
        </div>
        <div className="">
          <img src={GroupImg} alt="logos" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button className="border text-[18px] font-medium text-brand-text_white border-brand-border_black rounded-[27px] bg-brand-bg_blue px-5 py-3">
          Try for free
        </button>
      </div>
    </div>
  );
};

export default Clientcta;
