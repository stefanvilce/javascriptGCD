//The class of decomposing in prime factors
var CMMMC = {
    nr1: 1,                 //      First number
    nr2: 1,                 //      The second number
    factori1: [1],          //      The factors of first number
    puteri1: [0],           //      The powers of first number
    factori2: [1],          //      The factors of the second number
    puteri2: [0],           //      The powers of the second number
    factori: [1],           //      The final factors
    puteri:  [0],           //      The final powers
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
            DescFactori.reinitializareDescFactori();
            DescFactori.gasesteDivizorii(this.nr1);                      
            this.factori1 = DescFactori.factori.slice();
            this.puteri1 = DescFactori.puteri.slice();
            // and for the second number
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
            var factori = []; factori[0] = 1;
            var puteri = []; puteri[0] = 0;        
            var i;
            for(i = 1; i < factori1.length; i++){
                if(factori1[i] > 1){
                    var x = factori1[i];
                    factori.push(x);
                }
            }
            for(i=1; i<factori2.length; i++){
                if(factori2[i] > 1){
                    var x = factori2[i];
                    var j = factori.indexOf(x);
                    if(j<0){
                        factori.push(x);
                    }
                }
            }
            factori.sort();
            for(i = 1; i<factori.length; i++){
                var x = factori[i];
                var j = factori1.indexOf(x);
                var k = factori2.indexOf(x);
                var p = 0;
                var q = 0;                
                if(j>0) p = puteri1[j];
                if(k>0) q = puteri2[k];                
                if(j > 0 && k < 0){
                    puteri.push(p);
                }                
                if(j < 0 && k>0){
                    puteri.push(q);
                }                
                if(j>0 && k>0){
                    if(p > q){
                        puteri.push(p);
                    } else {
                        puteri.push(q);
                    }
                }
            }
            this.factori = factori.slice();
            this.puteri = puteri.slice();
    },
    
    afisare: function(){
            // listing on HTML
            document.getElementById('cel_nr1').innerHTML = this.nr1;
            document.getElementById('cel_nr2').innerHTML = this.nr2;
            document.getElementById('cel_desc1').innerHTML = this.afisareDesc(1);
            document.getElementById('cel_desc2').innerHTML = this.afisareDesc(2);
            var cmmmdc = [];
            cmmdc = this.afisareCMMMC();
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
                    sir = sir + " &middot;";
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
    
    afisareCMMMC: function(){
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
                alert('Error!!!!');
            }
    }
};       // CMMDC class