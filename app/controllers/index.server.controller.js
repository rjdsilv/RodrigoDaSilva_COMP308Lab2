exports.render = (request, response) => {
    const email = request.body.email;
    const session = request.session;

    session.email = email ? email : '';
    console.log('In index.ejs got: ' + email);

    if (session.email) {
        response.redirect('/feedback');
    } else {
        response.render('index');
    }
}