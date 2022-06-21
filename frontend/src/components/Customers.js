import React from "react";

export default function Customers(props) {
  return (
    <div>
      <h1>Customers</h1>
      {props.customers.map((customer) => {
        return (
          <div>
            <h2>{customer.title} {" "} {customer.display_name}</h2>
            <h3>{customer.phone_number}</h3>
            <h3>{customer.email}</h3>
          </div>
        );
      })}
    </div>
  );
}
