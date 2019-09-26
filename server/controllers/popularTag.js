const PopularTag = require('../models/PopularTag')
const Question = require('../models/Question')

class PopularTagController {

  static getAll(req, res, next) {
    PopularTag.findById('5d8c88a5a1fbdb4108ed02fa')
      .then(result => {
        res.json({ tags: result })
      })
      .catch(next)
  }


  static create() {

    this.findPopularTag(function(err, data) {
      if(err) {
        console.log(err)
      }else{
        PopularTag.findByIdAndUpdate('5d8c88a5a1fbdb4108ed02fa', {
          $set: {
            tags: data
          }
        }, {
          new: true,
          useFindAndModify: false
        })
        .then(result => {
          console.log(result)
        })
      }
    })
    
  }

  static findPopularTag(cb) {

    Question.find({}, 'tags')
      .then(questions => {

        let tags = []

        for(let i=0;i<questions.length;i++) {
          for(let j=0;j<questions[i].tags.length;j++) {
            tags.push(questions[i].tags[j])
          }
        }

        let result = this.countMe(tags)

        cb(null, result)

        
      })
      .catch(err => {
        cb(err, null)
      })

  }

  static countMe(arr) {
    let map = new Object();
    for (var i = 0; i < arr.length; i++) {
        if (map[arr[i]] != null) {
            map[arr[i]] += 1;
        } else {
            map[arr[i]] = 1;
        }
    }

    let sortedList = {}
    Object.keys(map).sort((a,b) => map[b] - map[a]).forEach((key) => {
      sortedList[key] = map[key]
    })
    
    let tags = Object.keys(sortedList)

    return tags.slice(0, 6)
  }

}


module.exports = PopularTagController
