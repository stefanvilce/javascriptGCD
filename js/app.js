function IsNumeric(input){
    var RE = /^[0-9]+$/;
    var testing = RE.test(input);
    if(testing){
        if(input.indexOf('.') >= 0){
            testing = false;
        }
        if(input.indexOf('-') >= 0){
            testing = false;
        }
        if(input.indexOf(',') >= 0){
            testing = false;
        }
    }
    return testing;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&nbsp;");
}


/**************   PRIME NUMBERS  *********************/
var Prime = {    
    nrprime: [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,57,59,61],        //      Initial array with prime numbers
    divizorul: 1,                                                           //      The divisor of the number which is not prime
    deReturnat: "The message \n",
    isPrim: "Yes",    
    mesajEroare: "<h3>Warning!</h3>The number you entered is not correct. You have entered chars which are not number.",     //the Message in English
    
    verificaNr: function(x){
        //checking if the number x is prime
        var y = Math.sqrt(x);
        var indicatorul = 1;        // The indicator for closing while cycle
        var i = 0;                  // The position inside the array nrprime
        var isPrim = "Yes";
        while(indicatorul > 0){
                if(this.nrprime[i] > y) {
                    indicatorul = 0;     // closing while cycle
                }
                var divizor = this.nrprime[i];
                if(x%divizor === 0){
                    isPrim = "No";
                    this.divizorul = this.nrprime[i];
                    indicatorul = 0;
                }            
                i = i + 1;  // going to the next prime number from array                
        }   //while
        this.isPrim = isPrim;
        return isPrim;
    },
    
    listaNumerePrime: function(){
            // saving the prime numbers in our localStorage List
        var p = 65;       
        if(typeof localStorage.nrprime === 'undefined' || localStorage.nrprime.length < 30){            
                localStorage.clear();                
                this.nrprime.length = 0;
                this.nrprime = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,57,59,61];
                for(var i=1; i<2800001; i++){
                    var t = 2*i;
                    var numarul = p + t;
                    var c = this.verificaNr(numarul);
                    if(c == "Yes"){
                        this.nrprime.push(numarul);
                    }
                }
                this.divizorul = 1;            
                var nPrimeSt = this.nrprime.slice(0).map(Number);                
                localStorage.setItem("nrprime", JSON.stringify(nPrimeSt));
        } else {                
                this.nrprime.length = 0;
                this.nrprime  = JSON.parse(localStorage.getItem("nrprime"));     // copy array of prime numbers
        }
        this.divizorul = 1;        
    },

    verificaNrPrim: function(x){
                    this.listaNumerePrime();
                    this.verificaNr(x);
    },    
    
    afisareRezultateHTML: function(){
            //      Listing the results in HTML
            var x = 1;
            x = document.getElementById("numarul").value;
            document.getElementById("eroare").innerHTML = "";
            document.getElementById("verdictul").innerHTML = "";
            document.getElementById("divizibilprin").innerHTML = "";            
            if(IsNumeric(x)){       //checking if the input is numeric
                    if(x>2){                                                        
                            document.getElementById("numarulMare").innerHTML = numberWithCommas(x);
                            this.verificaNrPrim(x);                            
                            if(this.isPrim == "Yes"){
                                document.getElementById("verdictul").innerHTML = "is a <b>prime number</b>";
                                document.getElementById("divizibilprin").innerHTML = " ";
                            } else {
                                document.getElementById("verdictul").innerHTML = "is <b>NOT</b> a <b>prime number</b>";
                                document.getElementById("divizibilprin").innerHTML = "One of its divisors is " + this.divizorul;
                            }
                    } else {
                            document.getElementById("eroare").innerHTML = "<div class='eroare'>" + this.mesajEroare + "</div>";
                    }
            } else {
                            document.getElementById("eroare").innerHTML = "<div class='eroare'>" + this.mesajEroare + "</div>";
            }
         $(".citesteMaiMult").fadeIn('slow');
         $("#loading").fadeOut('slow');
    },        
};   // Prime class



