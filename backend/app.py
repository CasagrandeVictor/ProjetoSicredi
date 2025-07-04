from database import create_app, db

app = create_app()  # ✔️ Apenas isso

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
