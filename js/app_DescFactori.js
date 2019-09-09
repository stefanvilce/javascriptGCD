//clasa care descompune un numar in factori primi
var DescFactori = {
    
    numarul: 1,             //      Acesta este numarul care trebuie descompus
    factori: [1],           //      Acest array se va intoarce 
    puteri:  [0],
    prevDivizor: 1,         //      Aici pastrez ultimul divizor pe care l-a avut numarul la care lucrez acum;      
    actualDivizor: 1,       //      Asta este actualul divizor si il compar cu prevDivizor ca sa vad daca incrementez puterea (atunci cand sunt egali) sau daca adaug un divizor nou si fac puterea =0 (atunci cand am actualDivizor<>prevDivizor)
    prevPutere: 0,          //      Aici pastrez ultima putere la care a ajuns divizorul prevDivizor;       cand schimb divizorul, puterea devine 0 din nou
    
    mesajEroare: "<div class='eroare'><h3>Warning!<h3>You have entered chars which are not digits.</div>",
    mesajEroareLimitare: "<div class='eroare'><h3>Warning!<h3>You have to enter numbers greater than 2 and smaller than 10,000. </div>",
    
    afisare: function(){
        //alert(this.factori);
        
        //document.getElementById("desc1").innerHTML = this.factori + "<br>" + this.puteri ;
        document.getElementById("desc2").innerHTML = " " + this.afiseazaDescompunereaInFactoriPrimi();
        
    },
    
    
    reinitializareDescFactori: function(){
            //  functia asta goleste variabilele si arrayurile din aceasta clasa
                this.factori.length = 0;
                this.factori = [1];
                this.puteri.length = 0;
                this.puteri =  [0];
                this.prevDivizor = 1;
                this.actualDivizor = 1;
        
                 document.getElementById("eroare").innerHTML = "";
        
                //modificare mesaj de Eroare
                var x = "<div class='eroare'><h3>Warning!<h3>You have to enter numbers greater then 2 and smaller than 10,000. <p> &nbsp; </p> ";
                x = x + getPRO.mesajul() + "</div>";
                this.mesajEroareLimitare = x;   
    },
    
    gasesteDivizorii: function(x){
            //      Functia asta gaseste divizorii acestui numar
            Prime.verificaNrPrim(x);
            if(Prime.estePrim == "Da"){
                // daca este prim, aici se termina partea asta cu  impartirea
                // dar trebui e sa verific daca este din prima prim sau este ultima lui impartire
                if(this.prevDivizor == 1){
                        //aici este din start numar prim
                        this.factori.push(x);
                        this.puteri.push(1);    
                } else if(this.prevDivizor == x ) {
                        //aici este ultima aparitie a unui factor prim (care a mai aparut)
                        this.prevPutere = this.prevPutere + 1;
                        this.puteri[this.puteri.length - 1] = this.prevPutere;
                } else {
                        //aici este ultima aparitie a unui factor prim (care nu a mai aparut inainte)
                        this.factori.push(x);
                        this.puteri.push(1);
                }
                
            } else {
                //aici numarul inca se mai imparte la un factor pprim
                var tempDivizor = Prime.divizorul;
                //this.factori.push(tempDivizor);
                this.actualDivizor = tempDivizor;       // il folosesc la comparatie
                if(this.actualDivizor != this.prevDivizor){
                    this.prevPutere = 1;
                    this.prevDivizor = tempDivizor;
                    if(tempDivizor >= 1){
                        this.factori.push(tempDivizor);
                        this.puteri.push(1);
                    }
                } else {    //asta este in cazul in care se repeta divizorul dinainte
                    this.prevPutere = this.prevPutere + 1;
                    this.puteri[this.puteri.length - 1] = this.prevPutere;
                }
                
                //acum impart numarul la acest divizor si rechem aceasta functie
                var y = x / tempDivizor;
                this.gasesteDivizorii(y);
            }
    },       //      gasesteDivizorii();
    
    
    
    afiseazaDescompunereaInFactoriPrimi: function(){
            // afiseaza descompunerea in factori primi. Asa cum se afiseaza in matematica
            var S = numberWithCommas(this.numarul) + " = ";
            for(var i=1; i<=this.factori.length; i++){
                if(this.factori[i] > 1){
                    if(i > 1){
                        S = S + " &middot;";   //  semnul de inmultire NU se afiseaza in fata primului factor prim                    
                    }
                    
                    S = S + " " + this.factori[i];
                    
                    if(this.puteri[i] > 1){
                        // daca avem putere mai mare decat 1 o afisam
                        S = S + "<sup>" + this.puteri[i] + "</sup>";
                    }
                }
            }
            return S;
    },
    
    
    afisareRezultateHTML: function(){
        
          
            //$(".rezolvare").fadeOut('fast');
            
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
                    //$(".rezolvare").delay(900).fadeIn('slow');
                }
            } else {
                document.getElementById("eroare").innerHTML = this.mesajEroare;
            }
     }
    
    
};       // DescFactori class