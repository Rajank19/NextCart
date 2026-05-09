import razorpay
import os

from fastapi import APIRouter, Body
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)

# RAZORPAY CLIENT
client = razorpay.Client(
    auth=(
        os.getenv("RAZORPAY_KEY_ID"),
        os.getenv("RAZORPAY_KEY_SECRET")
    )
)

# CREATE PAYMENT ORDER
@router.post("/create-order")
def create_payment_order(
    data: dict = Body(...)
):

    amount = data.get("amount")

    if not amount:

        return {
            "success": False,
            "message": "Amount is required"
        }

    # FIXED TEST PAYMENT AMOUNT
    order_data = {
        "amount": 500 * 100,
        "currency": "INR",
        "payment_capture": 1
    }

    # CREATE ORDER
    order = client.order.create(
        data=order_data
    )

    return {
        "id": order["id"],
        "amount": order["amount"],
        "currency": order["currency"]
    }