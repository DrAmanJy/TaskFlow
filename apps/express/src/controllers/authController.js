export const register = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  res.json({ user: { firstName, lastName, email, password } });
};
