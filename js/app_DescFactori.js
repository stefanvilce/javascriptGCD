//The class for finding prime factors
var DescFactori = {    
    numarul: 1,             //   The number should be decomposed
    factori: [1],
    puteri:  [0],
    prevDivizor: 1,        //    The last divisor for the number
    actualDivizor: 1,      //    The actual divisor
    prevPutere: 0,         //    The last power of this factor    
    mesajEroare: "<div class='eroare'><h3>Warning!<h3>You have entered chars which are not digits.</div>",
    
    afisare: function(){    
        document.getElementById("desc2").innerHTML = " " + this.afiseazaDescompunereaInFactoriPrimi();        
    },    
    
    reinitializareDescFactori: function(){
                this.factori.length = 0;
                this.factori = [1];
                this.puteri.length = 0;
                this.puteri =  [0];
                this.prevDivizor = 1;
                this.actualDivizor = 1;
                document.getElementById("eroare").innerHTML = "";
    },
    
    gasesteDivizorii: function(x){
            Prime.verificaNrPrim(x);
            if(Prime.isPrim == "Yes"){
                if(this.prevDivizor == 1){
                        this.factori.push(x);
                        this.puteri.push(1);    
                } else if(this.prevDivizor == x ) {
                        this.prevPutere = this.prevPutere + 1;
                        this.puteri[this.puteri.length - 1] = this.prevPutere;
                } else {
                        this.factori.push(x);
                        this.puteri.push(1);
                }                
            } else {
                var tempDivizor = Prime.divizorul;
                this.actualDivizor = tempDivizor;
                if(this.actualDivizor != this.prevDivizor){
                    this.prevPutere = 1;
                    this.prevDivizor = tempDivizor;
                    if(tempDivizor >= 1){
                        this.factori.push(tempDivizor);
                        this.puteri.push(1);
                    }
                } else {
                    this.prevPutere = this.prevPutere + 1;
                    this.puteri[this.puteri.length - 1] = this.prevPutere;
                }
                var y = x / tempDivizor;
                this.gasesteDivizorii(y);
            }
    },        
    
    afiseazaDescompunereaInFactoriPrimi: function(){
            var S = numberWithCommas(this.numarul) + " = ";
            for(var i=1; i<=this.factori.length; i++){
                if(this.factori[i] > 1){
                    if(i > 1){
                        S = S + " &middot;";
                    }                    
                    S = S + " " + this.factori[i];
                    if(this.puteri[i] > 1){
                        S = S + "<sup>" + this.puteri[i] + "</sup>";
                    }
                }
            }
            return S;
    },
    
    afisareRezultateHTML: function(){
            this.reinitializareDescFactori();
            var x = 1;
            x = document.getElementById("numarul").value;
            this.numarul = x;
            if(IsNumeric(x)){
                if(x < 3  || x >10000){
                    document.getElementById("eroare").innerHTML = this.mesajEroareLimitare;    
                } else {
                    $("#loading").fadeIn('slow').delay(100);                    
                    this.gasesteDivizorii(x);
                    this.afisare();
                    $("#loading").fadeOut('slow');
                }
            } else {
                document.getElementById("eroare").innerHTML = this.mesajEroare;
            }
     }
};       // DescFactori class