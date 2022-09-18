const router = require('express').Router();

//const { default: updatePackage } = require('../../frontend/src/components/UpdatePackage');
let Package = require('../models/packageModel');

//adding new package
router.route('/').get((req, res) => {
    Package.find()
        .then(Package => res.json(Package))
        .catch(err => res.status(400).json(': '+ err));
});
router.route('/add').post((req, res) => {
    
    const Type = req.body.Type;
    const Capacity = Number(req.body.Capacity);
    const Cost = Number(req.body.Cost);
    const Time = req.body.Time; 
  
    const newPackage = new Package({
      
      Type,
      Capacity,
      Cost,
      Time,
    });
    newPackage.save()
    .then(() => res.json('package added !'))
    .catch (err => res.status(400).json('Error: ' + err))
});

  //getting package

router.route("/view").get((req,res)=>{

  Package.find().then((packages)=>{

      res.json(packages)

  }).catch(()=>{
      console.log(err)
  })

})

     // delete package

router.route('/delete/:id').delete((req, res) => {
  Package.findByIdAndDelete(req.params.id)
    .then(() => res.json('driver deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update package

router.route('/update/:id').post((req, res) => {
  Package.findById(req.params.id)
    .then(Package => {
      Package.Type = req.body.Type;
      Package.Capacity = req.body.Capacity;
      Cost =Number(req.body.Cost) ;
    Package.Time = req.body.Time

      Package.save()
        .then(() => res.json('Package updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;