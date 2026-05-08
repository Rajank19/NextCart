from pydantic import BaseModel


# CREATE PRODUCT SCHEMA
class ProductCreate(BaseModel):

    title: str
    description: str
    price: float
    category: str
    brand: str | None = None
    image_url: str | None = None
    stock: int


# RESPONSE SCHEMA
class ProductResponse(ProductCreate):

    id: int

    class Config:
        from_attributes = True