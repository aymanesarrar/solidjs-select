import {  createMemo, createSignal } from "solid-js";
import "./App.css";
import Select from "./components/Select";

const COLORS = {
  BUG: "#EB5758",
  CHORE: "#50A7FD",
  FEATURE: "rgb(187,135,252)",
};

function App() {
  const [value, setValue] = createSignal({ id: 0, label: "", color: "" });
  const items = createMemo(() => [
    {
      id: 1,
      label: "Bug",
      color: COLORS.BUG,
    },
    {
      id: 2,
      label: "Feature",
      color: COLORS.FEATURE,
    },
    {
      id: 3,
      label: "Chore",
      color: COLORS.CHORE,
    },
  ]);
  const onChange = (value: string | null) => {
    const item = items().find((item) => item.id === Number(value));
    
    if (item) {
      setValue(item);
    }
  };
  return (
    <>
      <div class="bg-black text-white min-h-screen  flex flex-col items-center justify-center">
        <Select items={items()} onChange={onChange} value={value()} />
      </div>
    </>
  );
}

export default App;
