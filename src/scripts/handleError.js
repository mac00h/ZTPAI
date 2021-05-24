var handleError = function (err) {
    console.warn(err);
    return new Response(JSON.stringify({
        code: 400,
        message: 'Stupid network Error'
    }));
};

export default handleError;