from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.cart import Cart
from app.models.product import Product

from app.schemas.cart_schema import CartCreate

from app.utils.dependencies import get_current_user
from app.utils.jwt_handler import verify_token

router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)


# ADD TO CART
@router.post("/add")
def add_to_cart(
    item: CartCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    # CHECK PRODUCT
    product = db.query(Product).filter(
        Product.id == item.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    # CHECK EXISTING CART ITEM
    existing_item = db.query(Cart).filter(
        Cart.user_id == current_user.id,
        Cart.product_id == item.product_id
    ).first()

    # IF EXISTS -> UPDATE QUANTITY
    if existing_item:

        existing_item.quantity += item.quantity

        db.commit()

        return {
            "message": "Cart Updated ✅"
        }

    # ELSE CREATE NEW ITEM
    cart_item = Cart(
        user_id=current_user.id,
        product_id=item.product_id,
        quantity=item.quantity
    )

    db.add(cart_item)

    db.commit()

    db.refresh(cart_item)

    return {
        "message": "Added To Cart ✅"
    }


# VIEW CART
@router.get("/")
def view_cart(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    items = db.query(Cart).filter(
        Cart.user_id == current_user.id
    ).all()

    return items


# REMOVE ITEM
@router.delete("/{cart_id}")
def remove_cart_item(
    cart_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    item = db.query(Cart).filter(
        Cart.id == cart_id,
        Cart.user_id == current_user.id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    db.delete(item)

    db.commit()

    return {
        "message": "Item Removed ✅"
    }