import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {FiChevronDown ,FiCheck} from 'react-icons/fi'
import { useStateContext } from '../context/StateContetx'
import { strings } from '../strings'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CatSelect() {

  const{category , lang ,setShowMenu ,categorys ,setCategorys} = useStateContext()
  const [selected, setSelected] = useState(categorys)
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{lang=='du'?selected.category:(lang=='ar'?selected.arabic_cat:selected.persian_cat)}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <FiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
             
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {category.map((cat) => (
                  <Listbox.Option
                    key={cat.id}
                   onClick={()=>{setCategorys(cat);setShowMenu(false)}}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={cat}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {lang=='du'?cat.category:(lang=='ar'?cat.arabic_cat:cat.persian_cat)}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <FiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
