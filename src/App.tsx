

type Priority = "Urgente" | "Moyenne" | "Peu Importante";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
}
const App = () => {
  return (
    <div className=" flex justify-center">
      <div className="w-2/3 flex flex-col gap-4 bg-base-300 p-5 rounded-2xl">
        <div className="flex gap-4">
          <input
            type="text"
          className="input input-bordered w-full"
          />
      </div>
      </div>
    </div>
  )
}

export default App
