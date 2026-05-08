from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime, timezone
from app.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    total_amount = Column(Float, nullable=False)
    status = Column(String(50), default="Pending")
    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc)
    )