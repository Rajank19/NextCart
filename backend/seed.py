from app.database import SessionLocal
from app.models.product import Product

def seed_products():
    print("🚀 Starting seeding...")

    db = SessionLocal()

    try:
        products = [
            Product(title="iPhone 15", price=79999, category="Electronics", stock=10, description="Apple phone"),
            Product(title="Nike Shoes", price=4999, category="Fashion", stock=20, description="Running shoes"),
            Product(title="Dell Laptop", price=55999, category="Electronics", stock=8, description="Work laptop"),
        ]

        for product in products:
            db.add(product)

        db.commit()

        print("✅ Products Inserted Successfully")

    except Exception as e:
        print("❌ ERROR:", e)

    finally:
        db.close()


if __name__ == "__main__":
    seed_products()