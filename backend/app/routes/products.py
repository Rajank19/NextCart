from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product
from app.schemas.product_schema import (
    ProductCreate,
    ProductResponse
)

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


# ✅ GET ALL PRODUCTS
@router.get("/", response_model=list[ProductResponse])
def get_products(
    db: Session = Depends(get_db)
):

    products = db.query(Product).all()

    return products


# ✅ CREATE PRODUCT
@router.post("/", response_model=ProductResponse)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):

    new_product = Product(

        title=product.title,
        description=product.description,
        price=product.price,
        category=product.category,
        brand=product.brand,
        image_url=product.image_url,
        stock=product.stock

    )

    db.add(new_product)

    db.commit()

    db.refresh(new_product)

    return new_product
# DELETE PRODUCT
@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:

        return {
            "message": "Product Not Found"
        }

    db.delete(product)

    db.commit()

    return {
        "message": "Product Deleted Successfully"
    }
# UPDATE PRODUCT
@router.put("/{product_id}")
def update_product(
    product_id: int,
    updated_product: ProductCreate,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:

        return {
            "message": "Product Not Found"
        }

    # UPDATE FIELDS
    product.title = updated_product.title
    product.description = updated_product.description
    product.price = updated_product.price
    product.category = updated_product.category
    product.brand = updated_product.brand
    product.image_url = updated_product.image_url
    product.stock = updated_product.stock

    db.commit()

    db.refresh(product)

    return {
        "message": "Product Updated Successfully",
        "product": product
    }