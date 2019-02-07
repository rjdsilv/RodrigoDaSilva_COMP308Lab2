exports.render = (request, response) => {
    const session = request.session;

    if (request.method === 'GET') {
        // When it's a GET we render the feedback page getting the e-mail from the session.
        const email = session.email ? session.email : '';
        response.render('feedback', { email: email });
    } else if (request.method === 'POST') {
        // When it's a post, we redirect to the thankyou page, passing the filled first name.
        session.firstName = request.body.firstName;
        response.redirect('/thankyou');
    }
}