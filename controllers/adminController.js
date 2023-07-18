import Admin from "../models/Admin.js";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";
import emailRegister from "../helpers/emailRegister.js";
import emailForgotPassword from "../helpers/emailForgotPassword.js";

const register = async (req, res) => {
    const { email, name, lastName } = req.body;
    const emailExists = await Admin.findOne({ email });
    
    if (emailExists) {
        const error = new Error("Correo ya registrado");
        return res.status(400).json({ msg: error.message });
    }

    try {
        const admin = new Admin(req.body);
        const adminSaved = await admin.save();

        emailRegister({
            email,
            name,
            lastName,
            token: adminSaved.token,
        });

        return res.json(adminSaved);// puse return
    } catch (error) {
        return res.status(500).json(`error: ${error.message}`);// puse return
    }
};

const profile = (req, res) => {
    try {
        const { admin } = req;
        return res.json(admin);// puse admin sin {}
    } catch (error) {
        return res.status(500).json(`error: ${error.message}`);// puse return
    }
}

const confirm = async (req, res) => {
    const { token } = req.params
    const confirmUser = await Admin.findOne({ token });

    if (!confirmUser) {
        const error = new Error("Token no valido");
        return res.status(400).json({ msg: error.message });
    }

    try {
        confirmUser.token = null;
        confirmUser.confirmed = true;
        await confirmUser.save();
        return res.json({msg: "Usuario confirmado correctamente"});// puse return
    } catch (error) {
        return res.status(500).json(`error: ${error.message}`);// puse return
    }
};

const authenticate = async (req, res) => {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });

    if (!user) {
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: error.message });
    }

    if (!user.confirmed) {
        const error = new Error("El usuario no ha sido confirmado");
        return res.status(401).json({ msg: error.message });
    }

    
    if (await user.comparePassword(password)) {
        return res.json({
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            token: generateJWT(user.id),
        });// puse return
    } else {
        const errorPassword = new Error("El password es incorrecto");
        return res.status(401).json({ msg: errorPassword.message });
    }        
}

const passwordChange = async (req, res) => {
    const { email, name, lastName  } = req.body;
    const emailExists = await Admin.findOne({ email });
    
    if (!emailExists) {
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: error.message });
    }

    try {
        emailExists.token = generateId(emailExists.id);
        await emailExists.save();

        emailForgotPassword({
            email,
            name,
            lastName,
            token: emailExists.token,
        })

        return res.json({msg: "Se ha enviado un email con las instrucciones para cambiar el password"});// puse return
    } catch (error) {
        return res.status(500).json(`error: ${error.message}`);// puse return
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params;
    const tokenExists = await Admin.findOne({ token });
    if (tokenExists) {
        return res.json({msg: "Token valido"});//puse return
    } else {
        const error = new Error("Token no valido");
        return res.status(400).json({ msg: error.message });
    }
}

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const admin = await Admin.findOne({ token });
    if (!admin) {
        const error = new Error("Token no valido");
        return res.status(400).json({ msg: error.message });
    }

    try {
        admin.token = null;
        admin.password = password;
        await admin.save();
        return res.json({msg: "Contraseña cambiada correctamente"});// puse return
    } catch (error) {
        return res.status(500).json(`error: ${error.message}`);// puse return
    }
}

const updateProfile = async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
        const error = new Error("No existe el usuario");
        return res.status(400).json({ msg: error.message });
    }
    const { email } = req.body;
    if (admin.email !== req.body.email) {
        const emailExists = await Admin.findOne({ email });
        if (emailExists) {
            const error = new Error("El correo ya esta registrado");
            return res.status(400).json({ msg: error.message });
        } 
    } 
    try {
        admin.name = req.body.name;
        admin.lastName = req.body.lastName;
        admin.email = req.body.email;
        const updateAdmin = await admin.save();
        res.json(updateAdmin);
    } catch (error) {
        console.log(error);
    }
}

const updateAdminPassword = async (req, res) => {
    const { id } = req.admin;
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(id);
    if (!admin) {
        const error = new Error("No existe el usuario");
        return res.status(400).json({ msg: error.message });
    }

    if (await admin.comparePassword(currentPassword)) {
        admin.password = newPassword;
        await admin.save(); 
        res.json({msg: "Contraseña cambiada correctamente"});
    }else {
        const error = new Error("La contraseña actual es incorrecta");
        return res.status(400).json({ msg: error.message });
    }
}

export {
    register,
    profile,
    confirm,
    authenticate,
    passwordChange,
    checkToken,
    newPassword,
    updateProfile,
    updateAdminPassword
};