import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const posts = [];

const storage = multer.diskStorage({
    destination:"uploads/",
    filename:(req,file,cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({storage});

app.use("/uploads",express.static("uploads"));


app.post("/create-post",upload.single("image"),async (req,res) => {
    try{
        console.log("File",req.file);
        console.log("Body:",req.body);
        const post = {
            id: posts.length+1,
            image: req.file.filename,
            lat: Number(req.body.lat),
            long: Number(req.body.long)
        };

        posts.push(post);

        res.json({
            success:true,post
        });
    }
    catch(error){
        res.status(500).json({
            error: "Metadata extraction failed"
        });
    }
})

app.get("/community-mode/:index",(req,res) => {
    const index = Number(req.params.index);
    
    if(index >= posts.length){
        return res.json({
            finished:true
        });
    }
    res.json(posts[index]);
})

app.get("/",(req,res) => {
    res.send("Ganpati Bappa Morya");
});


app.listen(3000,() => {
    console.log("Server running on 3000");
});