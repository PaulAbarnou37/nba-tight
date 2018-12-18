$( document ).ready(function() {


  // Get Dates between start and end date
  function getDates(startDate, endDate) {
      var dates = [],
          currentDate = startDate,
          addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
          };
      while (currentDate <= endDate) {
        dates.push(moment(currentDate).format("MM.DD.YYYY"));
        currentDate = addDays.call(currentDate, 1);
      }
      return dates;
  };


  let todaysDate = new Date(Date.now())
  let sevenDaysBefore = new Date(Date.now());
  sevenDaysBefore.setDate(sevenDaysBefore.getDate() - 7);
  let allDates = getDates(sevenDaysBefore, todaysDate)

  Promise.all(
    allDates.map(oneDate => {
      return axios.get(`https://stats.nba.com/stats/scoreboard/?GameDate=${oneDate}&LeagueID=00&DayOffset=0`)
    })
   ).then(response => {
     
    let allStats = response.map(oneDay => {
      return oneDay.data.resultSets[1].rowSet
    });


    let day7 = allStats[0]
    let day6 = allStats[1]
    let day5 = allStats[2]
    let day4 = allStats[3]
    let day3 = allStats[4]
    let day2 = allStats[5]
    let day1 = allStats[6]

    let games7 = []
    let games6 = []
    let games5 = []
    let games4 = []
    let games3 = []
    let games2 = []
    let games1 = []

    for (var i = 0 ; i < (day1.length)/2 ; i+=2){
      let differencePoints = day1[i][21] - day1[i+1][21];
      console.log(differencePoints)
      if ( -5 < differencePoints && differencePoints < 5 ){
        tightOrNot = "Very Tight"
      } else if ( -12 < differencePoints && differencePoints < 12 ){ 
        tightOrNot = "Quite Tight"
      } else { 
        tightOrNot = "Not Tight"
      }
        games1.push({ teamA: day1[i][5], teamB : day1[i+1][5], score: tightOrNot, realScore: `${day1[i][21]} - ${day1[i+1][21]}`  })
    }


    for (var i = 0 ; i < (day2.length)/2 ; i+=2){
      let differencePoints = day2[i][21] - day2[i+1][21];
      if ( -5 < differencePoints && differencePoints < 5 ){
        tightOrNot = "Very Tight"
      } else if ( -12 < differencePoints && differencePoints < 12 ){ 
        tightOrNot = "Quite Tight"
      } else { 
        tightOrNot = "Not Tight"
      }
        games2.push({ teamA: day2[i][5], teamB : day2[i+1][5], score: tightOrNot, realScore: `${day2[i][21]} - ${day2[i+1][21]}` })
    }

    for (var i = 0 ; i < (day3.length)/2 ; i+=2){
      let differencePoints = day3[i][21] - day3[i+1][21];
      if ( -5 < differencePoints && differencePoints < 5 ){
        tightOrNot = "Very Tight"
      } else if ( -12 < differencePoints && differencePoints < 12 ){ 
        tightOrNot = "Quite Tight"
      } else { 
        tightOrNot = "Not Tight"
      }
        games3.push({ teamA: day3[i][5], teamB : day3[i+1][5], score: tightOrNot, realScore: `${day3[i][21]} - ${day3[i+1][21]}` })
    }

    for (var i = 0 ; i < (day4.length)/2 ; i+=2){
      let differencePoints = day4[i][21] - day4[i+1][21];
      if ( -5 < differencePoints && differencePoints < 5 ){
        tightOrNot = "Very Tight"
      } else if ( -12 < differencePoints && differencePoints < 12 ){ 
        tightOrNot = "Quite Tight"
      } else { 
        tightOrNot = "Not Tight"
      }
        games4.push({ teamA: day4[i][5], teamB : day4[i+1][5], score: tightOrNot, realScore: `${day4[i][21]} - ${day4[i+1][21]}` })
    }

    for (var i = 0 ; i < (day5.length)/2 ; i+=2){
      let differencePoints = day5[i][21] - day5[i+1][21];
      if ( -5 < differencePoints && differencePoints < 5 ){
        tightOrNot = "Very Tight"
      } else if ( -12 < differencePoints && differencePoints < 12 ){ 
        tightOrNot = "Quite Tight"
      } else { 
        tightOrNot = "Not Tight"
      }
        games5.push({ teamA: day5[i][5], teamB : day5[i+1][5], score: tightOrNot, realScore: `${day5[i][21]} - ${day5[i+1][21]}` })
    }

    for (var i = 0 ; i < (day6.length)/2 ; i+=2){
      let differencePoints = day6[i][21] - day6[i+1][21];
      if ( -5 < differencePoints && differencePoints < 5 ){
        tightOrNot = "Very Tight"
      } else if ( -12 < differencePoints && differencePoints < 12 ){ 
        tightOrNot = "Quite Tight"
      } else { 
        tightOrNot = "Not Tight"
      }
        games6.push({ teamA: day6[i][5], teamB : day6[i+1][5], score: tightOrNot, realScore: `${day6[i][21]} - ${day6[i+1][21]}`  })
    }


    for (var i = 0 ; i < (day7.length)/2 ; i+=2){
      let differencePoints = day7[i][21] - day7[i+1][21];
      if ( -5 < differencePoints && differencePoints < 5 ){
        tightOrNot = "Very Tight"
      } else if ( -12 < differencePoints && differencePoints < 12 ){ 
        tightOrNot = "Quite Tight"
      } else { 
        tightOrNot = "Not Tight"
      }
        games7.push({ teamA: day7[i][5], teamB : day7[i+1][5], score: tightOrNot, realScore: `${day7[i][21]} - ${day7[i+1][21]}` })
    }

    games1.map(oneDay => {
      let newGame = document.createElement('tr');
      newGame.innerHTML = ` <tr>
                              <td>${oneDay.teamA}</td>
                              <td><span class="tag">${oneDay.score}</span></td> 
                              <td>${oneDay.teamB}</td>
                              <td><span class="see-results">See Results</span> <span class="real-score">${oneDay.realScore}</span></td>
                            </tr>`;
    let table = $(".one");
    table.append(newGame);
    })

    games2.map(oneDay => {
      let newGame = document.createElement('tr');
      newGame.innerHTML = ` <tr>
                              <td>${oneDay.teamA}</td>
                              <td><span class="tag">${oneDay.score}</span></td> 
                              <td>${oneDay.teamB}</td>
                              <td><span class="see-results">See Results</span> <span class="real-score">${oneDay.realScore}</span></td>
                            </tr>`;
    let table = $(".two");
    table.append(newGame);
    })

    games3.map(oneDay => {
      let newGame = document.createElement('tr');
      newGame.innerHTML = ` <tr>
                              <td>${oneDay.teamA}</td>
                              <td><span class="tag">${oneDay.score}</span></td> 
                              <td>${oneDay.teamB}</td>
                              <td><span class="see-results">See Results</span> <span class="real-score">${oneDay.realScore}</span></td>
                            </tr>`;
    let table = $(".three");
    table.append(newGame);
    })

    games4.map(oneDay => {
      let newGame = document.createElement('tr');
      newGame.innerHTML = ` <tr>
                              <td>${oneDay.teamA}</td>
                              <td><span class="tag">${oneDay.score}</span></td> 
                              <td>${oneDay.teamB}</td>
                              <td><span class="see-results">See Results</span> <span class="real-score">${oneDay.realScore}</span></td>
                            </tr>`;
    let table = $(".four");
    table.append(newGame);
    })

    games5.map(oneDay => {
      let newGame = document.createElement('tr');
      newGame.innerHTML = ` <tr>
                              <td>${oneDay.teamA}</td>
                              <td><span class="tag">${oneDay.score}</span></td> 
                              <td>${oneDay.teamB}</td>
                              <td><span class="see-results">See Results</span> <span class="real-score">${oneDay.realScore}</span></td>
                            </tr>`;
    let table = $(".five");
    table.append(newGame);
    })

    games6.map(oneDay => {
      let newGame = document.createElement('tr');
      newGame.innerHTML = ` <tr>
                              <td>${oneDay.teamA}</td>
                              <td><span class="tag">${oneDay.score}</span></td> 
                              <td>${oneDay.teamB}</td>
                              <td><span class="see-results">See Results</span> <span class="real-score">${oneDay.realScore}</span></td>
                            </tr>`;
    let table = $(".six");
    table.append(newGame);
    })

    games7.map(oneDay => {
      let newGame = document.createElement('tr');
      newGame.innerHTML = ` <tr>
                              <td>${oneDay.teamA}</td>
                              <td><span class="tag">${oneDay.score}</span></td> 
                              <td>${oneDay.teamB}</td>
                              <td><span class="see-results">See Results</span> <span class="real-score">${oneDay.realScore}</span></td>
                            </tr>`;
    let table = $(".seven");
    table.append(newGame);
    })

    let tag = $(".tag"); 
      // Tight Tag Color
  $.each(tag, (index, oneTag)=> {
    console.log($(oneTag).html())
    if ($(oneTag).html() == "Not Tight"){
      $(oneTag).addClass("is-white")
    } else if ($(oneTag).html() == "Quite Tight"){
      $(oneTag).addClass("is-light")
    } else {$(oneTag).addClass("is-black")}
  });

  console.log($(".see-results"))
  // See result link
  $(".see-results").each((index, oneBlah)=> {
    $(oneBlah).on("click", function(){
      $(this).hide();
      let realScore = $(".real-score")
      let score = realScore[index];
      $(score).show();
    })
  })

    let date = $(".date"); 
    $(date).each((index, oneBlah)=> {
      oneBlah.innerHTML = allDates[7-index]
    });


    
   })
  
    

    
  

 

    
  //   res.locals.game1 = games1
  //   res.locals.game2 = games2
  //   res.locals.game3 = games3
  //   res.locals.game4 = games4
  //   res.locals.game5 = games5
  //   res.locals.game6 = games6
  //   res.locals.game7 = games7

  //   let date1 = moment(todaysDate)
  //   let date2 = moment(todaysDate).subtract(1, "days")
  //   let date3 = moment(todaysDate).subtract(2, "days")
  //   let date4 = moment(todaysDate).subtract(3, "days")
  //   let date5 = moment(todaysDate).subtract(4, "days")
  //   let date6 = moment(todaysDate).subtract(5, "days")
  //   let date7 = moment(todaysDate).subtract(6, "days")

  //   res.locals.date1 = date1.format("DD MMM YYYY")
  //   res.locals.date2 = date2.format("DD MMM YYYY")
  //   res.locals.date3 = date3.format("DD MMM YYYY")
  //   res.locals.date4 = date4.format("DD MMM YYYY")
  //   res.locals.date5 = date5.format("DD MMM YYYY")
  //   res.locals.date6 = date6.format("DD MMM YYYY")
  //   res.locals.date7 = date7.format("DD MMM YYYY")


});
// });
