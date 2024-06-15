const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/TravelTrove");

const AdminSchema= new mongoose.Schema({
    username: String,
    password: String
});

const UsersSchema= new mongoose.Schema({
    username: String,
    password: String,
    purchasedPackage:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TravelPackage"
    }]
});

const TravelPackageSchema= new mongoose.Schema({
    Destination: String,
    Number_of_days: Number,
    Price: String,
    Description: String
});

const Admin=mongoose.model("Admin",AdminSchema);
const User=mongoose.model("User",UsersSchema);
const TravelPackage=mongoose.model("TravelPackage",TravelPackageSchema);

module.exports={
    Admin: Admin,
    User: User,
    TravelPackage: TravelPackage
};