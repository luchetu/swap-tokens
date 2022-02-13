import Image from 'next/image'
import { RiSettings3Fill } from 'react-icons/ri'
import { AiOutlineDown } from 'react-icons/ai'
import ethLogo from '../assets/eth.png'
import balLogo from '../assets/logo.png'
import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import TransactionLoader from './TransactionLoader'

Modal.setAppElement('#__next')

const style = {
    wrapper: `w-screen flex items-center justify-center mt-14`,
    content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
    formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
    transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
    transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
    currencySelector: `flex w-1/4`,
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

const Main = () => {
    const { formData, handleChange, sendTransaction } =
        useContext(TransactionContext)
    const router = useRouter()

    const handleSubmit = async (e) => {
        const { addressTo, amount } = formData
        e.preventDefault()

        if (!addressTo || !amount) return

        sendTransaction()
    }

    return (
        <div className={style.wrapper}>
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
                            <div className={style.currencySelectorIcon}>
                                <Image src={ethLogo} alt='eth logo' height={20} width={20} />
                            </div>
                            <div className={style.currencySelectorTicker}>ETH</div>
                            {/* <AiOutlineDown className={style.currencySelectorArrow} /> */}
                        </div>
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
                            <div className={style.currencySelectorIcon}>
                                <Image src={balLogo} alt='bal logo' height={20} width={20} />
                            </div>
                            <div className={style.currencySelectorTicker}>BAL</div>
                            {/* <AiOutlineDown className={style.currencySelectorArrow} /> */}
                        </div>
                    </div>
                </div>
                <div onClick={e => handleSubmit(e)} className={style.confirmButton}>
                    Swap
                </div>
            </div>

            <Modal isOpen={!!router.query.loading} style={customStyles}>
                <TransactionLoader />
            </Modal>
        </div>
    )
}

export default Main