import imgImage from "figma:asset/f75db175b92e7a875504f15622cffaa8ab456505.png";

function ImageWrap() {
  return (
    <div className="overflow-clip relative shrink-0 size-[100px]" data-name="image-wrap">
      <div className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" data-name="image" style={{ top: "calc(50% - 0.5px)" }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}

export default function CwIconEmptyStates() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full" data-name="CwIcon/empty-states">
      <ImageWrap />
      <div className="flex flex-col font-['Noto_Sans_TC:DemiLight',_sans-serif] font-[350] justify-center leading-[0] min-w-full relative shrink-0 text-[#1c1c1c] text-[14px] text-center" style={{ width: "min-content" }}>
        <p className="leading-[normal]">沒有資料</p>
      </div>
    </div>
  );
}