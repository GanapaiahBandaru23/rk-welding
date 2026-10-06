const bcrypt = require("bcryptjs");
const db = require("./config/db");

const createAdmin = async () => {
  try {
    const name = "RK Welding Admin";
    const email = "admin@rkwelding.com";
    const password = "Admin@123";

    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, passwordHash]
    );

    console.log("Admin created successfully");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();