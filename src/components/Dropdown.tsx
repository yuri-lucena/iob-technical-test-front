import { Listbox, ListboxButton, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Dropdown({
  value,
  onChange,
  id,
  label,
  textWhenSelected,
  textWhenNotSelected,
  children,
}: {
  value?: any;
  onChange: (value: any) => void;
  id: string;
  label?: string;
  textWhenSelected: string;
  textWhenNotSelected: string;
  children: React.ReactNode;
}) {
  return (
    <Listbox value={value} onChange={onChange}>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="relative mt-2">
        <ListboxButton
          id={id}
          className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm sm:leading-6"
        >
          <span className="flex items-center">
            <span className="block truncate">
              {value != null ? textWhenSelected : textWhenNotSelected}
            </span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {children}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
