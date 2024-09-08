const express=require('express');
var methodOverride = require('method-override')
const app=express();    
const port=8080;
const path=require('path');
const { v4: uuidv4 } = require('uuid');
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'))

let posts=[
{
    id:uuidv4(),
username:"Saad",
content:"Sust Insan hai"
},{
    id:uuidv4(),
username:"Waheed",
content:"iske baal uper se urre hoe hain"
},{
    id:uuidv4(),
username:"Ateeb",
content:"Uper ke leye mafi chahiye"
}
];

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("newPost.ejs");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find(p=>p.id===id);
    res.render("show.ejs",{post});
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find(p=>p.id===id);
    res.render("edit.ejs",{post});
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find(p=>p.id===id);
    post.content=newContent;
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter(p=>p.id!==id);
    res.redirect("/posts");
});