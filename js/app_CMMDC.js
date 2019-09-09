//The class of decomposing in prime factors
var CMMDC = {
    
    nr1: 1,                 //      First number
    nr2: 1,                 //      The second number
    factori1: [1],          //      The factors of first number
    puteri1: [0],           //      The powers of first number
    factori2: [1],          //      The factors of the second number
    puteri2: [0],           //      The powers of the second number
    factori: [1],           //      The common factors
    puteri:  [0],           //      Teh common powers
    mesajEroare: "<div class='eroare'><h3>Warning!<h3>ou have entered chars which are not digits.</div>",    
    
    initializare: function(){
            // We get the numbers from HTML form
            this.nr1 = document.getElementById('nr1').value;
            this.nr2 = document.getElementById('nr2').value;
    },

    reinitializare: function(){
                this.factori.length = 0;
                this.factori = [1];
                this.puteri.length = 0;
                this.puteri =  [0];
                this.factori1.length = 0;
                this.factori1 = [1];
                this.puteri1.length = 0;
                this.puteri1 =  [0];
                this.factori2.length = 0;
                this.factori2 = [1];
                this.puteri2.length = 0;
                this.puteri2 =  [0];
                document.getElementById("eroare").innerHTML = "";
                $("#loading").hide();
                $(".rezolvare").hide();
                $(".explicatii").hide();
    },
    
    verifica: function(nr){
            // checking insert data
            var test = false;
            if(IsNumeric(nr)){
                test = true;
            } else {
                test = false;
                document.getElementById("eroare").innerHTML = this.mesajEroare;
            }
        return test;
    },
    
    descompune: function(){
            //decomposing in prime factors
            DescFactori.reinitializareDescFactori();
            DescFactori.gasesteDivizorii(this.nr1);
            var i;
            this.factori1 = DescFactori.factori.slice();
            this.puteri1 = DescFactori.puteri.slice();
            //for second number
            DescFactori.reinitializareDescFactori();
            DescFactori.gasesteDivizorii(this.nr2);
            this.factori2 = DescFactori.factori.slice();
            this.puteri2 = DescFactori.puteri.slice();
    },
    
    genereaza: function(){
            this.descompune();
            var factori1 = this.factori1.map(Number);
            var factori2 = this.factori2.map(Number);
            var puteri1 = this.puteri1.map(Number);
            var puteri2 = this.puteri2.map(Number);        
            var i;
            for(i = 1; i< factori1.length; i++){
                if(factori1[i] > 1){
                    var x = factori1[i];
                    var m = puteri1[i];
                    var j = factori2.indexOf(x);
                    if(j>0){
                        this.factori.push(x);
                        var n = puteri2[j];
                        if(m > n){
                            this.puteri.push(n);
                        } else {
                            this.puteri.push(m);
                        }                        
                    }
                }
            }
    },
    
    afisare: function(){
            // this function lists the results on HTML
            document.getElementById('cel_nr1').innerHTML = this.nr1;
            document.getElementById('cel_nr2').innerHTML = this.nr2;
            document.getElementById('cel_desc1').innerHTML = this.afisareDesc(1);
            document.getElementById('cel_desc2').innerHTML = this.afisareDesc(2);
            var cmmmdc = [];
            cmmdc = this.afisareCMMDC();
            document.getElementById('cel_rezultat').innerHTML = cmmdc[0];
            document.getElementById('cel_rezultatfinal').innerHTML = cmmdc[1];
    },
        
    afisareDesc: function(nr){
            var fact;
            var putere;
            var sir = "<span class='unu'>1</span>";
            if(nr == 1) {
                fact = this.factori1.map(Number);
                putere = this.puteri1.map(Number);
            } else {
                fact = this.factori2.map(Number);
                putere = this.puteri2.map(Number);
            }
            var factori = this.factori.map(Number);
            var puteri = this.puteri.map(Number);
            var i;
            for(i = 1; i < fact.length; i++){
                if(fact[i] > 1){
                    var j = factori.indexOf(fact[i]);
                    sir = sir + " &middot;";    // multiplying sign
                    if(j >= 0) { 
                        sir = sir + "<span class='rosu'> " + fact[i] + "</span>"; 
                        if(putere[i] == puteri[j]){
                            sir = sir + "<span class='rosu'><sup>" + putere[i] + "</sup></span>";
                        } else {
                            sir = sir + "<span><sup>" + putere[i] + "</sup></span>";
                        }
                    } else {
                        sir = sir + " " + fact[i] + "<sup>" + putere[i] + "</sup>" ;
                    }
                }
            }
            return sir;
    },
        
    afisareCMMDC: function(){            
            var i;
            var t = "<span class='unu'>1</span>";
            var v = 1;
            var x = [];
            for(i = 1; i<this.factori.length; i++){
                t = t + " &middot; ";
                t = t + "<span class='rosu'>" + this.factori[i] + "<sup>" + this.puteri[i] + "</sup>" + "</span>";                
                v = v * Math.pow(this.factori[i], this.puteri[i]);
            }
            x.push(t);
            x.push(v);
            return x;
    },    
    
    afisareExplicatii: function(){
            $(".rosu").addClass('r');
            $(".explicatii").fadeIn('slow');
    },    
    
    returneaza: function(){
            this.reinitializare();
            this.initializare();            
            $("#loading").fadeIn('slow');        
            var test = this.verifica(this.nr1);
            var test2 = this.verifica(this.nr2);            
            if(test && test2){
                $("#loading").fadeOut('slow');                
                this.genereaza();
                this.afisare();                
                $(".rezolvare").delay(900).fadeIn('slow');                
            } else {
                alert('Error!');
            }
    }
};       // CMMDC class