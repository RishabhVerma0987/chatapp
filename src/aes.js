var aes256 = require("aes256");

var key = "obvwoqcbv21801f19d0zibcoavwpnq";

export const DoEncrypt = (text) => {
  var encrypted = aes256.encrypt(key, text);
  return encrypted;
};
export const DoDecrypt = (cipher, username) => {
  if (cipher.startsWith("Welcome")) {
    return cipher;
  }

  if (cipher.startsWith(username)) {
    return cipher;
  }

  var decrypted = aes256.decrypt(key, cipher);
  return decrypted;
};
