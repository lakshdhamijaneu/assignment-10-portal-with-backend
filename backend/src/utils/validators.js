const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[A-Za-z ]+$/;
const STRONG_PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const validateEmail = (email) => EMAIL_REGEX.test(String(email || "").trim());
const validateFullName = (name) => NAME_REGEX.test(String(name || "").trim());
const validateStrongPassword = (pwd) =>
  STRONG_PWD_REGEX.test(String(pwd || ""));

module.exports = {
  validateEmail,
  validateFullName,
  validateStrongPassword,
};
