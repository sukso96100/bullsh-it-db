var userip;

function searchBullshIT(){
    if (event.keyCode == 13){
        var input = document.getElementById("findnum").value;
        console.log(input)
    var BullshITBankDB = Parse.Object.extend("BullshITBankDB");
    var query = new BullshITBankDB();
            query.equalTo("phone", input);
            query.find({
              success: function(results) {
                for (var i = 0; i < results.length; i++) {
                  var object = results[i];
                  var phone = object.get('phone');
                  
                }
              },
                error: function(error) {
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
    }
}

function addBullshIT(){
    if (event.keyCode == 13){
        var input = document.getElementById("newnum").value;
        console.log(input)
         console.log(userip)
        var BullshITBankDB = Parse.Object.extend("BullshITBankDB");
        var bullshITBankDB = new BullshITBankDB();
        bullshITBankDB.set("phone",parseInt(input))
        bullshITBankDB.set("submitterip",userip)
        bullshITBankDB.save();
        }
}

function addTestData(){
    console.log(userip)
    var BullshITBankDB = Parse.Object.extend("BullshITBankDB");
    var bullshITBankDB = new BullshITBankDB();
    bullshITBankDB.save({
        phone: 01012345678,
        submitterip: userip
    }).then(function(object) {
      alert("yay! it worked");
    });
}