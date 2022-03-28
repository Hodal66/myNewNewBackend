
export const getUsers = async (req, res) => {
    User.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        return res
          .status(200)
          .json({ title: "All Users", status: 200, users: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ status: 500, message: "Internal server error" });
      });
}

export const loginUser = async (req, res) => {
    //Validating data before the user Logged In
    const { error } = loginValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }
  
    //checking if the userEmail exist in db
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user)
      return res
        .status(400)
        .json({ status: 400, message: "Invalid credentials!" });
  
    //Checking if password is valid
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res
        .status(400)
        .json({ status: 400, message: "Invalid userName or password" });
  
  
        if(user.email === "admin@gmail.com"){
          const token = jwt.sign({ _id: user._id }, process.env.ADMIN_TOKEN);
          res.status(200).json({ authToken: token, name: user.name, id: user._id });
        }else{
    //Create and assign a token to the legged user
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.status(200).json({ authToken: token, name: user.name, id: user._id }); // adding token to the header to the user'
        }
  
  }

export const updateUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);
  
    if (id.length != 24)
      return res.status(400).json({ status: 400, message: "Wrong user Id" });
  
    const result = await User.findById(id);
    if (!result)
      return res.status(404).json({ status: 404, message: "User Not found" });
  
    try {
      const updateUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      console.log("User updated!");
      return res.status(200).json({status: "Success", name: req.body.name, email: req.body.email });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error!" });
    }
  }

  export const deleteUser = async (req, res) => {
    const id = req.params.id;
  
  // if(id !== 24 ) return res.status(400).json({status:"fail", code:400, message: "Invalid Id"})
    const result = await User.findById(id);
    if (!result)
      return res.status(404).json({ status: 404, message: "User not found" });
  
    const userDelete = await result.delete();
  
    if (userDelete)
      return res
        .status(200)
        .json({ status: 200, message: "User successfully deleted" });
  
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }


  export const addUser =  async (req, res) => {
    console.log(req.body);
  
    //VALIDATING THE DATA BEFORE USER CREATED
    const { error } = registerValidation(req.body);
    // console.log(error, !!error);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }
  
    //checking if the user is already in the database
    const emailExist = await User.findOne({
      email: req.body.email,
    });
    if (emailExist)
      return res
        .status(400)
        .json({ status: 400, message: "Email already exists." });
  
    //encrypting password (Hash pswds)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    //Creating a new User
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
  
    //!!saving a user to database
    try {
      const savedUser = await user.save();
      // res.send(savedUser);
      return res.status(201).json({
        status: 201,
        name: user.name,
        email: user.email,
        Id: user._id,
      });
    } catch (error) {
      return res.status(400);
    }
  }