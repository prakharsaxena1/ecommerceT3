import { NextIcon, PreviousIcon } from "./Icons";

interface ICircularButton {
  value: number;
  activeClasses: string;
}

interface ICornerButton {
  icon: React.ReactNode;
  onClickAction: (() => void) | null;
}

const CornerButton: React.FC<ICornerButton> = ({ icon, onClickAction }) => {
  return (
    <button
      className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none"
      type="button"
      onClick={onClickAction ?? undefined}
    >
      {icon}
    </button>
  );
};

const CircularButton: React.FC<ICircularButton> = ({
  value,
  activeClasses,
}) => {
  return (
    <button
      className={`relative h-10 max-h-[40px] w-10 max-w-[40px] rounded-full text-center align-middle text-xs font-medium text-gray-900 transition-all active:bg-gray-900/20 ${activeClasses}`}
      type="button"
    >
      <span className={activeClasses !== "" ? "text-white" : ""}>{value}</span>
    </button>
  );
};

interface IPagination {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export const Pagination: React.FC<IPagination> = ({ currentPage, setCurrentPage, totalPages }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(<CircularButton key={i} value={i} activeClasses={i === currentPage ? "bg-black" : ""} />);
  }
  const pageDecrement = () => setCurrentPage((prev) => prev - 1);
  const pageInecrement = () => setCurrentPage((prev) => prev + 1);
  return (
    <div className="flex justify-center my-3">
      <div className="flex items-center gap-2">
        <CornerButton icon={<PreviousIcon />} onClickAction={currentPage > 1 ? pageDecrement : null} />
        {pages}
        <CornerButton icon={<NextIcon />} onClickAction={currentPage < totalPages ? pageInecrement : null} />
      </div>
    </div>
  );
};

export default Pagination;
