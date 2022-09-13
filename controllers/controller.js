exports.helloWorld = (req, res, next) => {
    res.send('<h1>Halo Dunia!</h1>');
};

exports.sayHi = (req, res, next) => {
    res.send({
        message:'Halo kamu disana',
        status: 'ok'
    })
}