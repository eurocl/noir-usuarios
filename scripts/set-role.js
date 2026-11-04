import mongoose from "mongoose";
import dns from "node:dns";
import { loadEnvironment } from "../src/runtime.js";
import { databaseConfig } from "../src/database-config.js";
import User from "../src/models/User.js";

// Local operator command only. Never expose this operation as a public route.
const [email, role] = process.argv.slice(2);
if (!email || !["admin", "customer"].includes(role)) {
  console.error("Uso: node scripts/set-role.js correo admin|customer");
  process.exitCode = 1;
} else {
  try {
    loadEnvironment();
    if (process.env.MONGO_DNS_SERVERS) dns.setServers(process.env.MONGO_DNS_SERVERS.split(",").map(value => value.trim()));
    const { uri, dbName } = databaseConfig();
    await mongoose.connect(uri, { dbName, serverSelectionTimeoutMS: 15000 });
    const users = await User.find({ email }).select("_id email role");
    if (users.length !== 1) throw new Error("Debe existir exactamente una cuenta con ese correo. No se modificó ninguna cuenta.");
    await User.updateOne({ _id: users[0]._id }, { $set: { role } }, { runValidators: true });
    console.log(`Rol actualizado: ${email} -> ${role}. Volvé a iniciar sesión. Los tokens anteriores vencen en hasta una hora.`);
  } catch (error) {
    console.error(error.name === "MongoServerSelectionError" ? "No se pudo conectar a Atlas" : error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}
