import { useState } from "react";
import { useRouter } from "next/router";

export default function addCard() {
    const [cardData, setCardData] = useState({
        cardName: "",
        cardNumber: "",
        cardExpMonth: "",
        cardExpYear: "",
        cardCVC: ""
    });
    const router = useRouter();

const handleCardInputChange = (e) => {
  setCardData({
    ...cardData,
    [e.target.name]: e.target.value
  });
    };
    

const addCardAndPay = async (cardData) => {
  try {
    const response = await axios.post("http://localhost:3030/add-Card", cardData);
    const { data } = response;

    if (data.card) {
      router.push("/payment");
    } else {
      console.log("Помилка: не вдалося додати картку");
    }
  } catch (error) {
    console.log(error.message);
  }
};
    

    return (
    <div className="flex justify-center items-center min-h-screen bg-red-900">
        <div className="h-auto w-80 bg-white p-3 rounded-lg">
        <p className="text-xl font-semibold">Payment Details</p>
                <div className="input_text mt-6 relative">
                    <input type="text"  name='cardName' onChange={handleCardInputChange}  className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="John Row" />
                    <span className="absolute left-0 text-sm -top-4">Cardholder Name</span> <i className="absolute left-2 top-4 text-gray-400 fa fa-user"></i> </div>
                <div className="input_text mt-8 relative">
                    <input type="text"  name='cardNumber' onChange={handleCardInputChange} className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="0000 0000 0000 0000" data-slots="0" data-accept="\d" size="19" /> <span className="absolute left-0 text-sm -top-4">Card Number</span> <i className="absolute left-2 top-[14px] text-gray-400 text-sm fa fa-credit-card"></i> </div>
        <div className="mt-8 flex gap-5 ">
                    <div className="input_text relative w-full">
                        <input type="text"  name='cardExpYear' onChange={handleCardInputChange} className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="yy" data-slots="my" /> <span className="absolute left-0 text-sm -top-4">Year</span> <i className="absolute left-2 top-4 text-gray-400 fa fa-calendar-o"></i> </div>
                    <div className="input_text relative w-full">    
                    <input type="text"  name='cardExpMonth' onChange={handleCardInputChange} className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="mm" data-slots="my" /> <span className="absolute left-0 text-sm -top-4">Month</span> <i className="absolute left-2 top-4 text-gray-400 fa fa-calendar-o"></i> </div>
                    <div className="input_text relative w-full">
                        <input type="text" name='cardCVC' onChange={handleCardInputChange}  className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b " placeholder="000" data-slots="0" data-accept="\d" size="3" /> <span className="absolute left-0 text-sm -top-4">CVV</span> <i className="absolute left-2 top-4 text-gray-400 fa fa-lock"></i> </div>
        </div>
        <div className="flex justify-center mt-4"> <button class="outline-none pay h-12 bg-red-600 text-white mb-3 hover:bg-red-900 rounded-lg w-1/2 cursor-pointer transition-all" onSubmit={addCardAndPay}>Register</button> </div>
    </div>
</div>)
}