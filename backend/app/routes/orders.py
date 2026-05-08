from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order
from app.schemas.order_schema import OrderCreate

router = APIRouter(prefix="/orders", tags=["Orders"])


# ✅ CREATE ORDER (NO AUTH FOR NOW)
@router.post("/create")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    try:
        new_order = Order(
            user_id=1,  # 🔥 temporary user (no login required)
            total_amount=order.total_amount,
            status="Pending"  # default status
        )

        db.add(new_order)
        db.commit()
        db.refresh(new_order)

        return {
            "message": "Order created successfully",
            "order_id": new_order.id
        }

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Order creation failed")


# ✅ GET ALL ORDERS (ADMIN VIEW)
@router.get("/")
def get_all_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()


# ✅ UPDATE ORDER STATUS (OPTIONAL - FOR ADMIN)
@router.put("/{order_id}")
def update_order_status(order_id: int, status: dict, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = status.get("status", order.status)

    db.commit()

    return {"message": "Order updated successfully"}


# ✅ DELETE ORDER (OPTIONAL)
@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    db.delete(order)
    db.commit()

    return {"message": "Order deleted successfully"}