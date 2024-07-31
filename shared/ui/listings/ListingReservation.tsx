'use client'

import { Range } from 'react-date-range'
import { BiRuble } from 'react-icons/bi'
import Calendar from '../inputs/Calendar'
import Button from '../Button'
import { ICreatePayment, YooCheckout } from '@a2seven/yoo-checkout'
import { v4 as uuidv4 } from 'uuid'

interface IListingReservation {
    price: number
    dateRange: Range
    totalPrice: number
    onChangeDate: (value: Range) => void
    onSubmit: () => void
    disabled: boolean
    disabledDates: Date[]
    buttonLabel?: string
}

const ListingReservation: React.FC<IListingReservation> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates,
    buttonLabel = 'Забронировать',
}) => {
    const checkout = new YooCheckout({
        shopId: process.env.SHOP_ID || '333233',
        secretKey: process.env.SHOP_SECRET || '1231dasda21rfas',
    })
    const idempotenceKey = uuidv4().toString()
    const createPayload: ICreatePayment = {
        amount: {
            value: totalPrice.toString(),
            currency: 'RUB',
        },
        payment_method_data: {
            type: 'bank_card',
        },
        confirmation: {
            type: 'redirect',
            return_url: '/',
        },
    }
    const createPayment = async () => {
        try {
            const payment = await checkout.createPayment(
                createPayload,
                idempotenceKey
            )
            console.log(payment)
            return payment
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="bg-white dark:bg-black rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="">
                <div className="text-2xl font-semibold flex flex-row items-center gap-1 p-4">
                    <BiRuble size={24} />
                    {price}
                    <div className="font-light text-neutral-600">/ сутки</div>
                </div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
                <Button
                    disabled={disabled}
                    label={buttonLabel}
                    onClick={onSubmit}
                />
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>Итого:</div>
                <div className="flex items-center gap-1">
                    {' '}
                    <BiRuble size={18} className="text-neutral-500" />{' '}
                    {totalPrice}
                </div>
            </div>
        </div>
    )
}

export default ListingReservation
