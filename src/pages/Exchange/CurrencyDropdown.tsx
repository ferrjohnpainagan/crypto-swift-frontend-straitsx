import React, { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

import { DropdownInterface } from 'interfaces'

const CurrencyDropdown = ({
  name,
  options,
  selected,
  setSelected,
  type,
}: any) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Menu as="div" className="relative inline-block pl-2 text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center rounded-md border-0 bg-white font-workSans text-black1 outline-none hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue1 focus:ring-offset-2 focus:ring-offset-gray-100">
          {selected === '' ? (
            name
          ) : (
            <div className="flex items-center">{selected.stableCoin}</div>
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                      onClick={() => setSelected(type, item)}
                    >
                      {item.stableCoin}
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

export default CurrencyDropdown
