exports.render = (request, response) => {
    const firstName = request.session.firstName ? request.session.firstName : '';
    response.render('thankyou', { firstName: firstName });
}