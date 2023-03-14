  import express from "express"
  import bcrypt from "bcryptjs";
  import users from "../controllers/users.controller";
  
  const userRouter = express.Router();
 

  userRouter.get("/", async (req, res, next) => {
    try {
      let data = await users.findAll();
      res.json(data);
    } catch (err) {
      next(err)
    }
  });

  userRouter.get("/:id", async (req, res, next) => {
    try {
      let {id} = req.params;
      let data = await users.findOneById(id);
      res.json(data);

    } catch(err) {
      next(err)
    }
  });

  userRouter.get("/:email", async (req, res, next) => {
    try {
      let {email} = req.params;
      let data = await users.findOneByEmail(email);
      res.json(data);

    } catch(err) {
      next(err)
    }
  });

 /*  userRouter.post("/", async (req, res ) => {
    let {name, email, pasword} = req.body;
    res.write(name);
    res.end();

  }) */

  userRouter.post("/register", async (req, res, next) => {
    try {

      console.log("req body is " + [req.body])
      let {name, emailAddress, password} = req.body;
      
      console.log("name is " + name);
      console.log("before setting password");
      console.log("rawPassword is " + password)
      let hashed  = await bcrypt.hash(password,10);
      password = hashed;
      console.log("password is " + hashed);
      let user = {name,emailAddress,password};
      console.log("user is " + user) ;
      let data = await users.addUser(user);
      res.json(data);
    } catch (err) {
      next(err)
    }
  });

  userRouter.put("/:id", async (req, res, next) => {
    try {
      let {id} = req.params;
      let {user} = req.body;
      let data = await users.updateUser(user,id);
      res.json(data);
    } catch(err) {
      next(err)
    }
  });

  userRouter.delete("/:id", async (req, res, next) => {
    try {
      let {id} = req.params;
      let data = await users.removeUser(id);
      res.json(data);
    } catch(err) {
      next(err)
    }
  });


 export default userRouter