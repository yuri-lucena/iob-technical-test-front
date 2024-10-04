import { ListboxOption } from "@headlessui/react";
import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";

export default function DropdownOptions({
  key,
  value,
  children,
}: {
  key: any;
  value: any;
  children: React.ReactNode;
}) {
  return (
    <ListboxOption
      key={key}
      value={value}
      className="group relative rounded-md h-full cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-pink-600 data-[focus]:text-white"
    >
      {children}

      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-pink-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
        <CheckIcon aria-hidden="true" className="h-5 w-5" />
      </span>
    </ListboxOption>
  );
}
