const {rv_res} = require('express-validator');

const privacy = require('bcrypt');

const jot = require('jsonwebtoken');

const Client = require('../model/client');

const my_configure = require('../configure');




exports.signup = async (request, response) => {
  const wrong = rv_res(request);

  if (!wrong.isEmpty()) {


    return response.status(400).json({ msg: wrong.array() });

  }



  const { Email, Password } = request.body;

  try {


    const avail_client = await Client.findOne({ Email });


    if (avail_client) {


      return response.status(400).json({ msg: 'client already available' });


    }

    const my_hashing = await privacy.hash(Password, 12);



    const new_Client = new User({ Email, Password: my_hashing });


    await new_Client.save();


    response.status(201).json({ msg: 'Signup completed' });


  } 
  
  
  catch (er) {


    console.log('Error occurs:', er);


    response.status(500).json({ msg: 'error' });


  }


};




exports.login = async (request, response) => {



  const { Email, Password } = request.body;



  try {


    const client = await Client.findOne({ Email });

    if (!client) {


      return response.status(401).json({ msg: 'Invalid credentials' });


    }

    const check_combination = await privacy.compare(Password, client.Password);


    if (!check_combination) {

      return response.status(401).json({ msg: 'Invalid credentials' });

    }

    const my_token = jot.sign({ client_id: client._id }, my_configure.JWT_SECRET, { expiresIn: '2h' });



    response.status(200).json({ msg: 'Login completed', my_token });



  } 
  
  
  
  catch (er) {


    console.log('Error logging in:', er);


    response.status(500).json({ msg: 'error' });



  }


  
};