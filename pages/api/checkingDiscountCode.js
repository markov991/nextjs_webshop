import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }

  const { usedCode, user } = req.query;

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connection to database failed" });
    return;
  }

  try {
    const dbCodesValidation = await client
      .db()
      .collection("discountCodes")
      .findOne({ discountCode: usedCode });

    if (dbCodesValidation && dbCodesValidation.activeCode && user) {
      await client
        .db()
        .collection("usersDb")
        .updateOne(
          { email: user },
          {
            $set: {
              "cart.approvedDiscount": dbCodesValidation.discountValue,
              "cart.usedCodeForDiscount": dbCodesValidation.discountCode,
            },
          }
        );
    }
    res.status(200).json({ data: dbCodesValidation });
  } catch (error) {
  } finally {
    client.close();
  }
}
