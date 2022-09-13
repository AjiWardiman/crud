const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {user} = require('../models')

exports.register = async (req, res, next) => {
    try {
        const {firstName, lastName, username, email, password} = req.body
        // console.log(req.body)
        
        // if (firstName || lastName || username || email || password === "") {
        //     return res.status(200).send({
        //         message: 'field should not be empty'
        //     })
        // }  		
        
        const hashedPassword = bcrypt.hashSync(password, 8) 

        let insertUser = await user.create({ 			
            firstName: firstName, 			
            lastName: lastName, 			
            username: username, 			
            email: email, 			
            password: hashedPassword 		
        })	
        //console.log(regis)
        // const token = jwt.sign({
		// 	id: regis[0]
		// }, process.env.JWT_KEY, {expiresIn: 86400})

		return res.status(200).send({
            message: 'register success',
            data: insertUser
			// token: token
		})

        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: error.error,
            code: 500
        })
    }
}
    exports.readAll = async (req, res, next) => {
        try {
            const data = await user.findAll()

            return res.status(200).send({
                message: 'retrieve data success',
                data: data
                // token: token
            })

        } catch (error) {
        
        return res.status(500).send({
            message: error.error,
            code: 500
        })
    }
        
}
exports.readme = async (req, res, next) => {
    try {
        const id = req.params.id
        console.log(id)
        const data = await user.findOne({
            where: {id: id}
        })
    if(!data){
        return res.status(404).send({
            message: 'data not found'
        })
    }

    return res.status(200).send({
        message: 'retrieve data success',
        data: data
    })

    } catch (error) {
        return res.status(500).send({
            message: error,
            code: 500
        })
    }
        
}
exports.update = async (req, res, next) => {
    try {
        const id = req.params.id
        const {firstName, lastName, username, email, password} = req.body
        console.log(req.body)

        const updateData = await user.update({
            firstName: firstName,
            lastName: lastName,
            email: email
        }, {where: {id: id}})

      console.log(updateData)
      res.status(201).send({
        message: 'data updated',
        result: updateData
      })    
    } catch (error) {
        return res.status(500).send({
            message: error,
            code: 500
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        const id = res.params.id
        //console.log(id)

        const dataUser = await user.findOne({
            where: {id:id}
        })

        if(!dataUser){
            return res.status(404).send({
                message: 'data not found, cannot delete data user',
                data: deletedUser
            })
        }

        const deletedUser = await user.destroy({
            where: {id: id}
        })
      return res.status(200).send({
        message: 'data has been deleted'
      })
    } catch (error) {
        return res.status(500).send({
            message: error,
            code: 500
        })     
    }
}