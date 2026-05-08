from pydantic import BaseModel


class OrderCreate(BaseModel):
    total_amount: float