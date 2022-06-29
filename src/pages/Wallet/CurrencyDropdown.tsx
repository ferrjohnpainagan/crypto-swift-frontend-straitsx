import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

import { DropdownInterface } from 'interfaces'

const Dropdown = ({
  name,
  options,
  selected,
  setSelected,
}: DropdownInterface) => {
  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-24 items-center justify-center rounded-2xl border-0 bg-vanilla3 p-2 text-sm font-medium text-gray-700  outline-none hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue1 focus:ring-offset-2 focus:ring-offset-gray-100">
          {selected === '' ? (
            name
          ) : (
            <div className="flex items-center">
              <img
                src={selected.image}
                className="mr-2 h-5 rounded-full shadow-md"
              />
              {selected.currency}
            </div>
          )}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((item, index) => {
              return (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'text-md flex items-center px-4 py-2',
                      )}
                      onClick={() => setSelected(item)}
                    >
                      <img
                        src={item.image}
                        className="mr-2 h-5 rounded-full shadow-md"
                      />
                      {item.currency}
                    </a>
                  )}
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown
