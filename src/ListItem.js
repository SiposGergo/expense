import React from "react";
import Amount from "./Amount";

export default function ListItem({ amount, remove, name, id, isExpense }) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>{name}</span>
            <div className="d-flex align-items-center">
                <Amount color="true" amount={isExpense ? amount * -1 : amount} />
                <button className="ml-2 btn btn-danger" onClick={() => remove(id)}>
                    Törlés
                </button>
            </div>
        </li>
    )
}