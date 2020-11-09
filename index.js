const express = require('express')
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const stripe = require('stripe')('pk_test_51Hkj56A2bWvJWEsXlhYHWU09EFS1q9l27ca0zMnPIBlcNCs5DLdMEusmZ9Q9V5K64VuCE09slaU0LsBP9eRr2EoQ00fZ3zv1QK');
const app = express();



app.get('/', (req, res) => {
  res.render('stripeForm', {title:'Stripe Form Title'});
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});

// have res.render work with html files
 app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so

app.use(express.static(__dirname))
app.use(bodyParser());

app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

const router = express.Router();

app.use('/', router)

router.get('/stripe-form', function (req,res,next) {
  	res.render('stripeForm', {title:'Stripe Form Title'});
})

router.post('/stripe-information', function (req, res, next) {
  console.log('stripe information received: ', req.body);

  stripe.customers.create({
    description: 'My new customer',
    source: req.body.stripeToken,
  }, function(err, customer) {
    console.log('err: ', err, '|customer: ', customer)
    if (err) {
      res.json(err)
      return
    }
    res.json(customer)
    return
  })
})
