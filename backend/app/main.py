from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

from app.models.user import User
from app.models.product import Product
from app.models.cart import Cart
from app.models.order import Order

from app.routes.auth import router as auth_router
from app.routes.users import router as users_router
from app.routes.products import router as products_router
from app.routes.cart import router as cart_router
from app.routes.orders import router as orders_router
from app.routes.payments import router as payments_router

app = FastAPI(
    title="NextCart API",
    version="1.0.0"
)

# CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(products_router)
app.include_router(cart_router)
app.include_router(orders_router)
app.include_router(payments_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to NextCart API"
    }

@app.get("/health")
def health():
    return {
        "status": "running"
    }