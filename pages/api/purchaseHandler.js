import {
  connectToDatabase,
  getDateOfPurchase,
  generateRandomNumber,
} from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }

  const { userInfo, userCart, userDiscountInfo, cardDetails } = req.body;
  const { user } = req.query;

  if (!userCart || userCart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connection to database failed" });
    return;
  }
  const db = client.db();

  try {
    //checking is discount code still valid
    if (userDiscountInfo.usedCode) {
      const dbCodesValidation = await client
        .db()
        .collection("discountCodes")
        .findOne({ discountCode: userDiscountInfo.usedCode });

      if (!dbCodesValidation || !dbCodesValidation.activeCode) {
        return res
          .status(400)
          .json({ message: "Code does not exist or is no longer active" });
      }
    }

    //Logic if payment is with credit card
    let paymentDetails;
    if (cardDetails) {
      if (
        !cardDetails.enteredNameOnCard ||
        !cardDetails.enteredCardNumber ||
        !cardDetails.enteredExpiryDate ||
        !cardDetails.enteredCvv
      ) {
        return res.status(400).json({ message: "Incomplete card details" });
      }
      paymentDetails = "Payed with credit card";
    }

    ////Logic if payment is on delivery////////////

    if (!cardDetails) {
      paymentDetails = "Cache on delivery";
    }

    const price = userCart
      .map((item) => item.selling_price * item.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const fixedCartItems = userCart.map((item) => ({
      productId: item.productId,
      productName: item.name,
      quantity: item.quantity,
      category: item.category,
      price: item.selling_price,
      displayImage: item.images[0],
    }));
    const dateOfPurchase = getDateOfPurchase();
    const randomId = generateRandomNumber();

    //Logic for registered users
    if (user) {
      const addingItems = await db.collection("usersDb").updateOne(
        { email: user },
        {
          $push: {
            "orders.completed": {
              orderId: randomId,
              discount: userDiscountInfo.approvedDiscount,
              paymentDetails: paymentDetails,
              date: dateOfPurchase,
              status: "Paid",
              price: price,
              deliveryAddress: {
                phoneNumber: userInfo.phoneNumber,
                state: userInfo.state,
                city: userInfo.cityName,
                address: userInfo.streetAddress,
                postalCode: userInfo.pinCode,
              },
              items: fixedCartItems,
            },
          },
        }
      );
      if (addingItems.modifiedCount > 0) {
        const clearingCart = await db.collection("usersDb").updateOne(
          { email: user },
          {
            $set: {
              cart: {
                usedCodeForDiscount: "",
                approvedDiscount: 0,
                items: [],
              },
            },
          }
        );
        if (clearingCart.modifiedCount === 0) {
          throw new Error("Failed to add new product to the cart");
        }
      }
    }
    await db.collection("allOrders").insertOne({
      orderId: randomId,
      date: dateOfPurchase,
      userDiscountInfo,
      userInfo,
      items: fixedCartItems,
      price: price,
      paymentDetails: paymentDetails,
    });
    res.status(200).json({ status: "success", message: "Order completed" });
  } catch (error) {
    console.error("Order processing error:", error);
    res.status(500).json({ status: "error", message: error.message });
  } finally {
    client.close();
  }
}
