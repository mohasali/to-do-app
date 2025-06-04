interface Props {
  children: string;
  complete: boolean;
  id: number;
  handleComplete: (index: number) => void;
  handleDelete: (index: number) => void;
  handleUndo: (index: number) => void;
  handleText: (index: number, text: string) => void;
}

function ItemCard({
  children,
  complete,
  id,
  handleComplete,
  handleDelete,
  handleUndo,
  handleText,
}: Props) {
  let buttonJSX;
  if (complete) {
    buttonJSX = (
      <div className="space-x-2 shrink-0">
        <button
          onClick={() => {
            handleUndo(id);
          }}
          className=" bg-blue-400 text-white px-3 py-1 rounded-md font-bold hover:bg-blue-500 hover:cursor-pointer duration-300 ease-in dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Undo
        </button>
        <button
          onClick={() => {
            handleDelete(id);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded-md font-bold hover:bg-red-600 hover:cursor-pointer duration-300 ease-in dark:bg-red-700 dark:hover:bg-red-600"
        >
          &#128465;
        </button>
      </div>
    );
  } else {
    buttonJSX = (
      <button
        onClick={() => {
          handleComplete(id);
        }}
        className="bg-green-400 text-white px-3 py-1 rounded-md font-bold hover:bg-green-500 hover:cursor-pointer duration-300 ease-in dark:bg-green-700 dark:hover:bg-green-600"
      >
        &#10003;
      </button>
    );
  }

  return (
    <div className="flex flex-row justify-between bg-white p-4 rounded-lg border-2 border-pink-300 hover:scale-105 hover:border-pink-500 duration-300 ease-in-out dark:bg-zinc-800 dark:border-pink-800 dark:hover:border-pink-500">
      <input
        value={children}
        onChange={(e) => {
          handleText(id, e.target.value);
        }}
        className={
          "bg-transparent focus:outline-none w-full " +
          (complete ? "line-through text-gray-400" : "")
        }
      />
      {buttonJSX}
    </div>
  );
}

export default ItemCard;
