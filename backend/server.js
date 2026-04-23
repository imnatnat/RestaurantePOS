const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ ROOT TEST
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ DB TEST
app.get("/test-db", (req, res) => {
  db.query("SELECT COUNT(*) as total FROM Mesa", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
    res.json({
      message: "DB connected ✅",
      mesas: result[0].total
    });
  });
});

// --- AUTH ---
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM Usuario WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.length > 0) {
        res.json({ success: true, token: "demo-token" });
      } else {
        res.json({ success: false });
      }
    }
  );
});

// --- MESAS ---
app.get("/mesas", (req, res) => {
  db.query("SELECT * FROM Mesa", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

app.put("/mesas/:id", (req, res) => {
  db.query(
    "UPDATE Mesa SET estado='Ocupada' WHERE id_mesa=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.send("ok");
    }
  );
});

// --- ORDENES ---
app.get("/orden/mesa/:id_mesa", (req, res) => {
  db.query(
    `SELECT * FROM Orden 
     WHERE id_mesa=? AND estado_orden != 'Entregado'
     LIMIT 1`,
    [req.params.id_mesa],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json(result[0] || null);
    }
  );
});

app.post("/orden", (req, res) => {
  const { id_mesa } = req.body;
  db.query(
    `INSERT INTO Orden (id_mesa, fecha_orden, estado_orden, tipo_orden)
     VALUES (?, NOW(), 'Pendiente', 'Comer aquí')`,
    [id_mesa],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id_orden: result.insertId });
    }
  );
});

app.post("/orden/:id/detalle", (req, res) => {
  const { id_menu, cantidad, subtotal } = req.body;
  db.query(
    `INSERT INTO Detalle_Orden (id_orden, id_menu, cantidad, subtotal)
     VALUES (?, ?, ?, ?)`,
    [req.params.id, id_menu, cantidad, subtotal],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.send("ok");
    }
  );
});

app.put("/orden/:id/cerrar", (req, res) => {
  const id = req.params.id;

  db.query(
    `UPDATE Orden SET estado_orden='Entregado' WHERE id_orden=?`,
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err });

      db.query(
        `UPDATE Mesa SET estado='Disponible'
         WHERE id_mesa = (SELECT id_mesa FROM Orden WHERE id_orden=?)`,
        [id],
        (err2) => {
          if (err2) return res.status(500).json({ error: err2 });
          res.send("closed");
        }
      );
    }
  );
});

// --- MENU ---
app.get("/menu", (req, res) => {
  db.query("SELECT * FROM Menu", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// --- INVENTARIO ---
app.get("/inventario", (req, res) => {
  db.query(
    `SELECT p.nombre, i.cantidad
     FROM Inventario i
     JOIN Producto p ON i.id_producto = p.id_producto`,
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json(result);
    }
  );
});

// --- START ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

