const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

exports.createAdmin = async (req, res) => {
    // console.log(req.body);
    try {
        // let addedAdmin = await Admin.create(req.body);
        //  Autre methode pour inserer
        let { isOnLine, isAdmin, password } = req.body;
        let newUAdmin = new Admin({ isOnLine, isAdmin, password });
        let addedAdmin = await newUAdmin.save();
        res.status(201).json({ message: "Inscription avec success", addedAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAdmin = async (req, res) => {
    try {
        let admin = await Admin.find();
        res.status(200).json({admin : admin._id});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOneAdmin = async (req, res) => {
    try {
        let { id } = req.params;
        let admin = await Admin.findById(id);
        if (admin) {
            res.status(200).json(admin);
          } else {
            res.status(400).json({ message: "Cet admin n'existe pas !" });
          }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginAdmin = async (req, res) => {
    // console.log('body is=============', req.body);
    try {
        let {password}  = req.body;
        // console.log('password is ============', password);
        // let admin = await Admin.findOne({ email: email }); // On peut aussi utiliser [await User.find().where("email").equals(email)]
        // console.log(user);
        let admin = await Admin.findOne({ _id: "6246165c126f74b59f392314" }); 
        // let admin2 = await Admin.find()[0]; 
        let isMatch = await bcrypt.compare(password, admin.password);
        // console.log('isMatch is : ', isMatch); 
        if (isMatch) {
            res.status(200).json({ message: "Connexion reussi", admin });
        } else {
            res.status(404).json({ message: "Vous n'etes pas Admin !!" })
        }
        // if (admin) {
        //     let isPasswordMatch = await bcrypt.compare(password, admin.password);
        //     if (isPasswordMatch) {
        //         let token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: '4h' });
        //         let decoded = jwt.decode(token)
        //         res.status(200).json({ message: "Connexion reussi", token, decoded });
        //     } else {
        //         res.status(404).json({ message: "Le mot de pase est incorrect !!" })
        //     }
        // } else {
        //     res.status(404).json({ message: "Utilisateur avec cet email n'existe pas !!" })
        // }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        let { id } = req.params;
        let { isOnLine } = req.body;
        // console.log(isOnLine);
        let user = await Admin.findByIdAndUpdate(id, { $set: { isOnLine } }, { new: true });

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
      let { id: adminId } = req.params;
    //   console.log(req.params);
      let adminToDelete = await Admin.findById(adminId);
      if (adminToDelete) {
        await Admin.findByIdAndDelete(adminId);
        res.status(200).json({ message: `${adminToDelete._id} : a bien ete supprimee` })
      } else {
        res.status(400).json({ message: "Cet admin n'esxiste pas !" })
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }