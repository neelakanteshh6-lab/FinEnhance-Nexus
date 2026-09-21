from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATABASE = os.path.join(BASE_DIR, "database", "finenhance.db")
SCHEMA = os.path.join(BASE_DIR, "database", "schema.sql")

app = Flask(__name__)
CORS(app)


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def initialize_database():
    os.makedirs(os.path.dirname(DATABASE), exist_ok=True)

    if not os.path.exists(SCHEMA):
        raise FileNotFoundError(
            f"schema.sql not found at: {SCHEMA}"
        )

    conn = sqlite3.connect(DATABASE)

    with open(SCHEMA, "r", encoding="utf-8") as file:
        schema = file.read()

    conn.executescript(schema)
    conn.commit()
    conn.close()

    print("Database initialized successfully!")


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "FinEnhance-Nexus backend is running"
    })


@app.route("/api/test", methods=["GET"])
def test():
    return jsonify({
        "success": True,
        "message": "Backend connection successful"
    })


@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "success": False,
            "message": "No data received"
        }), 400

    first_name = str(data.get("first_name", "")).strip()
    last_name = str(data.get("last_name", "")).strip()
    email = str(data.get("email", "")).strip().lower()
    password = str(data.get("password", ""))

    if not first_name or not last_name or not email or not password:
        return jsonify({
            "success": False,
            "message": "All fields are required"
        }), 400

    if len(password) < 6:
        return jsonify({
            "success": False,
            "message": "Password must contain at least 6 characters"
        }), 400

    password_hash = generate_password_hash(password)

    conn = get_db()

    try:
        conn.execute(
            """
            INSERT INTO users (
                email,
                first_name,
                last_name,
                password_hash
            )
            VALUES (?, ?, ?, ?)
            """,
            (
                email,
                first_name,
                last_name,
                password_hash
            )
        )

        conn.commit()

        return jsonify({
            "success": True,
            "message": "Account created successfully"
        }), 201

    except sqlite3.IntegrityError:
        return jsonify({
            "success": False,
            "message": "Email already registered"
        }), 409

    finally:
        conn.close()


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "success": False,
            "message": "No data received"
        }), 400

    email = str(data.get("email", "")).strip().lower()
    password = str(data.get("password", ""))

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required"
        }), 400

    conn = get_db()

    try:
        user = conn.execute(
            """
            SELECT
                id,
                email,
                first_name,
                last_name,
                password_hash
            FROM users
            WHERE email = ?
            """,
            (email,)
        ).fetchone()
    finally:
        conn.close()

    if user is None:
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    if not check_password_hash(
        user["password_hash"],
        password
    ):
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    return jsonify({
        "success": True,
        "message": "Login successful",
        "user": {
            "id": user["id"],
            "email": user["email"],
            "first_name": user["first_name"],
            "last_name": user["last_name"]
        }
    }), 200


@app.route("/api/sectors", methods=["GET"])
def get_sectors():
    conn = get_db()

    try:
        sectors = conn.execute(
            """
            SELECT id, name
            FROM sectors
            ORDER BY name
            """
        ).fetchall()
    finally:
        conn.close()

    return jsonify({
        "success": True,
        "sectors": [
            {
                "id": sector["id"],
                "name": sector["name"]
            }
            for sector in sectors
        ]
    }), 200


@app.route("/api/sectors/<int:sector_id>/sub-sectors", methods=["GET"])
def get_sub_sectors(sector_id):
    conn = get_db()

    try:
        sector = conn.execute(
            """
            SELECT id, name
            FROM sectors
            WHERE id = ?
            """,
            (sector_id,)
        ).fetchone()

        if sector is None:
            return jsonify({
                "success": False,
                "message": "Sector not found"
            }), 404

        sub_sectors = conn.execute(
            """
            SELECT id, name
            FROM sub_sectors
            WHERE sector_id = ?
            ORDER BY name
            """
        , (sector_id,)).fetchall()

    finally:
        conn.close()

    return jsonify({
        "success": True,
        "sector": {
            "id": sector["id"],
            "name": sector["name"]
        },
        "sub_sectors": [
            {
                "id": sub_sector["id"],
                "name": sub_sector["name"]
            }
            for sub_sector in sub_sectors
        ]
    }), 200


if __name__ == "__main__":
    initialize_database()

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )