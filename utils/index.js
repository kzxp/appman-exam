const _ = require('lodash');

// WARNING: beware object mutable

/**
 * @params {Object} store
 * @params {String} name
 * @params {Object} scores
 * @params {Number} scores{key}
 */
exports.updateStudentScore = (store, { name, scores }) => {
    let subject = null;
    let subinstore = [];
    let getname = [];
    let subscore = [];
    for (let i in scores) {
        subject = Object.keys(scores)
        subscore = [...subscore, scores[i]]
    }
    store.map(store => {
        subinstore = [...subinstore, store.subject]
    })
    subject.map((thissubject) => {

        if (subinstore.indexOf(thissubject) !== -1) {
            store.map(store => {
                if (store.subject === thissubject) {
                    store.students.map((students) => {
                        let thisname = students.name
                        if (thisname.indexOf(name) > -1) {
                            getname = [...getname, name]
                            students.score = subscore[subject.indexOf(thissubject)]
                        } else {
                            if (getname.indexOf(name) == -1) {
                                getname = [...getname, name]
                                store.students = [...store.students, { name: name, score: subscore[subject.indexOf(thissubject)] }]
                            }
                        }
                    })
                    getname = []
                }
            })
        } else {
            store = [...store, { subject: thissubject, students: [{ name: name, score: subscore[subject.indexOf(thissubject)] }] }]
        }
    })

    return store
};

/**
 * @params {Object} store
 * @params {String} name
 * @params {String} subject
 */
exports.removeStudentScoreBySubject = (store, { name, subject }) => {
    store.map(store => {
        if (store.subject === subject) {
            store.students = store.students.filter(students => { if (students.name !== name) { return students } })
        }
    })
    return store
};

/**
 * @params {Object} store
 */
exports.transformData = store => {

    let result = [];
    let name = [];
    let final = [];
    let thisstore = store
    thisstore.map(store => {
        store.students.map((students) => {
            let subject = store.subject
            if (name.indexOf(students.name) == -1) {
                if (subject === 'math') {
                    result = [...result, { name: students.name, math: students.score }]
                } else if (subject === 'science') {
                    result = [...result, { name: students.name, science: students.score }]
                } else if (subject === 'computer') {
                    result = [...result, { name: students.name, computer: students.score }]
                }
                name = [...name, students.name]
            } else {
                result.filter((result, i) => {
                    if (result.name === students.name) {
                        if (subject === 'math') {
                            result.math = students.score
                        } else if (subject === 'science') {
                            result.science = students.score
                        } else if (subject === 'computer') {
                            result.computer = students.score
                        }
                    }
                })
            }
        })
    })

    return result
};
