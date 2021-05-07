import React, { useEffect, useState } from "react";
import axios from "axios";
import Amount from "./Amount";

export default function Summary({ items }) {
    const [rates, setRates] = useState({});

    function Sum() {
        return items.reduce((acc, curr) =>
            acc + (curr.isExpense ? (curr.amount * -1) : +curr.amount), 0)
    }

    useEffect(() => {
        axios.get('https://api.exchangerate.host/latest?base=huf')
            .then(({ data }) => setRates({ ...data.rates }))
            .catch(err => console.err(err.error))
    }, [items])

    return (
        <div className="card h-100 ">
            <div className="card-body">
                <h5 className="card-title">
                    Egyenleg
                </h5>
                <div>
                    <Amount colored="true" amount={Sum()} />
                </div>
                <div className="d-flex mt-2 w-100 justify-content-between">
                    <Amount currency="USD" amount={rates['USD'] * Sum()} />
                    <Amount currency="EUR" amount={rates['EUR'] * Sum()} />
                    <Amount currency="GBP" amount={rates['GBP'] * Sum()} />
                </div>
            </div>
        </div >
    )
}
