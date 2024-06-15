"use server";
import SSLCommerzPayment from "sslcommerz-lts";
import auth from "../auth/auth";
import Model from "@/model/Model";
import makeUniqueId from "@/library/makeUniqueId";

export async function paymentAction({ amount }: { amount: number }) {
  try {
    const currentUser = await auth();
    const userData = await Model.prepare("SELECT * FROM Users WHERE id=?", [
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

    const data = {
      total_amount: amount,
      currency: "BDT",
      tran_id: makeUUID, // use unique tran_id for each api call
      success_url: "https://fnsoftwares.com/api/v1/payment/success",
      fail_url: "https://fnsoftwares.com/api/v1/payment/fail",
      cancel_url: "https://fnsoftwares.com/api/v1/payment/cancel",
      ipn_url: "https://fnsoftwares.com/api/v1/payment/ipn",
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
      cus_country: userData?.country,
      cus_phone: userData?.phone,
      cus_fax: "N/A",
      ship_name: userData?.firstName + " " + userData?.lastName,
      ship_add1: userData?.address,
      ship_add2: userData?.address,
      ship_city: userData?.city,
      ship_state: userData?.state,
      ship_postcode: userData?.postalCode,
      ship_country: userData?.country,
      value_a: userData?.id,
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    console.log(apiResponse);
  } catch (error) {
    return undefined;
  }
}
