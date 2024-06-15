"use server";
import auth from "../auth/auth";
import Model from "@/model/Model";
import makeUniqueId from "@/library/makeUniqueId";

export async function initPayment({ amount }: { amount: any }) {
  try {
    const currentUser = await auth();
    const [userData] = await Model.prepare("SELECT * FROM Users WHERE id=?", [
      currentUser?.id,
    ]);

    const is_live = false; //true for live, false for sandbox
    const store_id = is_live ? "fnsoftwareslive" : "fnsof5ea547cfaf1a5";
    const store_passwd = is_live
      ? "5EA66F77BE57221754"
      : "fnsof5ea547cfaf1a5@ssl";
    const ValidationApiURL = is_live
      ? "https://secure.sslcommerz.com/validator/api/validationserverAPI.php"
      : "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php";

    //init
    const makeUUID = await makeUniqueId("Transactions");

    //make api call
    const initPayment = await fetch(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      {
        method: "POST",
        body: new URLSearchParams({
          store_id: store_id,
          store_passwd: store_passwd,
          total_amount: amount,
          currency: "BDT",
          tran_id: makeUUID, // use unique tran_id for each api call
          success_url: "http://localhost:3000/api/payment/success",
          fail_url: "http://localhost:3000/api/payment/failed",
          cancel_url: "http://localhost:3000/api/payment/cancelled",
          shipping_method: "Digital Product",
          product_name: "Funds Deposit To Account",
          product_category: "Balance Deposit",
          product_profile: "Deposit Money To Personal Account",
          cus_name: userData?.firstName + " " + userData?.lastName,
          cus_email: userData?.email,
          cus_add1: userData?.address,
          cus_add2: userData?.address,
          cus_city: userData?.city,
          cus_state: userData?.state,
          cus_postcode: userData?.postalCode,
          cus_country: userData?.countryIso3,
          cus_phone: userData?.phone,
          cus_fax: "N/A",
          ship_name: userData?.firstName + " " + userData?.lastName,
          ship_add1: userData?.address,
          ship_add2: userData?.address,
          ship_city: userData?.city,
          ship_state: userData?.state,
          ship_postcode: userData?.postalCode,
          ship_country: userData?.countryIso3,
          value_a: userData?.id,
        }),
      },
    );
    const initResult = await initPayment.json();

    return {
      status: true,
      message: "Request Success",
      response: initResult,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error?.message,
      response: null,
    };
  }
}
