const bookMyShow = require('../modales/bookMyShow');
const path = require('path');
const fs = require('fs');
const reviews = require('../modales/reviews');


module.exports.home = (req, res) => {
     let searchData = '';
    res.render('addMovie',{
         search: searchData 
    })
}
module.exports.sendData = async (req, res) => {
  


    req.body.movieTami = `${req.body.hour}h ${req.body.Minute}m` ;
    req.body.movieImage = bookMyShow.imgPath + "/" + req.file.filename;
    await bookMyShow.create(req.body);
    res.redirect('/')
}

module.exports.viewsShow = async (req, res) => {
   
    
         let searchData = '';
  if (req.query.search) {
    searchData = await req.query.search;
  }
   let par_page = 2;
  let page = 0;

  if (req.query.page) {
    page = req.query.page;
  }

  let movie = await bookMyShow.find({
    $or: [
      { movieName: { $regex: searchData } },
      { movieType: { $regex: searchData } },
      { movieGenre: { $regex: searchData } }
    ]
  }).skip(par_page * page).limit(par_page)
//   .populate("Id").exec();

  let totalData = await bookMyShow.find({
    $or: [
      { movieName: { $regex: searchData } },
      { movieType: { $regex: searchData } },
      { movieGenre: { $regex: searchData } }
    ]
  }).countDocuments();


  let totalPage = Math.ceil(totalData / par_page);
  

    res.render('views-Show', {
        movie,
        totalPage,
        page,
        search: searchData
    })
}

module.exports.bookings = async (req, res) => {
    let movie = await bookMyShow.findById(req.query.id);
     let searchData = '';
    
    res.render('bookings', {
        movie,
         search: searchData
    })
}

module.exports.reviewsCommit = async (req, res)=>{
   try {
        console.log(req.body);
        
        const review = await reviews.create(req.body);
        res.redirect('bookings',{
            review
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}