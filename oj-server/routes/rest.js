var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var problemService = require('../services/problemService');

var nodeRestClient = require('node-rest-client').Client;
var restClient = new nodeRestClient();

// get /api/v1/problems
// get /api/v1/problems/2
// post /api/v1/problems
// post /api/v1/build_and_run

EXECUTOR_SERVER_URL = "http://localhost:5000/build_and_run";

// register remote methods
restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');

router.get('/problems', function (req, res) {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

router.get('/problems/:id', function(req, res) {
    var id = req.params.id;
    // '+' transforms id from string to number
    problemService.getProblem(+id)
        .then(problem => res.json(problem));
});

router.post('/problems', jsonParser, function(req, res) {
    problemService.addProblem(req.body)
        .then(problem => {
            res.json(problem);
        },
        error => {
            res.status(400).send('Problem name already exists');
        });
});

router.post('/build_and_run', jsonParser, function(req, res) {
    const userCode = req.body.userCode;
    const lang = req.body.lang;
    console.log('lang: ' + lang + '&&&& userCode: ' + userCode);

    // res.json({'text': 'hello from nodejs hahahaha'});
    restClient.methods.build_and_run(
        {
            data: {
                code: userCode,
                lang: lang
            },
            headers: { 'Content-Type': 'application/json'}
        }, (data, response) => {
            console.log('Received from execution server: ' + data);
            const text = `Build Ouput: ${data['build']}
            Execute ouput: ${data['run']}`;
            data['text'] = text;
            res.json(data);
        }
    );
});

module.exports = router;