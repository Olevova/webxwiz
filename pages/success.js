import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Success() {
 //    const [date, setDate] = useState([]);
 //    const router = useRouter();
 // const fetchPurchaseData = async (sessionId) => {
 //    try {
 //      const { data } = await axios.get(
 //        `http://localhost:3030/purchase/${sessionId}` // Замініть URL на свій шлях до бекенду для отримання інформації про покупку
 //        );
 //        console.log(data);
 //      setDate(data)// Обробити отриману інформацію про куплені товари
 //    } catch (error) {
 //      console.log(error);
 //    }
 //  };

 //  useEffect(() => {
 //      const sessionId = router.query.sessionId;
 //    console.log(sessionId);// Отримати ідентифікатор сеансу оплати з URL
 //      if (sessionId) {
 //        console.log("have");
 //      fetchPurchaseData(sessionId); // Викликати функцію для отримання інформації про куплені товари
 //    }
 //  }, [router.query.sessionId]);


    return <div>
        <p>Your putches is ok</p>
        // <p>Your Email <span>{date.customer_details.email }</span></p>
        // <p>Your Card Name <span>{date.customer_details.name }</span></p>
        // <span>{date.amount_total / 100}$</span>
  </div>;
}
// {date.customer_details.email } {date.customer_details.name }
