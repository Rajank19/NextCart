from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime, timezone
from app.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(String(1000), nullable=False)
    price = Column(Float, nullable=False)
    category = Column(String(100), nullable=False)
    brand = Column(String(100), nullable=True)
    image_url = Column(String(500), nullable=True)
    stock = Column(Integer, default=0)
    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc)
    )