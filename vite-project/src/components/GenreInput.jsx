import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function GenreInput({
  inputValue,
  handleInputChange,
  handleKeyPress,
  addGenre,
}) {
  return (
    <div className="flex gap-2 rounded-full overflow-hidden border border-gray-500 w-96 mx-auto">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder={"Enter genre or mood"}
        className="border-none m-3 mr-0 focus:outline-none"
      />
      <Button
        onClick={addGenre}
        className="rounded-r-3xl m-3 ml-0 hover:bg-slate-100 hover:text-black transition ease-in-out duration-600"
      >
        Add
      </Button>
    </div>
  );
}

export default GenreInput;
