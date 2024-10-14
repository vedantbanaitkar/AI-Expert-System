import book1 from "./ui/book.gif"

function Navbar() {
  return (
    <div className="pt-3 relative w-[98.7vw]">
      <div className="flex gap-4 items-center">
        <img className="ml-6 w-[40px]" src={book1} alt="" />
        <span>Bookify</span>
      </div>
    </div>
  );
}

export default Navbar;
