module.exports = {
    CREATE_USER: `
      INSERT INTO users(email, password)
      VALUES($1, $2)
      RETURNING id, email
    `,
  
    FIND_USER_BY_EMAIL: `
      SELECT * FROM users WHERE email=$1
    `,
  };