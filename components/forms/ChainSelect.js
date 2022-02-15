import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { blockchain } from '../../config/chains';
import { AiOutlineDown, AiOutlineCheck } from 'react-icons/ai'
import Image from 'next/image'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function blockchainSelect() {
    const [selected, setSelected] = useState(blockchain[0])

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <div className="mt-1 relative">
                        <Listbox.Button className="relative w-full bg-black border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="flex items-center">
                                <Image src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" height={40} width={40} />
                                <span className="ml-3 block">{selected.name}</span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <AiOutlineDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-[#191B1F] items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer">
                                {blockchain.map((person) => (
                                    <Listbox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <Image src={person.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" height={40} width={40} />
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'text-white', 'ml-3 block')}
                                                    >
                                                        {person.name}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-white text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
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