import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { tokens } from '../../config/tokens';
import { AiOutlineDown, AiOutlineCheck } from 'react-icons/ai'
import Image from 'next/image'
import { RiSettings3Fill } from 'react-icons/ri'

const style = {
  wrapper: `flex justify-center items-center h-screen`,
  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
  currencySelector: `flex w-1/2`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
}

const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#0a0b0d',
      padding: 0,
      border: 'none',
  },
  overlay: {
      backgroundColor: 'rgba(10, 11, 13, 0.75)',
  },
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function tokenSelect() {
  const [selected, setSelected] = useState(tokens[0])
  const [selectedSwap, setSelectedSwap] = useState(tokens[1])

  return (
    <div className={style.content}>
      <div className={style.formHeader}>
        <div>Swap</div>
        <div>
          <RiSettings3Fill />
        </div>
      </div>
      <div className={style.transferPropContainer}>
        <input
          type='text'
          className={style.transferPropInput}
          placeholder='0.0'
          pattern='^[0-9]*[.,]?[0-9]*$'
          onChange={e => handleChange(e, 'amount')}
        />
        <div className={style.currencySelector}>
          <div className={style.currencySelectorContent}>
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <div className="mt-1 relative">
                    <Listbox.Button className="relative w-full bg-black border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="flex items-center">
                        <Image src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" height={40} width={40} />
                        <span className="ml-3 block ">{selected.name}</span>
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
                        {tokens.map((person) => (
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
          </div>
        </div>
      </div>
      <div className={style.transferPropContainer}>
        <input
          type='text'
          className={style.transferPropInput}
          placeholder='0.0'
          pattern='^[0-9]*[.,]?[0-9]*$'
        />
        <div className={style.currencySelector}>
          <div className={style.currencySelectorContent}>
            <Listbox value={selectedSwap} onChange={setSelectedSwap}>
              {({ open }) => (
                <>
                  <div className="mt-1 relative">
                    <Listbox.Button className="relative w-full bg-black border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="flex items-center">
                        <Image src={selectedSwap.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" height={40} width={40} />
                        <span className="ml-3 block ">{selectedSwap.name}</span>
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
                        {tokens.map((person) => (
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
          </div>
        </div>
      </div>
      <div onClick={e => handleSubmit(e)} className={style.confirmButton}>
        Swap
      </div>
    </div>

  )
}