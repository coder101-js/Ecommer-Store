import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

// Handle POST requests (add/update data)
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), {
      status: 401,
    });
  }

  const { type, data } = await req.json();
  const client = await clientPromise;
  const db = client.db("Ecommer_user");

  const user = await db.collection("users").findOne({ email: session.user.email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  try {
    switch (type) {
      case "cart":
        await db.collection("carts").updateOne(
          { userId: user._id },
          { $set: { items: data, updatedAt: new Date() } },
          { upsert: true }
        );
        break;

      case "order":
        await db.collection("orders").insertOne({
          userId: user._id,
          items: data.items,
          total: data.total,
          shippingAddressId: new ObjectId(data.addressId),
          paymentStatus: "pending",
          orderStatus: "processing",
          createdAt: new Date(),
        });
        break;

      case "address":
        const result = await db.collection("addresses").insertOne({
          userId: user._id,
          ...data,
        });
        return new Response(JSON.stringify({ addressId: result.insertedId }), {
          status: 201,
        });

      default:
        return new Response(JSON.stringify({ message: "Invalid type" }), {
          status: 400,
        });
    }

    return new Response(JSON.stringify({ message: "Saved successfully ✅" }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Error saving data", error: err.message }),
      { status: 500 }
    );
  }
}

// Handle GET requests (read data like cart)
export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const url = new URL(req.url);
  const type = url.searchParams.get("type"); // e.g. /api/save?type=cart

  const client = await clientPromise;
  const db = client.db("Ecommer_user");
  const user = await db.collection("users").findOne({ email: session.user.email });

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  switch (type) {
    case "cart":
      const cartDoc = await db.collection("carts").findOne({ userId: user._id });
      return new Response(JSON.stringify(cartDoc || { items: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

    default:
      return new Response(JSON.stringify({ message: "Invalid type" }), {
        status: 400,
      });
  }
}
