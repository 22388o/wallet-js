import { post } from "./index";
export default async function getPolka() {
  var rawBody = JSON.stringify({
    row: 10,
    page: 1,
    address: "5FKpdt1vdgQ2CNeNQXN9evodm4wBH6655R1GyV44tBdNgXP6",
  });

  //   var requestOptions = {
  //     method: "POST",
  //     body: rawBody,
  //     redirect: "follow",
  //   };

  var response = await post(
    "https://westend.api.subscan.io/api/scan/transfers",
    {
      method: "post",
      body: rawBody,
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
}
