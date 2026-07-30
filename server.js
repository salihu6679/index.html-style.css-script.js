app.get("/check-token", (req, res) => {
  res.json({
    token: process.env.TOKEN || "TOKEN NOT FOUND"
  });
});