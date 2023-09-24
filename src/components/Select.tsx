import { For, Show, createEffect, createSignal } from "solid-js";
import VsCircleFilled from "./Circle";

interface ISelectProps {
  items: Array<{ label: string; color: string; id: number }>;
  onChange: (value: string | null) => void;
  value?: { label: string; color: string; id: number };
  isDisabled?: boolean;
}
export default function Select(props: ISelectProps) {
  const [focused, setFocused] = createSignal(false);
  const [dropdownVisible, setDropdownVisible] = createSignal(false);
  const [filteredItems, setFilteredItems] = createSignal(props.items);
  const [selectedItem, setSelectedItem] = createSignal(false);

  const [inputValue, setInputValue] = createSignal("");

  const handleDocumentClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".select-container")) {
      console.log("value", props.value);
      console.log(inputValue());
      setDropdownVisible(false);
    }
  };
  //   createEffect(() => {
  //     setFilteredItems(
  //       props.items.filter((item) => item.label.includes(inputValue()))
  //     );
  //     console.log("filteredItems", filteredItems());
  //   });

  createEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  });
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    console.log("inputValue", inputValue());
    setFilteredItems(
      props.items.filter((item) => item.label.includes(inputValue()))
    );
  }
  return (
    <div class="relative select-container">
      <input
        type="text"
        placeholder="Add labels ..."
        class="px-8 py-3 outline-none text-[#FEFFFE] rounded-t-lg border-b-[#313142] border-b-2 bg-[#272835]"
        onfocus={() => {
          setFocused(true);
          setDropdownVisible(true);
        }}
        value={inputValue()}
        onInput={handleInputChange}
      />
      <Show when={props.value?.id !== 0 && selectedItem() === true}>
        <li
          onClick={() => {
            setFocused(true);
            setDropdownVisible(true);
            setSelectedItem(false);
            setInputValue("");
          }}
          //   value={props.value?.id}
          class="px-8 py-3 text-[#FEFFFE] flex items-center gap-4 hover:cursor-pointer hover:rounded-lg bg-[#272835] absolute w-full top-0 rounded-t-lg"
        >
          <VsCircleFilled color={props.value?.color} /> {props.value?.label}
        </li>
      </Show>
      <Show when={focused() && dropdownVisible()}>
        <ul class="bg-[#272835] rounded-b-lg absolute w-full max-h-48 overflow-y-auto no-scrollbar p-1">
          <For each={filteredItems()}>
            {(item) => (
              <li
                value={item.id}
                class="px-8 py-3 text-[#FEFFFE] flex items-center gap-4 hover:cursor-pointer hover:rounded-lg hover:bg-gray-500 hover:bg-opacity-10"
                onClick={(e) => {
                  props.onChange(e.target.getAttribute("value"));
                  setSelectedItem(true);
                  setDropdownVisible(false);
                }}
              >
                <VsCircleFilled color={item.color} /> {item.label}
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}
